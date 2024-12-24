import express from 'express';
import multer from 'multer';
import Implement from '../model/Impliment.js';
import ImpImage from '../model/impImage.js';
import ImplementMat from '../model/implemetmat.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to create a new implement entry
router.post('/Iminsert/:id', upload.array('images'), async (req, res) => {
    const { id: logbookID } = req.params;
    const { Start_Date, Job_Assigned, Req_date, Req_off, Auth } = req.body;

    try {
        const newEntry = await Implement.create({
            Start_Date,
            Job_Assigned,
            Req_date,
            Req_off,
            Auth,
            logbookID,
        });

        if (req.files && req.files.length > 0) {
            const images = await ImpImage.bulkCreate(
                req.files.map((file) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    impID: newEntry.id,   // Associate images with the created implement
                }))
            );
        }

        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error adding implement:', error);
        res.status(500).json({ error: 'Failed to add implement' });
    }
});

// PUT route to update an existing implement entry
router.put('/Imput/:id', upload.array('images'), async (req, res) => {
    const { id: logbookID } = req.params;
    const { Start_Date, Job_Assigned, Req_date, Req_off, Auth } = req.body;

    try {
        const updatedEntry = await Implement.update({
            Start_Date,
            Job_Assigned,
            Req_date,
            Req_off,
            Auth,
        }, {
            where: { logbookID }
        });

        if (req.files && req.files.length > 0) {
            const images = await ImpImage.bulkCreate(
                req.files.map((file) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    impID: logbookID,   // Associate images with the updated implement
                }))
            );
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        console.error('Error updating implement:', error);
        res.status(500).json({ error: 'Failed to update implement' });
    }
});

// GET route to fetch an implement entry by logbookID
router.get('/Imget/:id', async (req, res) => {
    const { id: logbookID } = req.params;

    try {
        const implement = await Implement.findOne({ where: { logbookID } });
        res.status(200).json(implement);
    } catch (error) {
        console.error('Error fetching implement:', error);
        res.status(500).json({ error: 'Failed to fetch implement' });
    }
});

// GET route to fetch all implementmat entries by logbookID
router.get('/implementmat/:logbookID', async (req, res) => {
    const { logbookID } = req.params;

    try {
        const implementMatEntries = await ImplementMat.findAll({ where: { logbookID } });
        res.status(200).json(implementMatEntries);
    } catch (error) {
        console.error('Error fetching implementmat entries:', error);
        res.status(500).json({ error: 'Failed to fetch implementmat entries' });
    }
});

export default router;