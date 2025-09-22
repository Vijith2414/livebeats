import React, { useEffect, useState } from 'react';
import { bookTickets, fetchConcertDetails } from '../api';
import { Link, useParams } from 'react-router-dom';
import './css/BookingForm.css';

const BookingForm = () => {
    const { concertId } = useParams();
    const [concert, setConcert] = useState(null);
    const [tickets, setTickets] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchConcert = async () => {
            setLoading(true);
            try {
                const concertData = await fetchConcertDetails(concertId, token);
                setConcert(concertData);
            } catch (error) {
                setError('Failed to fetch concert details');
                console.error('Error fetching concert:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConcert();
    }, [concertId, token]);

    const handleChange = (e) => {
        const value = Number(e.target.value);
        // Ensure value doesn’t exceed 3 or available tickets
        const maxTickets = Math.min(3, concert?.available_tickets || 0);
        if (value <= maxTickets) {
            setTickets(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        if (tickets > 3) {
            setMessage('You can only book a maximum of 3 tickets.');
            return;
        }
        try {
            const response = await bookTickets(concertId, { tickets_booked: Number(tickets) }, token);
            setMessage(response.message || 'Booking successful');
            setTickets(1); // Reset tickets after booking
            window.location.href = '/concerts';
        } catch (error) {
            setMessage(error.message || 'Booking failed. Please try again.');
            console.error('Error booking tickets:', error);
        }
    };

    if (loading) {
        return <p className="text-center">Loading concert details...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    return (
        <div className="booking-form-container my-5">
            <h3 className="text-center mb-4">Book Tickets</h3>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="text-center">{concert.name}</h5>
                    <p className="text-center"><strong>Date & Time:</strong> {new Date(concert.date_time).toLocaleString()}</p>
                    <p className="text-center"><strong>Venue:</strong> {concert.venue}</p>
                    <p className="text-center"><strong>Available Tickets:</strong> <span className="text-success fw-bold">{concert.available_tickets}</span></p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-3">
                    <label htmlFor="tickets" className="form-label">Number of Tickets (Max 3)</label>
                    <input
                        type="number"
                        id="tickets"
                        value={tickets}
                        onChange={handleChange}
                        min="1"
                        max={Math.min(3, concert.available_tickets)} // Limit to 3 or available tickets
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-success">Book Now</button>
                <Link to="/concerts" className="btn btn-secondary ms-2">Cancel</Link>
            </form>
            {message && <p className={`text-center mt-3 ${message.includes('failed') ? 'text-danger' : 'text-success'}`}>{message}</p>}
        </div>
    );
};

export default BookingForm;