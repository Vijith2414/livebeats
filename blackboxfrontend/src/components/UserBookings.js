import React, { useEffect, useState } from 'react';
import { cancelTickets, fetchUserBookings } from '../api';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getBookings = async () => {
            try {
                const data = await fetchUserBookings(token);
                console.log('Fetched bookings:', data);
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError("Failed to load bookings. Please try again.");
            }
        };
        if (token) {
            getBookings();
        } else {
            setError("Please log in to view your bookings.");
        }
    }, [token]);

    const handleCancel = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await cancelTickets(bookingId, token); // Use bookingId, not concertId
                setBookings(bookings.filter(booking => booking.id !== bookingId));
                alert('Ticket cancelled successfully');
            } catch (err) {
                console.error('Error cancelling ticket:', err);
                setError('Failed to cancel ticket. Please try again.');
            }
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Your Bookings</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            {bookings.length === 0 && !error ? (
                <p className="text-center">You have no bookings yet.</p>
            ) : (
                <div className="row">
                    {bookings.map(booking => (
                        <div key={booking.id} className="col-md-6 col-lg-3 mb-4">
                            <div className="card booking-card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{booking.concert.name}</h5>
                                    <p className="card-text"><strong>Tickets Booked:</strong> {booking.tickets_booked}</p>
                                    <p className="card-text"><strong>Date & Time:</strong> {new Date(booking.concert.date_time).toLocaleString()}</p>
                                    <p className="card-text"><strong>Venue:</strong> {booking.concert.venue}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleCancel(booking.id)} // Use booking.id
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserBookings;