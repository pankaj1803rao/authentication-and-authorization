// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("  http://localhost:7789/api/getuser", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         });

//         if (response.status === 401) {
//           // redirect to login if unauthorized
//           // window.location.href = "/login";
//           navigate("/login");
//           return;
//         }

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json();
//         setUsers(Array.isArray(data) ? data : [data]);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;

//   return (
//     <div>
//       <h2>All Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id || user.id}>
//             <strong>Name:</strong> {user.fullName || user.name} |{" "}
//             <strong>Email:</strong> {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
import React from "react";

const Home = () => {
  const bannerStyle = {
    padding: "40px 20px",
    background: "#4a90e2",
    color: "white",
    textAlign: "center",
    borderRadius: "8px",
    marginTop: "40px",
  };

  const subTextStyle = {
    fontSize: "16px",
    marginTop: "10px",
    opacity: 0.9,
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div style={bannerStyle}>
        <h1>Welcome to the Dashboard</h1>
        <p style={subTextStyle}>
          You are successfully logged in and can start exploring your account.
        </p>
      </div>
    </div>
  );
};

export default Home;
