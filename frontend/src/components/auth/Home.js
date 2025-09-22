import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";

const Home = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/home/", { withCredentials: true });
        setUser(response.data.user);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/024/603/806/non_2x/rock-music-concert-background-illustration-ai-generative-free-photo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "20px"
        }}
      >
        <div className="container">
          <h1 className="display-4">Welcome, {user ? user.username : "Guest"}!</h1>
          <p className="lead text-light">Your gateway to unforgettable live music experiences!</p>
          
          <div className="col-lg-8 mx-auto">
            <div className="card shadow-lg border-0 rounded-4"
              style={{ background: "rgba(255, 255, 255, 0.2)", maxWidth: "800px", margin: "auto" }}>
              <div className="card-body p-4 border-0 rounded-4"
                style={{ background: "rgba(0, 0, 0, 0.6)", borderRadius: "10px", color: "white" }}>
                
                <p className="mb-4">
                  We’re thrilled to have you here at <strong>ConcertBooking</strong>, your ultimate destination for live music! 
                  Whether you're looking to secure tickets for your favorite artist, discover new performances, or plan an unforgettable night out, you’ve come to the right place.
                </p>
                <p className="mb-4">
                  From intimate gigs to massive festivals, our platform connects you to the music and artists you love. 
                  Explore personalized recommendations, stay updated on upcoming shows in your area, and never miss a great event.
                </p>
                <p className="mb-4">
                  Your next unforgettable live experience is just a few clicks away. Browse our curated selection of events or dive into new genres and venues!
                </p>
                <div className="text-center">
                  <Link to="/concerts" className="btn btn-danger btn-lg">Explore Events</Link>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Home;
