import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("http://127.0.0.1:8000/logout/", {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout failed", error));
  }, [navigate]);

  return <h2>Logging out...</h2>;
};

export default Logout;
