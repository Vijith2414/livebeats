import React, { useEffect, useState } from 'react';
import { fetchAdminBookings, cancelTickets } from '../api'; // Added cancelTickets

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        console.log('Fetching admin bookings...');
        const getBookings = async () => {
            try {
                const data = await fetchAdminBookings(token);
                console.log('Fetched admin bookings:', data); // Debug log
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
                setError('Failed to fetch bookings. Please try again later.');
            }
        };
        if (token) {
            getBookings();
        } else {
            setError('Please log in as an admin to view bookings.');
        }
    }, [token]);

    const handleCancel = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await cancelTickets(bookingId, token);
                setBookings(bookings.filter(booking => booking.id !== bookingId));
                alert('Booking cancelled successfully');
            } catch (err) {
                console.error('Error cancelling booking:', err);
                setError('Failed to cancel booking. Please try again.');
            }
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">All Bookings</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            {bookings.length === 0 && !error ? (
                <p className="text-center">No bookings available.</p>
            ) : (
                <div className="row">
                    {bookings.map(booking => (
                        <div key={booking.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card booking-card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{booking.concert?.name || 'Unknown Concert'}</h5>
                                    <p className="card-text"><strong>User:</strong> {booking.user?.username || 'N/A'}</p>
                                    <p className="card-text"><strong>Tickets Booked:</strong> {booking.tickets_booked}</p>
                                    <p className="card-text">
                                        <strong>Date & Time:</strong> 
                                        {booking.concert?.date_time ? new Date(booking.concert.date_time).toLocaleString() : 'N/A'}
                                    </p>
                                    <p className="card-text"><strong>Venue:</strong> {booking.concert?.venue || 'N/A'}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleCancel(booking.id)}
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

export default AdminBookings;