import express from 'express';
import multer from 'multer';
import InImage from '../Model/InImage.js'; // Ensure this import is correct

const router = express.Router();

// Set up multer to store files in memory with size limits
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 100000 * 1024 * 1024 // Limit file size to 100MB
    }
});

// File upload route for multiple images
router.post('/uploadImg/:id', upload.array('images', 10), async (req, res) => {
    try {
        const files = req.files;
        const { customName } = req.body;
        const book_id = req.params.id;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        if (!book_id) {
            return res.status(400).json({ message: 'No book_id provided' });
        }

        const images = await Promise.all(files.map(async (file) => {
            return await InImage.create({
                customName,
                book_id,
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
router.get('/inimages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const images = await InImage.findAll({ where: { book_id: id } }); // Use InImage model here
        const formattedImages = images.map(image => ({
            id: image.id,
            customName: image.customName,
            fileType: image.fileType,
            fileData: image.fileData.toString('base64')
        }));
        res.status(200).json(formattedImages);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images' });
    }
});

// Delete image by id
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Received request to delete image with id: ${id}`); // Debugging line
    try {
        const image = await InImage.findByPk(id);
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