require('dotenv').config();  
app.use(express.json()); 

console.log("Starting server...");
console.log("MONGO URI:", process.env.MONGO_URI);
console.log("JWT:", process.env.JWT_SECRET);
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));


// REGISTER
app.post('/register', async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 DEBUG

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("All fields required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    await user.save();

    res.send("Registered Successfully");
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).send("Server error");
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) return res.send("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});


// PROTECTED ROUTE
app.get('/dashboard', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});
app.get('/', (req, res) => {
  res.send("Auth API is running 🚀");
});
app.listen(5000, () => console.log("Server running"));
console.log("MONGO URI:", process.env.MONGO_URI);