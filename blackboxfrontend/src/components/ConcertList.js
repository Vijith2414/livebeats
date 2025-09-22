import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchConcerts, DeleteConcert, fetchUserDetails } from '../api'; // Fixed DeleteConcert to deleteConcert
import './css/ConcertList.css';

const ConcertList = () => {
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            // Fetch concerts
            try {
                const concertData = await fetchConcerts(token);
                setConcerts(concertData);
            } catch (err) {
                setError("Failed to load concerts. Please try again later.");
            } finally {
                setLoading(false);
            }

            // Fetch user details to check admin status
            if (token) {
                try {
                    const userData = await fetchUserDetails(token);
                    setIsAdmin(userData.is_admin);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    setIsAdmin(false);
                }
            }
        };

        fetchData();
    }, [token]); // Re-run if token changes (e.g., login/logout)

    const handleDelete = async (concertId) => {
        if (window.confirm('Are you sure you want to delete this concert?')) {
            try {
                await DeleteConcert(concertId, token); // Use lowercase deleteConcert
                setConcerts(concerts.filter(concert => concert.id !== concertId));
                alert('Concert deleted successfully');
            } catch (err) {
                console.error('Error deleting concert:', err);
                setError('Failed to delete concert. Please try again.');
            }
        }
    };

    return (
        <div className="container my-7">
            {isAdmin && (
                <Link className="btn btn-success float-end" to="/newconcert">Add Concert</Link>
            )}
            <h2 className="text-center mb-4">Upcoming Concerts</h2>
            {loading && <p className="text-center">Loading concerts...</p>}
            {error && <p className="text-danger text-center">{error}</p>}
            {!loading && !error && concerts.length === 0 && (
                <p className="text-center text-muted">No upcoming concerts available at the moment.</p>
            )}
            <div className="row">
                {concerts.map(concert => (
                    <div key={concert.id} className="col-md-6 col-lg-3 mb-3 d-flex">
                        <div className="card concert-card shadow">
                            <img className="card-img-top" src={concert.image} alt={`${concert.name}`} />
                            <div className="card-body">
                                <h3 className="card-title">{concert.name}</h3>
                                <p className="card-text"><strong>Date & Time:</strong> {new Date(concert.date_time).toLocaleString()}</p>
                                <p className="card-text"><strong>Venue:</strong> {concert.venue}</p>
                                <p className="card-text"><strong>Ticket Price:</strong> ₹{concert.ticket_price}</p>
                                <p className="card-text"><strong>Available Tickets:</strong> {concert.available_tickets}</p>
                            </div>
                            {token && (
                            <div className="card-footer text-center">

                                {!isAdmin && (
                                <Link className="btn btn-success" to={`/bookingform/${concert.id}`}>Book Now</Link>
                                )}
                                {isAdmin && (
                                    <>
                                        <Link className="btn btn-success float-start" to={`/updateconcert/${concert.id}`}>
                                            Edit
                                        </Link>
                                        <button 
                                            className="btn btn-danger float-end" 
                                            onClick={() => handleDelete(concert.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConcertList;