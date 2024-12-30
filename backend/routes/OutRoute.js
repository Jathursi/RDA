import express from 'express';
import multer from 'multer';
import OutSource from '../model/OutSource.js';
import Outimg from '../model/Outimg.js';
import OutSundries from '../model/OutSundries.js';

const router = express.Router();

// Set up multer to store files in memory with size limits
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit file size to 100MB (100 * 1024 * 1024 bytes)
    }
});

// Middleware to parse JSON data
router.use(express.json());

// Route to create a new outsource entry
router.post('/Outinsert/:logbookId', upload.array('images'), async (req, res) => {
    const { logbookId } = req.params;

    // Parse the JSON fields
    let values, sundries;
    try {
        values = JSON.parse(req.body.values);
        sundries = JSON.parse(req.body.sundries);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON format for values or sundries' });
    }

    try {
        // Create the outsource entry
        const outsourceEntries = await OutSource.create({
            Date: values.Date,
            Description: values.Description,
            Job_NO: values.Job_NO,
            Supplier: values.Supplier,
            cost: values.cost,
            Authority: values.Authority,
            LogbookID: logbookId,
        });

        // Create the sundries entries
        const sundriesEntries = await OutSundries.bulkCreate(
            sundries.map((sundry) => ({
                Sundries: sundry.Sundries,
                Sun_cost: sundry.Sun_cost,
                OutID: outsourceEntries.id, // Assuming this is the associated OutSource entry
            }))
        );

        // Check and process uploaded images
        if (req.files && req.files.length > 0) {
            const images = await Outimg.bulkCreate(
                req.files.map((file) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    OutID: outsourceEntries.id, // Associate images with the OutSource entry
                }))
            );
        }

        res.status(201).json({
            message: 'Outsource entry created successfully',
            outsourceEntries,
            sundriesEntries,
        });
    } catch (error) {
        console.error('Error creating outsource entry:', error);
        res.status(500).json({ error: 'An error occurred while creating the outsource entry.' });
    }
});

// Route to update an existing outsource entry
router.put('/Outupdate/:logbookId', upload.array('images'), async (req, res) => {
    const { logbookId } = req.params;
    const { values, sundries } = JSON.parse(req.body.values);

    try {
        // Update the outsource entries
        for (const value of values) {
            await OutSource.update(value, { where: { id: value.id } });
        }

        // Update the sundries entries
        for (const sundry of sundries) {
            await OutSundries.update(sundry, { where: { id: sundry.id } });
        }

        // Check and process uploaded images
        if (req.files && req.files.length > 0) {
            const images = await Outimg.bulkCreate(
                req.files.map(file => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    OutID: values[0].id // Associate images with the first outsource entry
                }))
            );
        }

        res.status(200).json({ message: 'Outsource entry updated successfully' });
    } catch (error) {
        console.error('Error updating outsource entry:', error);
        res.status(500).json({ error: 'An error occurred while updating the outsource entry.' });
    }
});

// Route to fetch all outsource entries for a specific logbook ID
router.get('/Outview/:logbookId', async (req, res) => {
    const { logbookId } = req.params;

    try {
        const outsourceEntries = await OutSource.findAll({ where: { LogbookID: logbookId } });
        const sundriesEntries = await OutSundries.findAll({ where: { OutID: outsourceEntries[0].id } });
        const images = await Outimg.findAll({ where: { OutID: outsourceEntries[0].id } });

        const formattedImages1 = images.map(image => ({
            fileType: image.fileType, // e.g., "image/png"
            fileData: image.fileData.toString('base64'), // Convert to base64
        }));

        res.status(200).json({
            outsourceEntries,
            sundriesEntries,
            image1: formattedImages1, // Include the formatted images
        });
    } catch (error) {
        console.error('Error fetching outsource entries:', error);
        res.status(500).json({ error: 'An error occurred while fetching the outsource entries.' });
    }
});

export default router;