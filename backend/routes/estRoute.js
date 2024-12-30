import express from 'express';
import Estimate from '../model/Estimate.js';
import Supplier from '../model/Supplier.js';
import EstMat from '../model/EstMat.js';
import Estlab from '../model/Estlab.js';
import Estmac from '../model/Estmac.js';
import Estwel from '../model/Estwel.js';
import EstTrans from '../model/EstTrans.js';
import Estsun from '../model/Estsun.js';
import QutationImg from '../model/QutationImg.js';
import EstImage from '../model/EstImage.js';
import multer from 'multer';
import ImplementMat from '../model/ImplementMat.js';
import Logbook from '../model/Logbook.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to create a new estimate
router.post('/Estinsert/:logbookId', upload.array('images'), async (req, res) => {
    const { Date, Estimated } = req.body;
    const { logbookId } = req.params;

    if (!Date || !Estimated) {
        return res.status(400).json({ error: 'Date and Estimated fields are required.' });
    }

    try {
        const existingEstimate = await Estimate.findOne({ where: { logbookID: logbookId } });

        if (existingEstimate) {
            return res.status(400).json({ error: 'Estimate already exists for this logbook ID.' });
        }

        const estimate = await Estimate.create({
            Date,
            Estimated,
            logbookID: logbookId, // Ensure correct field name
        });

        if (req.files && req.files.length > 0) {
            const images = await EstImage.bulkCreate(
                req.files.map((file) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer,
                    EstID: estimate.id,
                }))
            );

            return res.status(201).json({
                message: 'Estimate and images created successfully',
                estimate,
                images,
            });
        }

        res.status(201).json({
            message: 'Estimate created successfully (no images uploaded)',
            estimate,
        });
    } catch (error) {
        console.error('Error creating estimate:', error);
        res.status(500).json({ error: 'An error occurred while creating the estimate.' });
    }
});


// Route to update an existing estimate and add additional images
router.put('/Estupdate/:logbookId', upload.array('images'), async (req, res) => {
    const { Date, Estimated } = req.body;
    const { logbookId } = req.params;

    if (!Date || !Estimated) {
        return res.status(400).json({ error: 'Date and Estimated fields are required.' });
    }

    try {
        const estimate = await Estimate.findOne({ where: { LogbookID: logbookId } });

        if (!estimate) {
            return res.status(404).json({ error: 'No estimate found to update for the given logbook ID.' });
        }

        await estimate.update({ Date, Estimated });

        // Check and process uploaded images
        if (req.files && req.files.length > 0) {
            const images = await EstImage.bulkCreate(
                req.files.map((file) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    EstID: estimate.id,   // Associate images with the updated estimate
                }))
            );
        }

        res.status(200).json({ message: 'Estimate updated successfully' });
    } catch (error) {
        console.error('Error updating estimate:', error);
        res.status(500).json({ error: 'An error occurred while updating the estimate.' });
    }
});

router.get('/Estselect/:logbookId', async (req, res) => {
    const { logbookId } = req.params;

    try {
        const estimate = await Estimate.findOne({
            where: { LogbookID: logbookId },
        });

        if (!estimate) {
            return res.status(404).json({
                error: 'No estimate found for the given logbook ID.',
            });
        }

        res.status(200).json({ estimate });
    } catch (error) {
        console.error('Error fetching estimate:', error);
        res.status(500).json({ error: 'An error occurred while fetching the estimate' });
    }
});

// POST route for submitting category estimation details
const submitCategory = async (req, res, categoryModel) => {
    const { EstID } = req.params;
    const { details } = req.body;

    if (!details) {
        return res.status(400).json({ error: 'Details field is required.' });
    }

    try {
        // Save category details
        const categoryDetails = JSON.parse(details).map((item) => ({
            ...item,
            EstID,
        }));
        await categoryModel.bulkCreate(categoryDetails);

        res.status(200).json({ message: `${categoryModel.name} details saved successfully.` });
    } catch (error) {
        console.error(`Error saving ${categoryModel.name} details:`, error);
        res.status(500).json({ error: `Failed to save ${categoryModel.name} details.` });
    }
};

