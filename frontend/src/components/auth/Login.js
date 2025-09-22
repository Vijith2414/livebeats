import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";
import Navbar from "../navbar";

const Login = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/concertapi/login", { username, password });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user); // Store user globally
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: "url('background.jpg')", backgroundSize: "cover" }}>
        <div className="card p-4 shadow-lg rounded-4" style={{ background: "rgba(0,0,0,0.6)", color: "white" }}>
          <h1 className="text-center">LOGIN</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" required />
            </div>
            <div className="mb-3">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-danger w-100" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
