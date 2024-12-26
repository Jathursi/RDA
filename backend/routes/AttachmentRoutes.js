import express from 'express';
import multer from 'multer';
import Docs from '../model/Docs.js';
import Logbook from '../model/Logbook.js';

const router = express.Router();

// Set up multer to store files in memory with size limits
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit file size to 100MB (100 * 1024 * 1024 bytes)
    }
});

// Helper function to generate a unique file name
const generateUniqueFileName = async (baseName, logbookID) => {
    let fileName = baseName;
    let index = 1;

    while (await Docs.findOne({ where: { fileName, LogbookID: logbookID } })) {
        fileName = `${baseName}${index}`;
        index++;
    }

    return fileName;
};

// File upload route
router.post('/upload/:id', upload.array('files'), async (req, res) => {
    try {
        const files = req.files;
        const { customName } = req.body;
        const LogbookID = req.params.id;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        if (!customName) {
            return res.status(400).json({ message: 'No custom name provided' });
        }

        if (!LogbookID) {
            return res.status(400).json({ message: 'No LogbookID provided' });
        }

        const newResources = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const baseName = i === 0 ? customName : `${customName}${i}`;
            const fileName = await generateUniqueFileName(baseName, LogbookID);

            const newResource = await Docs.create({
                LogbookID,
                fileName,
                fileType: file.mimetype,
                fileData: file.buffer // Storing file as buffer in DB
            });

            newResources.push(newResource);
        }

        res.status(201).json(newResources);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
});

router.get('/resources/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const LogbookID = id;
        const resources = await Docs.findAll({
            where: { LogbookID }
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
        const resource = await Docs.findByPk(id);

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