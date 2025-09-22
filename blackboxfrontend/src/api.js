const API_URL = 'http://127.0.0.1:8000/concertapi'; // Adjust the URL based on your Django API
// Sigin UP
export const signup = async (data) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};
//Login
export const login = async (data) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        // If the response is not OK, throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
    }
    return response.json();
};
// fetching all concerts
export const fetchConcerts = async () => {
    try {
        const response = await fetch(`${API_URL}/listconcert`,{method : 'GET'});
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching concerts:', error);
        return [];
    }
};
// userbookings
export const fetchUserBookings = async (token) => {
    try {
        const response = await fetch(`${API_URL}/user-bookings/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to fetch bookings: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched user bookings:", data);
        return data;
    } catch (error) {
        console.error('Error in fetchUserBookings:', error);
        throw error;
    }
};

//ADmin bookings
export const fetchAdminBookings = async (token) => {
    try {
        const response = await fetch(`${API_URL}/admin/bookings/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to fetch admin bookings: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched admin bookings:", data);
        return data;
    } catch (error) {
        console.error('Error in fetchAdminBookings:', error);
        throw error;
    }
};
// update concert
export const fetchUpdateConcert = async (concertId, data, token) => {
    try {
        const response = await fetch(`${API_URL}/${concertId}/updateconcert`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`, // Use dynamic token
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error response:", errorData);
            throw new Error(errorData.message || 'Failed to update concert');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating concert:', error);
        throw error;
    }
};

// delete concert
export const DeleteConcert = async (concertId, token) => {
    const  concertid = concertId;
    const response = await fetch(`${API_URL}/${concertid}/deleteconcert`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`, // Include the token in the headers
        },
    });

    if (!response.ok) throw new Error('Failed to delete concert');
    return response.json(); // Optionally return the response if needed
};

//creating concerts
export const NewConsort = async (data, token) => {
    console.log("Sending data to API:", data); // Log the data being sent
    console.log("Token:", token); // Log the token

    try {
        const response = await fetch(`${API_URL}/newconcert`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Get detailed error from server
            console.error("Server error response:", errorData);
            throw new Error(errorData.error || 'Failed to create concert');
        }

        return response.json();
    } catch (err) {
        throw err; // Re-throw the error to be caught in the component
    }
};

// fetching a single concert
export const fetchConcertDetails = async (concertId, token) => {
    try {
        const response = await fetch(`${API_URL}/${concertId}/`, { // Updated to match your URL
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`, // Token as parameter
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error response:", errorData);
            throw new Error(`Failed to fetch concert details: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched concert data:", data); // Debug log
        return data; // Return the flat concert object
    } catch (error) {
        console.error('Error fetching concert:', error);
        throw error; // Propagate the error to the caller
    }
};
// ticket booking
export const bookTickets = async (concertId, data, token) => {
    const response = await fetch(`${API_URL}/book/${concertId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error('Failed to book tickets');
    }

    return response.json();
};

// Cancel booking 
export const cancelTickets = async (bookingId, token) => { // Renamed concertId to bookingId
    try {
        const response = await fetch(`${API_URL}/cancel/${bookingId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to cancel tickets');
        }

        if (response.status === 204) {
            return { message: 'Tickets cancelled successfully' };
        }
        return await response.json();
    } catch (error) {
        console.error('Error cancelling tickets:', error);
        throw error;
    }
};
// user details
export const fetchUserDetails = async (token) => {
    try {
        const response = await fetch(`${API_URL}/user-details/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to fetch user details: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched user details:", data);
        return data;
    } catch (error) {
        console.error('Error in fetchUserDetails:', error);
        throw error;
    }
};