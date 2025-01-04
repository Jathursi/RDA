// \

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Login from '../Model/Login.js';
// import Regist from '../Model/Regist.js';
import verifyToken from '../middlewares/verifyToken.js';
import nodemailer from 'nodemailer';
import { getUserById } from '../Controllers/userController.js';
import db from '../config/sequelize.js';
import { Sequelize } from 'sequelize'; // Import Sequelize
import Feedback from '../model/Feedback.js';

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
    // console.log(users)
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// router.get('/use/:vehicleNumber', async (req, res) => {
//   const { vehicleNumber } = req.params;
//   try {
//     const sql = `
//       SELECT 
//         logbook.vehicle_num AS vehicle_num,
//         logbook.vehicle_type AS vehicle_type
//       FROM logbook
//       LEFT JOIN userinf ON logbook.id = userinf.book_id
//       WHERE logbook.vehicle_num = :vehicleNumber`;
//     const results = await db.query(sql, {
//       replacements: { vehicleNumber },
//       type: Sequelize.QueryTypes.SELECT
//     });
//     res.json(results);
//   } catch (error) {
//     console.error('Error fetching vehicle details:', error);
//     res.status(500).json({ error: 'An error occurred while fetching vehicle details' });
//   }
// });
// router.get('/use/:vehicleNumber', async (req, res) => {
//   const { vehicleNumber } = req.params;
//   try {
//     const sql = `
//       SELECT 
//         logbook.vehicle_num AS vehicle_num,
//         logbook.vehicle_type AS vehicle_type
//       FROM logins
//       LEFT JOIN logbook ON logins.vehicleNumber = logbook.vehicle_num
//       LEFT JOIN userinf ON logbook.id = userinf.book_id
//       WHERE logins.vehicleNumber = :vehicleNumber`;
//     const results = await db.query(sql, {
//       replacements: { vehicleNumber },
//       type: Sequelize.QueryTypes.SELECT
//     });
//     res.json(results);
//   } catch (error) {
//     console.error('Error fetching vehicle details:', error);
//     res.status(500).json({ error: 'An error occurred while fetching vehicle details' });
//   }
// });
router.get('/use', async (req, res) => {
  const { vehicleID } = req.query; // Use req.query to get query parameters
  try {
    const sql = `
      SELECT 
        logbook.vehicle_num AS vehicle_num,
        logbook.vehicle_type AS vehicle_type,
        logbook.Year AS year,
        logbook.Meter AS meter,
        logbook.id AS logbookID,
        userinf.title AS title,
        userinf.content AS content,
        estimage.fileType,
        estimage.fileSize,
        estimage.fileData,
        estimage.EstID AS EstID,
        impimage.ImpID AS ImpID,
        compimage.CompID AS CompID
      FROM logins
      LEFT JOIN logbook ON logins.vehicleNumber = logbook.vehicle_num
      LEFT JOIN userinf ON userinf.book_id = logbook.id
      LEFT JOIN estimates ON estimates.logbookID = logbook.id
      LEFT JOIN estimage ON estimates.id = estimage.EstID
      LEFT JOIN implement ON implement.logbookID = logbook.id
      LEFT JOIN impimage ON implement.id = impimage.ImpID
      LEFT JOIN completion ON completion.logbookID = logbook.id
      LEFT JOIN compimage ON completion.id = compimage.CompID
      WHERE logins.vehicleNumber = :vehicleID`;
    const results = await db.query(sql, {
      replacements: { vehicleID },
      type: Sequelize.QueryTypes.SELECT
    });
    console.log("Query results:", results);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No data found for this vehicle number' });
    }
    res.json(results[0]); // Return the first result
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).json({ error: 'An error occurred while fetching vehicle details' });
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
router.get('/Logbook/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const logbookEntries = await Login.findOne({ where: { id } });
    if (!logbookEntries) {
      return res.status(404).json({ error: 'No data found for this ID' });
    }
    res.status(200).json(logbookEntries);
    console.log("data sent", logbookEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the logbook entries' });
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
      console.log(user)
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   try {
//     const user = await Login.findOne({ where: { email } });

//     if (!user) {
//       return res.status(400).json({ error: 'No account found with this email' });
//     }

//     // Debugging log to check the approval status
//     console.log('User approval status:', user.approval);

//     // Check if the user's email is approved
//     if (user.approval !== 'Approved') {
//       return res.status(403).json({ error: 'Your account is not approved yet' });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Generate a token
//     const { first_Name, role, id } = user;
//     console.log('JWT Secret Key:', jwtSecretKey); // Debugging log to check the secret key
//     const token = jwt.sign({ first_Name, email, role, id }, jwtSecretKey, { expiresIn: '1d' });
//     // console.log(token)
//     // Set token in a cookie
//     res.cookie('token', token, { httpOnly: true });

//     res.json({ token, role });
//     console.log('token:', token, role, first_Name, id ); // Debugging log to check the secret key

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while logging in' });
//   }
// });


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

    // Update the lastOnline field
    user.lastOnline = new Date();
    await user.save();

    // Generate a token
    const { first_Name, role, id } = user;
    console.log('JWT Secret Key:', jwtSecretKey); // Debugging log to check the secret key
    const token = jwt.sign({ first_Name, email, role, id }, jwtSecretKey, { expiresIn: '1d' });
    // console.log(token)
    // Set token in a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ token, role });
    console.log('token:', token, role, first_Name, id ); // Debugging log to check the secret key

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

router.post('/logout', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by verifyToken middleware
    await Login.update(
      { lastOnline: Sequelize.fn('NOW') },
      { where: { id: userId } }
    );
    res.clearCookie('token'); // Clear the token cookie
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'An error occurred while logging out' });
  }
});

