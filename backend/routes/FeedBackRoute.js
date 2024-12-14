import express from 'express';
import Feedback from '../Model/Feedback.js';

const router = express.Router();

// POST route to insert feedback
router.post('/feedbacks', async (req, res) => {
    const { name, email, vehicle_num, message ,rating } = req.body;

    try {
        // Insert into Feedback table
        const feedback = await Feedback.create({
            name,
            email,
            vehicle_num,
            message,
            rating,
        });

        // Send success response
        res.status(200).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'An error occurred while submitting feedback' });
    }
});

// GET route to fetch all feedback
router.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();

        if (feedbacks.length === 0) {
            return res.status(404).json({ error: 'No feedback found' });
        }

        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'An error occurred while fetching feedback' });
    }
});

export default router;