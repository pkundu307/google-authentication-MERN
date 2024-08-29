const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const { connectDb } = require("./db");
const jwt = require("jsonwebtoken");

const CLIENT_ID = "Your Google client ID"

// Middleware to parse JSON bodies

const client = new OAuth2Client(CLIENT_ID);
const User = require("./models/user")

const app = express();
app.use(express.json()); 
const PORT = 5000;
const JWT_SECRET = "prasanna";
connectDb()

app.use(cors())
// API for Google Authentication

app.get('/',async(req,res)=>{
    res.send('Welcome to the API!');
})
app.post("/google-auth", async (req, res) => {
    const { credential } = req.body;

  
    try {
      // Verify the ID token and extract the user's profile information
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID,
      });
      
      const payload = ticket.getPayload(); // Extracts user information
      const { email, given_name, family_name } = payload;
        console.log(email,family_name);
  
      // Check if the user exists in your database
      let user = await User.findOne({ email });
      if (!user) {
        // Create a user if they do not exist
        user = await User.create({
          email,
          name: `${given_name} ${family_name}`,
          authSource: 'google',
        });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h', // Optional: Set an expiration time for the token
      });
  
      // Set the token as an HTTP-only cookie
      res.status(200)
        .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }) // Set the cookie securely in production
        .json({ message: 'Authentication successful', user: { email: user.email, name: user.name } });
    } catch (err) {
      console.error('Error in Google Authentication:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(5000, () => console.log(`Server running on PORT : ${5000}`));