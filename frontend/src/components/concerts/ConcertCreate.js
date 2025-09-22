import { useState } from "react";
import axios from "axios";

const ConcertCreate = () => {
  const [formData, setFormData] = useState({ name: "", date: "", location: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/concertapi/newconcert", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessage("Concert created successfully!");
      setFormData({ name: "", date: "", location: "" }); // Clear form after success
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create concert.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Create Concert</h2>
      {message && <p className="alert alert-success">{message}</p>}
      {error && <p className="alert alert-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Concert Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Creating..." : "Create Concert"}
        </button>
      </form>
    </div>
  );
};

export default ConcertCreate;
