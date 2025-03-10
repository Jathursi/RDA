import express from 'express';
import multer from 'multer';
import Implement from '../model/Impliment.js';
import ImpImage from '../model/ImpImage.js';
import ImplementMat from '../model/ImplementMat.js';


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
                    ImpID: newEntry.id,   // Associate images with the created implement
                }))
            );
            console.log('Images saved:', images); // Log saved images
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
        const implement = await Implement.findOne({ where: { logbookID } });
        
        if (!implement) {
            return res.status(404).json({ error: 'Implement entry not found' });
        }

        await implement.update({ 
            Start_Date,
            Job_Assigned,
            Req_date,
            Req_off,
            Auth,
        });

        if (req.files && req.files.length > 0) {
            const images = await ImpImage.bulkCreate(
                req.files.map((file) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    ImpID: implement.id,   // Associate images with the updated implement
                }))
            );
            console.log('Additional images saved:', images); // Log saved images
        }

        res.status(200).json(implement);
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
// import express from 'express';
// import ImplementMat from '../model/ImplementMat.js';
router.get('/implementedItems/:logbookID', async (req, res) => {
  const { logbookID } = req.params;

  try {
    const implementedItems = await ImplementMat.findAll({ where: { logbookID } });
    res.status(200).json(implementedItems);
  } catch (error) {
    console.error('Error fetching implemented items:', error);
    res.status(500).json({ error: 'Failed to fetch implemented items' });
  }
});
// Update the 'stored' field for an item
router.patch('/implementmat/:id', async (req, res) => {
    const { id } = req.params;
    const { stored } = req.body;

    try {
        const item = await ImplementMat.findByPk(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        item.stored = stored;
        await item.save();

        res.status(200).json(item);
        console.log(item)
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});


// const router = express.Router();

// Other routes...

// Route to update the issued column
router.put('/updateIssued/:id', async (req, res) => {
    const { id } = req.params;
    const { issued } = req.body;

    try {
        const implementMat = await ImplementMat.findByPk(id);
        if (!implementMat) {
            return res.status(404).json({ error: 'ImplementMat not found' });
        }

        implementMat.issued = issued;
        await implementMat.save();

        res.status(200).json({ message: 'Issued value updated successfully' });
    } catch (error) {
        console.error('Error updating issued value:', error);
        res.status(500).json({ error: 'Failed to update issued value' });
    }
});
import db from '../config/sequelize.js';
router.get('/images/:id', async (req, res) => {
    const { id: logbookID } = req.params;

    try {
        const images = `
        SELECT * FROM impimage
        JOIN implement ON impimage.ImpID = implement.id
        WHERE implement.logbookID = ?`;
        // If fileData is stored as binary, ensure proper encoding
        const results = await db.query(images, {
            replacements: [logbookID],
            type: db.QueryTypes.SELECT,
        });
        const formattedImages = results.map(image => ({
            fileType: image.fileType,
            fileData: image.fileData.toString('base64'), // Convert binary to Base64 if needed
        }));
        res.status(200).json(formattedImages);
        console.log(formattedImages)
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

// export default router;
export default router;