router.post('/submitCategory/material/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, EstMat));
router.post('/submitCategory/labour/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, Estlab));
router.post('/submitCategory/machining/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, Estmac));
router.post('/submitCategory/welding/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, Estwel));
router.post('/submitCategory/transport/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, EstTrans));
router.post('/submitCategory/sundries/:EstID', upload.none(), (req, res) => submitCategory(req, res, Estsun));

import db from '../config/sequelize.js';
router.post('/implementmat/:logbookID', async (req, res) => {
    const { supplier, category, item, cost, quantity, logbookID } = req.body;

    try {
        // Check if the item already exists in the ImplementMat table
        const existingEntry = await ImplementMat.findOne({
            where: { supplier, category, item, logbookID },
        });

        if (existingEntry) {
            return res.status(400).json({ error: 'Item already implemented and cannot be added again.' });
        }

        // If not, create a new entry with stored set to true
        const newEntry = await ImplementMat.create({
            supplier,
            category,
            item,
            cost,
            quantity,
            logbookID,
            stored: true, // Set stored to true
        });

        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error adding implementmat:', error);
        res.status(500).json({ error: 'Failed to add implementmat' });
    }
});


// Route to fetch all category data by logbook ID
router.get('/fetchAllCategories/:LogbookId', async (req, res) => {
    const { LogbookId } = req.params;
    try {
        const sql = `
            SELECT 
            supplier.Suppliers AS Suppliers,
            estmat.Material AS MatItem,
            estmat.Mat_cost AS MatCost,
            estmat.MatQ AS MatQuantity,
            estlab.Labour AS LabItem,
            estlab.Lab_cost AS LabCost,
            estlab.LabQ AS LabQuantity,
            estmac.Machining AS MacItem,
            estmac.Mac_cost AS MacCost,
            estmac.MacQ AS MacQuantity,
            esttrans.Transport AS TransItem,
            esttrans.Trans_cost AS TransCost,
            esttrans.TransQ AS TransQuantity,
            estwel.Welding AS WelItem,
            estwel.Wel_cost AS WelCost,
            estwel.WelQ AS WelQuantity,
            logbook.id AS LogbookId
        FROM supplier
        LEFT JOIN estmat ON supplier.id = estmat.supID
        LEFT JOIN estlab ON supplier.id = estlab.supID
        LEFT JOIN estmac ON supplier.id = estmac.supID
        LEFT JOIN esttrans ON supplier.id = esttrans.supID
        LEFT JOIN estwel ON supplier.id = estwel.supID
        LEFT JOIN estimates ON estimates.id = supplier.EstID
        LEFT JOIN logbook ON logbook.id = estimates.LogbookID
        WHERE logbook.id = ?
        `;
        const results = await db.query(sql, {
            replacements: [LogbookId],
            type: db.QueryTypes.SELECT,
        });
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching category data:', error);
        res.status(500).json({ error: 'An error occurred while fetching category data.' });
    }
});

router.get('/images/:id', async (req, res) => {
    const { id: EstID } = req.params; 
    try {
        const suppliers = await Supplier.findAll({ where: { EstID } });
        const images1 = await Promise.all(
            suppliers.map(supplier => 
                QutationImg.findAll({ where: { supID: supplier.id } })
            )
        );
        const flattenedImages1 = images1.flat();
        const images2 = await EstImage.findAll({ where: { EstID } });
        const formattedImages1 = flattenedImages1.map(image => ({
            ...image.dataValues,
            fileData: image.fileData.toString('base64'),
        }));
        const formattedImages2 = images2.map(image => ({
            ...image.dataValues,
            fileData: image.fileData.toString('base64'),
        }));

        const images = {
            quotationImages: formattedImages1,
            estimateImages: formattedImages2,
        };

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

router.get('/est/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const estimate = await Estimate.findOne({ where: { id } });
        if (!estimate) {
            return res.status(404).json({ error: 'Estimate not found' });
        }
        res.status(200).json({ estimate });
    } catch (error) {
        console.error('Error fetching estimate:', error);
        res.status(500).json({ error: 'Failed to fetch estimate' });
    }
});

export default router;