// ConcertDelete.js
import axios from "axios";

const ConcertDelete = ({ concertId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/concertapi/${concertId}/deleteconcert`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Concert deleted successfully");
    } catch (err) {
      alert("Failed to delete concert");
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default ConcertDelete;
