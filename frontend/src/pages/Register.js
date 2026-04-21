import { useState } from "react";
import axios from "axios";
import "../App.css";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    if (!data.name || !data.email || !data.password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      const res = await axios.post(
        "https://auth-backend-96q7.onrender.com/register",
        data
      );

      alert("Registered Successfully 🌸");
      console.log(res.data);

    } catch (err) {
      console.log(err);
      alert("Something went wrong 😢");
    }
  };

  return (
    <div className="container">
      <div style={styles.card}>
        <h2>Create Account ✨</h2>

        <input
          placeholder="Name"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <button onClick={handleRegister}>Register 💖</button>
      </div>
    </div>
  );
}

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

export default Register;