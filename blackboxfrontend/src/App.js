import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar
import Signup from './components/Signup';
import Login from './components/Login';
import ConcertList from './components/ConcertList';
import UserBookings from './components/UserBookings';
import AdminBookings from './components/AdminBookings';
import BookingForm from './components/BookingForm';
import Home from './components/home';
import ConcertCreate from './components/newconsort';
import UpdateConcert from './components/UpdateConcert';
import { DeleteConcert } from './api';

function App() {
    return (
        <Router>
            <Navbar /> {/* Include the Navbar */}
            <div className="container mt-4">
                <Switch>
                    <Route path="/home" component ={Home}/>
                    <Route path="/concerts" exact component={ConcertList} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/bookingform/:concertId" component={BookingForm}/>
                    <Route path="/user-bookings" component={UserBookings} />
                    <Route path="/admin-bookings" component={AdminBookings} />
                    <Route path="/newconcert" component={ConcertCreate}/>
                    <Route path="/updateconcert/:concertId" component={UpdateConcert}/>
                    <Route path='/delete' component={DeleteConcert}/>
                </Switch>
            </div>
        </Router>
    );
} 

export default App;