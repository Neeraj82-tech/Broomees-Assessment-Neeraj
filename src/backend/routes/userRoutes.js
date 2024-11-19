const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt'); 


router.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  if (!email || !firstName || !lastName || !username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email or username already exists.' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Error registering user. Try again.' });
    }
  }
});


  

module.exports = router;
