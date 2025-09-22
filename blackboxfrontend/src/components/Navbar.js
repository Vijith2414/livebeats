import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserDetails } from '../api'; // Import the new API function

const Navbar = () => {
    const token = localStorage.getItem('token');
    const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

    useEffect(() => {
        const getUserDetails = async () => {
            if (token) {
                try {
                    const userData = await fetchUserDetails(token);
                    setIsAdmin(userData.is_admin); // Set admin status
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    setIsAdmin(false); // Default to non-admin on error
                }
            }
        };
        getUserDetails();
    }, [token]); // Re-run if token changes (e.g., login/logout)

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAdmin(false); // Reset admin status on logout
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">LiveBeats</Link>
                <div className='float-end'>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className="nav-link" to="/concerts">Concerts</Link>
                        </li>
                        {token ? (
                            <>
                                {!isAdmin && (
                                    <li className="nav-item">
                                    <Link className="nav-link" to="/user-bookings">Your Bookings</Link>
                                </li>
                                )}
                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin-bookings">Admin Bookings</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;