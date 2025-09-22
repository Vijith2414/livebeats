import { useState } from "react";
import { NewConsort } from "../api";

const ConcertCreate = () => {
    const [formData, setFormData] = useState({
        image: "",
        name: "",
        venue: "",
        date_time: "",
        ticket_price: "",
        available_tickets: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        const dataToSend = {
            ...formData,
            date_time: new Date(formData.date_time).toISOString(), // Convert to ISO format
            ticket_price: Number(formData.ticket_price), // Ensure number
            available_tickets: Number(formData.available_tickets), // Ensure number
        };

        try {
            await NewConsort(dataToSend, token);
            setMessage("Concert created successfully!");
            setFormData({
                image: "",
                name: "",
                venue: "",
                date_time: "",
                ticket_price: "",
                available_tickets: ""
            });
        } catch (err) {
            console.error("Error in handleSubmit:", err.message);
            setError(err.message || "Failed to create concert.");
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
                    <label className="form-label">Date & Time</label>
                    <input
                        type="datetime-local"
                        name="date_time"
                        className="form-control"
                        value={formData.date_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        className="form-control"
                        value={formData.venue}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ticket Price</label>
                    <input
                        type="number"
                        name="ticket_price"
                        className="form-control"
                        value={formData.ticket_price}
                        onChange={handleChange}
                        required
                        step="0.01" // Allow decimals
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Available Tickets</label>
                    <input
                        type="number"
                        name="available_tickets"
                        className="form-control"
                        value={formData.available_tickets}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        className="form-control"
                        value={formData.image}
                        onChange={handleChange}
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