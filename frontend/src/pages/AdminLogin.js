// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./AdminLogin.css";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const API_URL = process.env.REACT_APP_API_URL;

//       if (!API_URL) {
//         throw new Error("API URL not set in .env file");
//       }

//       const res = await axios.post(`${API_URL}/api/admin/login`, {
//         email,
//         password,
//       });

//       const token = `Bearer ${res.data.token}`;
//       localStorage.setItem("token", token);
//       navigate("/admin/panel");
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError(
//         err.response?.data?.error || "Login failed. Check your credentials."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <form className="admin-box" onSubmit={handleLogin}>
//         <h2>Admin Login</h2>

//         {error && <p className="error-message">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, {
        email,
        password,
      });

      const token = `Bearer ${res.data.token}`;
      localStorage.setItem("token", token);
      navigate("/admin/panel");
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 TEMP: Register Admin
  const handleRegister = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/admin/register`, {
        email,
        password,
      });

      setMessage("Admin registered successfully!");
    } catch (err) {
      setError(err?.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <form className="admin-box" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <input
          type="email"
          placeholder="Email (admin only)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (admin only)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* TEMPORARY Register Button for Admin Setup */}
        <button
          type="button"
          className="register-button"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
