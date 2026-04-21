import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("https://auth-backend-96q7.onrender.com/dashboard", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => setUser(res.data));
  }, []);

  return (
    <div className="container">
      <div style={styles.card}>
        <h2>Welcome {user.name} 🌸</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
  }
};

export default Dashboard;