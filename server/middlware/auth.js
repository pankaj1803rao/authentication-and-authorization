const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const sessionmodel = require("../models/sessionmodel");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Get token from cookies
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2️⃣ Or from Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // 3️⃣ If no token → Unauthorized
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // 4️⃣ Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // 5️⃣ Check if session exists
    const session = await sessionmodel.findById(decoded.sessionId);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized: Session expired" });
    }

    // 6️⃣ Attach user details to req
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; // logged-in user
    req.sessionId = session._id; // current session

    next(); // go to next controller
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = authMiddleware;
