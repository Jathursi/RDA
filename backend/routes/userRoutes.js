import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Login from '../Model/Login.js';
// import Regist from '../Model/Regist.js';
import verifyToken from '../middlewares/verifyToken.js'
import nodemailer from 'nodemailer';
import { getUserById } from '../Controllers/userController.js';

dotenv.config(); // Load environment variables at the very beginning

const router = express.Router();
const jwtSecretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";  // Replace with your actual secret key

// Store OTPs temporarily (could be in memory, Redis, or database)
const otpStore = new Map();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Route for sending OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Login.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

    // Send OTP to user's email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    // Store OTP and user email (for validation)
    otpStore.set(email, otp);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'An error occurred while sending the OTP' });
  }
});

// Route for resetting password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const storedOtp = otpStore.get(email);

    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const user = await Login.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Clear OTP from the store
    otpStore.delete(email);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'An error occurred while resetting the password' });
  }
});

// Router to get all users
router.get('/sign', async (req, res) => {
  try {
    const users = await Login.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// Route to update approval status
router.put('/update-approval/:id', async (req, res) => {
  const { id } = req.params;
  const { approval } = req.body;

  try {
    const user = await Login.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.approval = approval;
    await user.save();

    res.status(200).json({ message: 'Approval status updated successfully' });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ error: 'An error occurred while updating the approval status' });
  }
});

router.post('/signup', async (req, res) => {
    const { first_Name, email, password, role, vehicleNumber } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await Login.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // Ensure the recipient's email is correctly set
            subject: 'Verification Email from RDA',
            text: `Hi ${first_Name}, signup successful! You may log in after Approval. Thank you!`,
        };

        // Attempt to send email and handle errors directly
        let emailSent = false;
        try {
            await transporter.sendMail(mailOptions);
            emailSent = true; // Mark as sent only if no errors
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
        }

        // Check if email was sent successfully
        if (emailSent) {
            // Save the user to the database if email is sent successfully
            const user = await Login.create({
                first_Name,
                email,
                password: hashedPassword,
                role,
                vehicleNumber: role === 'user' ? vehicleNumber : null,
            });

            // Respond with a success message
            return res.status(201).json({ message: 'Signup successful. You can now log in.' });
        } else {
            // Email sending failed; respond with an error
            return res.status(500).json({ error: 'Email could not be sent. Signup unsuccessful.' });
        }

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Error during signup process. Please try again.' });
    }
});





//router to get all the tokens passing the id
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await Login.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
//get all the regist datas from regist table getRegist



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await Login.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'No account found with this email' });
    }

    // Debugging log to check the approval status
    console.log('User approval status:', user.approval);

    // Check if the user's email is approved
    if (user.approval !== 'Approved') {
      return res.status(403).json({ error: 'Your account is not approved yet' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token
    const { first_Name, role, id } = user;
    console.log('JWT Secret Key:', jwtSecretKey); // Debugging log to check the secret key
    const token = jwt.sign({ first_Name, email, role, id }, jwtSecretKey, { expiresIn: '1d' });

    // Set token in a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ token, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});



router.put('/logup/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { first_Name, email, role } = req.body;
  try {
    const user = await Login.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.first_Name = first_Name;
    user.email = email;
    user.role = role;
    await user.save();
    res.json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'An error occurred while updating user data' });
  }
});


export default router;