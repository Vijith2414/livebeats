import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import "./Concerts.css";
import {} from 'ConcertCreate'

const ConcertList = ({ user }) => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/concertapi/listconcert");
        setConcerts(response.data);
      } catch (err) {
        setError("Failed to load concerts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchConcerts();
  }, []);

  return (
    <>
     

<Navbar />

<div className="container">
  <h1 className="concert-title">CONCERTS</h1>

  <div className="scrollable-concerts">
    <div className="row g-4 justify-content-center">
      {loading && <p>Loading concerts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && concerts.length === 0 && (
        <p className="text-center text-muted">No upcoming concerts available at the moment.</p>
      )}

      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} user={user} />
      ))}
    </div>
  </div>
</div>

    </>
  );
};

const ConcertCard = ({ concert, user }) => {
  return (
    <div className="col-md-6 col-lg-3 d-flex">
      <div className="card concert-card">
         <img className="card-img-top" src={concert.image} alt={`${concert.name}`} />

    <div className="card-body">
      <h5 className="card-title">{concert.name}</h5>
      <p className="card-text">
        <strong>Date & Time:</strong> {concert.date_time}
      </p>
      <p className="card-text">
        <strong>Venue:</strong> {concert.venue}
      </p>
      <p className="card-text">
        <strong>Ticket Price:</strong> {concert.ticket_price}
      </p>
      <p className="card-text">
        <strong>Available Tickets:</strong> {concert.available_tickets}
      </p>
    </div>

    <div className="card-footer">
      {user?.is_staff ? (
        <div className="d-flex justify-content-between">
          <Link to={`http://127.0.0.1:8000/concertapi/${concert.id}/updateconcert`} className="btn btn-warning btn-sm">
            Edit
          </Link>
          <Link to={`/eachbookings/${concert.id}`} className="btn btn-success btn-sm">
            Bookings
          </Link>
          <Link to={`http://127.0.0.1:8000/concertapi/${concert.id}/deleteconcert`} className="btn btn-danger btn-sm">
            Delete
          </Link>
        </div>
      ) : user ? (
        <div className="d-flex justify-content-center mt-2">
          <Link to={`/booktickets/${concert.id}`} className="btn btn-success btn-sm">
            Book
          </Link>
        </div>
      ) : null}
    </div>
  </div>
</div>
  );
};

export default ConcertList;
