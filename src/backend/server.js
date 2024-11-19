const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require("./models/User"); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({ origin: '*' })); 
app.use(bodyParser.json());
app.use('/api', userRoutes);

app.post("/api/signin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }
  
      res.status(200).json({ message: "Sign-In successful!", username: user.username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  });
  
  


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