// Route to post feedback
router.post('/feedbacks/:userID', async (req, res) => {
  const { userID } = req.params;
  const { name, email, message, rating } = req.body;

  try {
    const feedback = await Feedback.create({
      name,
      email,
      message,
      rating,
      userID,
    });

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'An error occurred while submitting feedback' });
  }
});

router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await db.query(`
      SELECT DISTINCT
        feedback.id AS id,
        feedback.name AS name,
        logins.email AS email,
        feedback.message AS message,
        feedback.rating AS rating,
        logins.vehicleNumber AS vehicle_num,
        implement.Job_Assigned AS job_Assigned
      FROM feedback
      LEFT JOIN logins ON feedback.userID = logins.id
      LEFT JOIN logbook ON logins.vehicleNumber = logbook.vehicle_num
      LEFT JOIN implement ON logbook.id = implement.logbookID
    `, {
      type: Sequelize.QueryTypes.SELECT
    });
    res.json(feedbacks);
    console.log(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'An error occurred while fetching feedbacks' });
  }
});

router.get('/last-online', verifyToken, async (req, res) => {
  try {
    const users = await Login.findAll({
      attributes: ['id', 'first_Name', 'role', 'lastOnline'],
      order: [['lastOnline', 'DESC']],
    });

    const currentTime = new Date();
    const userStatuses = users.map(user => {
      const lastOnline = user.lastOnline ? new Date(user.lastOnline) : null;
      let status = 'Offline';
      let timeSinceLastOnline = '';

      if (lastOnline) {
        const diffMs = currentTime - lastOnline;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);

        if (diffMins < 5) {
          status = 'Online';
        } else if (diffHours < 1) {
          timeSinceLastOnline = `${diffMins} minutes ago`;
        } else {
          timeSinceLastOnline = `${diffHours} hours ago`;
        }
      }

      return {
        id: user.id,
        first_Name: user.first_Name,
        role: user.role,
        status,
        timeSinceLastOnline,
      };
    });

    res.json(userStatuses);
  } catch (error) {
    console.error('Error fetching last online status:', error);
    res.status(500).json({ error: 'An error occurred while fetching last online status' });
  }
});

export default router;