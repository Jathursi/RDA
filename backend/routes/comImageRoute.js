import express from 'express';
import multer from 'multer';
import CompImage from '../Model/CompImage.js'; // Correct import path

const router = express.Router();

// Set up multer to store files in memory with size limits
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit file size to 100MB (100 * 1024 * 1024 bytes)
    }
});

// File upload route for multiple images
router.post('/uploadComp/:id', upload.array('images', 10), async (req, res) => {
    try {
        const files = req.files;
        const { customName } = req.body;
        const book_id = req.params.id;  // Extract book_id from URL parameters

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        if (!book_id) {
            return res.status(400).json({ message: 'No book_id provided' });
        }

        // Create an array to hold the resources created
        const images = await Promise.all(files.map(async (file) => {
            return await CompImage.create({
                customName,
                book_id, // Pass book_id when creating the resource
                fileType: file.mimetype,
                fileSize: file.size,
                fileData: file.buffer
            });
        }));

        res.status(201).json(images);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Fetch images by book_id
router.get('/compimage/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const images = await CompImage.findAll({
            where: { book_id: id },
        });

        if (images.length === 0) {
            return res.status(404).json({ message: 'No images found' });
        }

        const formattedImages = images.map(image => ({
            id: image.id,
            customName: image.customName,
            fileType: image.fileType,
            fileData: image.fileData.toString('base64')
        }));

        res.json(formattedImages);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images', error: error.message });
    }
});

// Delete image by id
router.delete('/deletecomp/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Received request to delete image with id: ${id}`); // Debugging line
    try {
        const image = await CompImage.findByPk(id);
        if (!image) {
            console.log(`Image with id ${id} not found`); // Debugging line
            return res.status(404).json({ message: 'Image not found' });
        }
        await image.destroy();
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Error deleting image' });
    }
});

export default router;