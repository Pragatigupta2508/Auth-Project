import { useState } from "react";
import axios from "axios";
import "./App.css";

function Login() {
  const [data, setData] = useState({});

  const handleLogin = async () => {
    const res = await axios.post("https://auth-backend-96q7.onrender.com/login", data);
    localStorage.setItem("token", res.data.token);
    alert("Welcome back 💖");
  };

  return (
    <div className="container">
      <div style={styles.card}>
        <h2>Welcome Back ✨</h2>
        <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
        <input placeholder="Password" type="password" onChange={e => setData({...data, password: e.target.value})} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
<p onClick={() => window.location.href="/register"} style={{cursor:"pointer"}}>
  New user? Register here ✨
</p>

const styles = {
  card: {
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px"
  }
};

export default Login;