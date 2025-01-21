import express from 'express';
import Userinf from '../model/Userinf.js';
import Login from '../model/Login.js'; // Import the Login model to get user email
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import db from '../config/sequelize.js';

dotenv.config();

const router = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send acknowledgment email
const sendAcknowledgmentEmail = async (email, title, content) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Vehicle Information/Updates',
    text: `Dear User,\n\nYou have new updates regarding your vehicle:\n\nTitle: ${title}\nContent: ${content}\n\nThank you,\nRDA Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Acknowledgment email sent successfully');
  } catch (error) {
    console.error('Error sending acknowledgment email:', error);
  }
};

router.post('/insert/:id', async (req, res) => {
  const { id: book_id } = req.params;
  const { title, content } = req.body;

  if (!title || !content || !book_id) {
    return res.status(400).json({ error: 'Title, content, and book_id fields are required.' });
  }

  try {
    const userinf = await Userinf.create({
      title,
      content,
      book_id
    });

    // Get the user's email
    const user = await db.query(`
      SELECT logins.email 
      FROM logins
      LEFT JOIN logbook ON logins.vehicleNumber = logbook.vehicle_num
      WHERE logbook.id = :book_id
    `, {
      replacements: { book_id },
      type: Sequelize.QueryTypes.SELECT
    });

    if (user.length > 0) {
      await sendAcknowledgmentEmail(user[0].email, title, content);
    }

    res.status(201).json({ userinf });
  } catch (error) {
    console.error('Error inserting user information:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content fields are required.' });
  }

  try {
    const [updated] = await Userinf.update(
      { title, content },
      { where: { id } }
    );


      // Get the user's email
      // const user = await db.query(`
      //   SELECT logins.email 
      //   FROM logins
      //   LEFT JOIN logbook ON logins.vehicleNumber = logbook.vehicle_num
      //   WHERE logbook.id = :book_id
      // `, {
      //   replacements: { book_id },
      //   type: Sequelize.QueryTypes.SELECT
      // });

      // if (user.length > 0) {
      //   await sendAcknowledgmentEmail(user[0].email, title, content);
      // }

      return res.status(200).json(updated);

  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/use/:book_id', async (req, res) => {
  const { book_id } = req.params;

  try {
    const userinf = await Userinf.findAll({
      where: { book_id },
      order: [['id', 'DESC']]
    });

    // Format the response for frontend
    const formattedData = userinf.map((entry) => ({
      id: entry.id,
      title: entry.title,
      content: entry.content,
      createdAt: entry.created_at ? entry.created_at.toISOString() : null
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;