// import React, { useState, useRef, useEffect } from "react";

// const Header = () => {
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const menuRef = useRef(null);

//   // Close popup when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowUserMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Inline styles
//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0px 20px",
//     backgroundColor: "#f8f8f8",
//     borderBottom: "1px solid #ddd",
//     position: "relative",
//     width: "100%",
//     maxWidth: "700px",
//     margin: "0 auto",
//   };

//   const userIconStyle = {
//     width: "30px",
//     height: "30px",
//     borderRadius: "50%",
//     backgroundColor: "#333",
//     color: "#fff",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const popupStyle = {
//     position: "absolute",
//     right: 0,
//     // marginTop: "10px",
//     width: "200px",
//     backgroundColor: "#fff",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     padding: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//     zIndex: 100,
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "5px 0",
//     color: "red",
//     border: "none",
//     background: "none",
//     cursor: "pointer",
//     textAlign: "left",
//   };

//   return (
//     <header style={headerStyle}>
//       {/* Navigation */}
//       {/* <nav style={navStyle}>
//         <a href="/" style={linkStyle}>
//           Home
//         </a>
//         <a href="/about" style={linkStyle}>
//           About
//         </a>
//         <a href="/blog" style={linkStyle}>
//           Blog
//         </a>
//         <a href="/services" style={linkStyle}>
//           Services
//         </a>
//       </nav> */}
//       <p>Auth</p>

//       {/* User Icon */}
//       <div style={{ position: "relative" }} ref={menuRef}>
//         <div
//           style={userIconStyle}
//           onClick={() => setShowUserMenu(!showUserMenu)}
//         >
//           U
//         </div>

//         {showUserMenu && (
//           <div style={popupStyle}>
//             <div style={{ fontWeight: "bold" }}>John Doe</div>
//             <div
//               style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}
//             >
//               johndoe@example.com
//             </div>
//             <button
//               style={buttonStyle}
//               onClick={() => console.log("Logout clicked")}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React, { useState, useRef, useEffect } from "react";

// const Header = () => {
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const menuRef = useRef(null);

//   const [user, setUser] = useState(null); // store fetched user
//   const [loading, setLoading] = useState(true);

//   // Close popup when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowUserMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Fetch Logged-in User
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("http://localhost:7789/api/getuser", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         });

//         if (!response.ok && response.status === 401) {
//           window.location.href = "/login";
//           return;
//         }

//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Styles
//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0px 20px",
//     backgroundColor: "#f8f8f8",
//     borderBottom: "1px solid #ddd",
//     position: "relative",
//     width: "100%",
//     maxWidth: "700px",

//     margin: "0 auto",
//   };

//   const userIconStyle = {
//     width: "30px",
//     height: "30px",
//     borderRadius: "50%",
//     backgroundColor: "#333",
//     color: "#fff",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const popupStyle = {
//     position: "absolute",
//     right: 0,
//     width: "200px",
//     backgroundColor: "#fff",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     padding: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//     zIndex: 100,
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "5px 0",
//     color: "red",
//     border: "none",
//     background: "none",
//     cursor: "pointer",
//     textAlign: "left",
//   };

//   return (
//     <header style={headerStyle}>
//       <p>Auth</p>

//       <div style={{ position: "relative" }} ref={menuRef}>
//         <div
//           style={userIconStyle}
//           onClick={() => setShowUserMenu(!showUserMenu)}
//         >
//           {user?.fullName?.[0] || "U"}
//         </div>

//         {showUserMenu && !loading && user && (
//           <div style={popupStyle}>
//             <div style={{ fontWeight: "bold" }}>{user.fullName}</div>
//             <div
//               style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}
//             >
//               {user.email}
//             </div>
//             <button
//               style={buttonStyle}
//               onClick={() => console.log("Logout clicked")}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigation = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:7789/api/getuser", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok && response.status === 401) {
          // window.location.href = "/login";
          navigation("/login");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ----------- UPDATED ATTRACTIVE STYLES -----------
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#ffffff",
    borderBottom: "2px solid #e5e5e5",
    position: "relative",
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
    borderRadius: "0 0 12px 12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    fontFamily: "Arial, sans-serif",
  };

  const logoStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    letterSpacing: "1px",
  };

  const userIconStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "0.2s",
  };

  const userIconHover = {
    transform: "scale(1.1)",
    boxShadow: "0 0 8px rgba(0,123,255,0.5)",
  };

  const popupStyle = {
    position: "absolute",
    right: 0,
    width: "210px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 100,
    animation: "fadeIn 0.2s ease-in-out",
  };

  const buttonStyle = {
    width: "100%",
    padding: "8px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "8px",
    fontWeight: "bold",
    transition: "0.2s",
  };

  const buttonHover = {
    background: "#e60000",
  };

  return (
    <header style={headerStyle}>
      <p style={logoStyle}>🔥 Auth Portal</p>

      <div style={{ position: "relative" }} ref={menuRef}>
        <div
          style={
            showUserMenu
              ? { ...userIconStyle, ...userIconHover }
              : userIconStyle
          }
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {user?.fullName?.[0] || "U"}
        </div>

        {showUserMenu && !loading && user && (
          <div style={popupStyle}>
            <div
              style={{ fontWeight: "bold", fontSize: "15px", marginBottom: 4 }}
            >
              👤 {user.fullName}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "10px",
              }}
            >
              ✉️ {user.email}
            </div>

            <button
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = buttonHover.background)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = buttonStyle.background)
              }
              onClick={async () => {
                try {
                  const res = await fetch("http://localhost:7789/api/logout", {
                    method: "POST",
                    credentials: "include",
                  });

                  if (!res.ok) {
                    console.log("Logout failed");
                    return;
                  }
                  const data = await res.json();
                  console.log(data);
                  console.log("Logged out successfully");
                  // window.location.href = "/login"; // redirect
                  navigation("/login");
                } catch (err) {
                  console.error("Logout error:", err);
                }
              }}
            >
              🔓 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
