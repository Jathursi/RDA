import express from 'express';
import multer from 'multer';
import Resourse from '../Model/Resourse.js';

const router = express.Router();

// Set up multer to store files in memory with size limits
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit file size to 100MB (100 * 1024 * 1024 bytes)
    }
});

// File upload route
router.post('/upload/:id', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const { customName } = req.body;
        const book_id = req.params.id;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        if (!customName) {
            return res.status(400).json({ message: 'No custom name provided' });
        }

        if (!book_id) {
            return res.status(400).json({ message: 'No book_id provided' });
        }

        // Create a new resource in the database
        const newResourse = await Resourse.create({
            customName,
            book_id,
            fileType: file.mimetype,
            fileSize: file.size,
            fileData: file.buffer // Storing file as buffer in DB
        });

        res.status(201).json(newResourse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
});

router.get('/resources/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book_id = id;
        const resources = await Resourse.findAll({
            where: { book_id }
        });

        // Convert fileData to base64
        const formattedResources = resources.map(resource => ({
            ...resource.dataValues,
            fileData: resource.fileData.toString('base64')  // Base64 encoding
        }));

        res.status(200).json(formattedResources);
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ message: 'Error fetching resources' });
    }
});

// Delete resource route
router.delete('/resource/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resource = await Resourse.findByPk(id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        await resource.destroy();
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({ message: 'Error deleting resource' });
    }
});





export default router;