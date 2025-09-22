import { useEffect, useState } from "react";
import axios from "axios";

const ConcertUpdate = ({ concertId }) => {
  const [formData, setFormData] = useState({ name: "", date: "", location: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/concertapi/${concertId}`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch concert details.");
      }
    };

    fetchConcert();
  }, [concertId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.put(`http://127.0.0.1:8000/concertapi/${concertId}/updateconcert`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessage("Concert updated successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update concert.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Update Concert</h2>
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
        <button type="submit" className="btn btn-primary w-100">
          Update Concert
        </button>
      </form>
    </div>
  );
};

export default ConcertUpdate;
