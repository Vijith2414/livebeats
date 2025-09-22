import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email:"",
    password1: "",
    password2: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");
  setLoading(true);

  try {
    console.log("Sending data:", formData); // Debugging line

    const response = await axios.post("http://127.0.0.1:8000/concertapi/signup", formData);

    setMessage("Signup successful! Redirecting...");
    localStorage.setItem("token", response.data.token);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (err) {
    console.error("Signup failed:", err.response?.data);
    setError(err.response?.data?.error || "Signup failed. Please check your inputs.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/024/603/806/non_2x/rock-music-concert-background-illustration-ai-generative-free-photo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg rounded-4 p-4" style={{ background: "rgba(0, 0, 0, 0.6)", color: "white" }}>
            <h1 className="text-center mb-3">SIGN UP</h1>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-white">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  required
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Password</label>
                <input
                  type="password"
                  name="password1"
                  value={formData.password1}
                  onChange={handleChange}
                  className="form-control"
                  required
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  className="form-control"
                  required
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <button type="submit" className="btn btn-danger w-100" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-3 text-center">
              <p className="text-white">
                Already have an account? <Link to="/login" className="text-warning">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
