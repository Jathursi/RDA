import express from 'express';
import multer from 'multer';
import Completion from '../model/Completion.js';
import CompImage from '../model/CompImage.js';

const router = express.Router();

// Set up multer to store files in memory with size limits
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit file size to 100MB (100 * 1024 * 1024 bytes)
    }
});

// Route to create a new completion entry
router.post('/Cominsert/:id', upload.array('images'), async (req, res) => {
    const { id: book_id } = req.params;
    const { supervised, initiated, closed, Voucher, close_date, approved, aditional_fault } = req.body;

    try {
        const newCompletion = await Completion.create({
            supervised,
            initiated,
            closed,
            close_date,
            approved,
            Voucher,
            aditional_fault,
            logbookID: book_id,
        });

        if (req.files && req.files.length > 0) {
            const images = await CompImage.bulkCreate(
                req.files.map((file, index) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    CompID: newCompletion.id, // Associate images with the created completion entry
                    fileName: `${file.originalname}${index}` // Append index to file name if multiple files
                }))
            );
        }

        res.status(201).json(newCompletion);
    } catch (error) {
        console.error('Error creating completion entry:', error);
        res.status(500).json({ error: 'An error occurred while creating the completion entry.' });
    }
});

// Route to update an existing completion entry and add new images
router.put('/comp/:id', upload.array('images'), async (req, res) => {
    const { id: book_id } = req.params;
    const { supervised, initiated, Voucher, closed, close_date, approved, aditional_fault } = req.body;

    try {
        const completion = await Completion.findOne({ where: { logbookID: book_id } });

        if (!completion) {
            return res.status(404).json({ error: 'No completion entry found to update for the given book ID.' });
        }

        await completion.update({ supervised, initiated, Voucher, closed, close_date, approved, aditional_fault });

        if (req.files && req.files.length > 0) {
            const images = await CompImage.bulkCreate(
                req.files.map((file, index) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    CompID: completion.id, // Associate images with the updated completion entry
                    fileName: `${file.originalname}${index}` // Append index to file name if multiple files
                }))
            );
        }

        res.status(200).json({ message: 'Completion entry updated successfully' });
    } catch (error) {
        console.error('Error updating completion entry:', error);
        res.status(500).json({ error: 'An error occurred while updating the completion entry.' });
    }
});
router.get('/comp/:logbookID', async (req, res) => {
    const { logbookID } = req.params;

    try {
        const completion = await Completion.findOne({ where: { logbookID } });

        if (!completion) {
            return res.status(404).json({ error: 'No completion entry found for the given book ID.' });
        }

        res.status(200).json(completion);
    } catch (error) {
        console.error('Error fetching completion entry:', error);
        res.status(500).json({ error: 'An error occurred while fetching the completion entry.' });
    }
});
import db from '../config/sequelize.js';

// Route to fetch images for a specific completion entry
router.get('/images/:id', async (req, res) => {
    const { id: logbookID } = req.params;

    try {
        const images = `
        SELECT * FROM compimage
        JOIN completion ON compimage.CompID = completion.id
        WHERE completion.logbookID = ?`;

        // Convert fileData to base64
        const results = await db.query(images, {
            replacements: [logbookID],
            type: db.QueryTypes.SELECT,
        });
        const formattedImages = results.map(image => ({
            fileType: image.fileType,
            fileData: image.fileData.toString('base64'), // Convert binary to Base64 if needed
        }));
        res.status(200).json(formattedImages);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'An error occurred while fetching images.' });
    }
});

// Route to delete a specific completion image
router.delete('/comp/image/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Received request to delete image with ID: ${id}`); // Debugging log

    try {
        // Check if the image exists
        const image = await CompImage.findOne({ where: { id } });

        if (!image) {
            console.log(`No image found with ID: ${id}`); // Debugging log
            return res.status(404).json({ error: 'No completion image found to delete for the given ID.' });
        }

        // Delete the image
        await image.destroy();
        console.log(`Image with ID: ${id} deleted successfully`); // Debugging log
        res.status(200).json({ message: 'Completion image deleted successfully' });
    } catch (error) {
        console.error('Error deleting completion image:', error);
        res.status(500).json({ error: 'An error occurred while deleting the completion image.' });
    }
});



export default router;