import React, { useEffect, useState } from "react";
import { fetchUpdateConcert, fetchConcertDetails } from '../api';
import { useParams } from 'react-router-dom'; // Import useParams


const UpdateConcert = () => {
    const { concertId } = useParams(); // Get concertId from URL
    const token = localStorage.getItem('token'); // Get token dynamically

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConcert = async () => {
            try {
                setLoading(true);
                const concert = await fetchConcertDetails(concertId, token); // Pass concertId and token
                console.log("Fetched concert data:", concert);

                const formattedDateTime = concert.date_time
                    ? new Date(concert.date_time).toISOString().slice(0, 16)
                    : "";

                setFormData({
                    image: concert.image || "",
                    name: concert.name || "",
                    venue: concert.venue || "",
                    date_time: formattedDateTime,
                    ticket_price: concert.ticket_price || concert.ticket_price === 0 ? concert.ticket_price.toString() : "",
                    available_tickets: concert.available_tickets || concert.available_tickets === 0 ? concert.available_tickets.toString() : ""
                });
            } catch (err) {
                setError("Failed to fetch concert details: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConcert();
    }, [concertId, token]); // Add concertId and token as dependencies

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            console.log("Submitting data:", { ...formData });
            await fetchUpdateConcert(concertId, formData, token); // Pass concertId and token
            setMessage("Concert updated successfully!");
            window.location.href = '/concerts';
        } catch (err) {
            setError("Failed to update concert: " + err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Update Concert</h2>
            {message && <p className="alert alert-success">{message}</p>}
            {error && <p className="alert alert-danger">{error}</p>}
            {loading && <p>Loading concert details...</p>}

            {!loading && (
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
                        <label className="form-label">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            className="form-control"
                            value={formData.image}
                            onChange={handleChange}
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
                    <button type="submit" className="btn btn-primary w-100">Update Concert</button>
                </form>
            )}
        </div>
    );
};

export default UpdateConcert;