const sessionmodel = require("../models/sessionmodel");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const Signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid Credentials!" });

    // 2️⃣ Compare hashed password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch)
    //   return res.status(400).json({ error: "Invalid Credentials!" });

    // 3️⃣ Delete old sessions for single active session
    await sessionmodel.deleteMany({ userId: user._id });

    // 4️⃣ Create new session
    const session = await sessionmodel.create({ userId: user._id });

    // 5️⃣ Generate JWT with sessionId
    const token = jwt.sign(
      { id: user._id, email: user.email, sessionId: session._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6️⃣ Set token as httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true on production HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // 7️⃣ Return user info + sessionId
    res.status(200).json({
      id: user._id,
      fullName: user.fullname,
      email: user.email,
      sessionId: session._id,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
};

// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(400).json({ error: "Invalid Credentials!" });
//     }

//     // Create a session for the user
//     const session = await sessionmodel.create({ userId: user._id });

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email, sessionId: session._id },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // Set token cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, // false for localhost
//       sameSite: "lax",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     // Send response including session ID
//     res.status(200).json({
//       id: user._id,
//       fullName: user.fullname,
//       email: user.email,
//       sessionId: session._id,
//     });
//   } catch (err) {
//     console.log(err);
//     if (err.code === 11000) {
//       return res.status(409).json({ error: "Email already exists" });
//     } else {
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   }
// };

// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(400).json({ error: "Invalid Credentials!" });
//     }

//     const session = await sessionmodel.create({ userId: user._id });
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, // false for localhost
//       sameSite: "lax",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       id: user._id,
//       fullName: user.fullname,
//       email: user.email,
//     });
//   } catch (err) {
//     console.log(err);
//     if (err.code === 11000) {
//       return res.status(409).json({ error: "Email already exists" });
//       // return Response.json(
//       //   { error: "Email already exists" },
//       //   {
//       //     status: 409,
//       //   }
//       // );
//     } else {
//       return res.status(500).json({ error: "Something went wrong" });
//       // return Response.json(
//       //   { error: "Something went wrong" },
//       //   {
//       //     status: 500,
//       //   }
//       // );
//     }
//   }
// };

// const getuser = async (req, res) => {
//   try {
//     // Check if cookies exist
//     if (!req.cookies) {
//       return res.status(400).json({ error: "No cookies sent" });
//     }

//     // Retrieve token from cookies
//     const token = req.cookies.token;
//     console.log(token);
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized: Token missing" });
//     }

//     // Verify JWT token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET);
//     } catch (jwtErr) {
//       console.log("JWT verification failed:", jwtErr.message);
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     // Find user by ID
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Success
//     res.status(200).json({
//       id: user._id,
//       fullName: user.fullname,
//       email: user.email,
//     });
//   } catch (err) {
//     console.error("Error in getuser:", err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
// const getuser = async (req, res) => {
//   try {
//     let token;

//     // 1️⃣ Try to get token from cookies
//     if (req.cookies && req.cookies.token) {
//       token = req.cookies.token;
//     }

//     // 2️⃣ If no token in cookies, try Authorization header
//     if (!token && req.headers.authorization) {
//       const authHeader = req.headers.authorization;
//       if (authHeader.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];
//       }
//     }

//     console.log(token);
//     // 3️⃣ If still no token, unauthorized
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     // 4️⃣ Verify JWT
//     let decoded;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET);
//     } catch (jwtErr) {
//       console.log("JWT verification failed:", jwtErr.message);
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     // 5️⃣ Find user
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 6️⃣ Return user info
//     res.status(200).json({
//       id: user._id,
//       fullName: user.fullname,
//       email: user.email,
//     });
//   } catch (err) {
//     console.error("Error in getuser:", err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
// const getuser = async (req, res) => {
//   try {
//     console.log(req.user);

//     // let token;

//     // // 1️⃣ Try to get token from cookies
//     // if (req.cookies && req.cookies.token) {
//     //   token = req.cookies.token;
//     // }

//     // // 2️⃣ If no token in cookies, try Authorization header
//     // if (!token && req.headers.authorization) {
//     //   const authHeader = req.headers.authorization;
//     //   if (authHeader.startsWith("Bearer ")) {
//     //     token = authHeader.split(" ")[1];
//     //   }
//     // }

//     // // 3️⃣ If still no token, unauthorized
//     // if (!token) {
//     //   return res.status(401).json({ error: "Unauthorized: No token provided" });
//     // }

//     // // 4️⃣ Verify JWT
//     // let decoded;
//     // try {
//     //   decoded = jwt.verify(token, JWT_SECRET);
//     // } catch (jwtErr) {
//     //   console.log("JWT verification failed:", jwtErr.message);
//     //   return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     // }

//     // // 5️⃣ Check if session exists
//     // const session = await sessionmodel.findById(decoded.sessionId);
//     // if (!session) {
//     //   return res.status(401).json({ error: "Unauthorized: Session expired" });
//     // }

//     // // 6️⃣ Find user
//     // const user = await User.findById(decoded.id).select("-password");
//     // if (!user) {
//     //   return res.status(404).json({ error: "User not found" });
//     // }

//     // 7️⃣ Return user info + sessionId
//     // res.status(200).json({
//     //   id: user._id,
//     //   fullName: user.fullname,
//     //   email: user.email,
//     //   sessionId: session._id,
//     // });
//   } catch (err) {
//     console.error("Error in getuser:", err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
const getuser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.status(200).json({
      id: req.user._id,
      fullName: req.user.fullname,
      email: req.user.email,
      sessionId: req.sessionId,
    });
  } catch (err) {
    console.error("Error in getuser:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// const logout = async (req, res) => {
//   try {
//     let token;

//     // 1️⃣ Get token from cookies
//     if (req.cookies && req.cookies.token) token = req.cookies.token;

//     // 2️⃣ Or from Authorization header
//     if (!token && req.headers.authorization) {
//       const authHeader = req.headers.authorization;
//       if (authHeader.startsWith("Bearer ")) token = authHeader.split(" ")[1];
//     }

//     if (!token)
//       return res.status(401).json({ error: "Unauthorized: No token" });

//     // 3️⃣ Verify JWT
//     let decoded;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET);
//     } catch (err) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     // 4️⃣ Delete the session
//     const session = await sessionmodel.findById(decoded.sessionId);
//     console.log(session);
//     // 5️⃣ Clear the cookie
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: false, // true on production HTTPS
//       sameSite: "lax",
//     });

//     // 6️⃣ Send success response
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (err) {
//     console.error("Logout error:", err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
const logout = async (req, res) => {
  try {
    // 1️⃣ Require authenticated user + sessionId
    if (!req.sessionId) {
      return res.status(401).json({ error: "Unauthorized: No active session" });
    }

    // 2️⃣ Delete session from DB
    await sessionmodel.findByIdAndDelete(req.sessionId);

    // 3️⃣ Clear auth cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true for production HTTPS
      sameSite: "lax",
    });

    // 4️⃣ Response
    return res.status(200).json({
      message: "Logged out successfully",
      sessionDeleted: req.sessionId,
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  Signup,
  Login,
  getuser,
  logout,
};
