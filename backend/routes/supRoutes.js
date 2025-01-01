import express from 'express';
import multer from 'multer';
import Suppliment from '../model/Suppliment.js';
import SupSupplier from '../model/SupSupplier.js';
import SupMat from '../model/SupMat.js';
import SupQuotation from '../model/SupQuotation.js';
import SupMac from '../model/SupMac.js';
import SupLab from '../model/SupLab.js';
import SupTrans from '../model/SupTrans.js';
import SupWel from '../model/SupWel.js';
import SupSun from '../model/SupSun.js';
import Supimage from '../model/Supimage.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to create a new estimate
router.post('/Supinsert/:logbookId', upload.array('images'), async (req, res) => {
    const { No, Date, Estimated } = req.body;
    const { logbookId } = req.params;

    if (!Date || !Estimated) {
        return res.status(400).json({ error: 'Date and Estimated fields are required.' });
    }

    try {
        // Check if an estimate already exists for this logbookId
        const existingEstimate = await Suppliment.findOne({ where: { LogbookID: logbookId } });

        if (existingEstimate) {
            return res.status(400).json({ error: 'Estimate already exists for this logbook ID.' });
        }

        // Create the estimate
        const suppliment = await Suppliment.create({
            No,
            Date,
            Estimated,
            LogbookID: logbookId,
        });

        // Check and process uploaded images
        if (req.files && req.files.length > 0) {
            const images = await Supimage.bulkCreate(
                req.files.map((file) => ({
                    fileType: file.mimetype,
                    fileSize: file.size,
                    fileData: file.buffer, // Save binary data to the database
                    EstID: suppliment.id,   // Associate images with the created estimate
                }))
            );

            return res.status(201).json({
                message: 'Estimate and images created successfully',
                suppliment,
                images,
            });
        }

        res.status(201).json({
            message: 'Estimate created successfully (no images uploaded)',
            suppliment,
        });
    } catch (error) {
        console.error('Error creating estimate:', error);
        res.status(500).json({ error: 'An error occurred while creating the estimate.' });
    }
});

router.put('/Supupdate/:logbookId', async (req, res) => {
    const { Date, Estimated } = req.body;
    const { logbookId } = req.params;

    if (!Date || !Estimated) {
        return res.status(400).json({ error: 'Date and Estimated fields are required.' });
    }

    try {
        const suppliment = await Suppliment.findOne({ where: { LogbookID: logbookId } });

        if (!suppliment) {
            return res.status(404).json({ error: 'No estimate found to update for the given logbook ID.' });
        }

        await suppliment.update({ Date, Estimated });

        res.status(200).json({ message: 'Estimate updated successfully' });
    } catch (error) {
        console.error('Error updating estimate:', error);
        res.status(500).json({ error: 'An error occurred while updating the estimate.' });
    }
});

router.get('/Supselect/:logbookId', async (req, res) => {
    const { logbookId } = req.params;

    try {
        const suppliment = await Suppliment.findOne({
            where: { LogbookID: logbookId },
        });

        if (!suppliment) {
            return res.status(404).json({
                error: 'No estimate found for the given logbook ID.',
            });
        }

        res.status(200).json({ suppliment });
    } catch (error) {
        console.error('Error fetching estimate:', error);
        res.status(500).json({ error: 'An error occurred while fetching the estimate' });
    }
});

// POST route for submitting category estimation details
// const submitCategory = async (req, res, categoryModel) => {
//     const { supID } = req.params;
//     const { details } = req.body;

//     if (!details) {
//         return res.status(400).json({ error: 'Details field is required.' });
//     }

//     try {
//         // Save category details
//         const categoryDetails = JSON.parse(details).map((item) => ({
//             ...item,
//             supID,
//         }));
//         await categoryModel.bulkCreate(categoryDetails);

//         res.status(200).json({ message: `${categoryModel.name} details saved successfully.` });
//     } catch (error) {
//         console.error(`Error saving ${categoryModel.name} details:`, error);
//         res.status(500).json({ error: `Failed to save ${categoryModel.name} details.` });
//     }
// };
const submitCategory = async (req, res, categoryModel) => {
    const { supID } = req.params;
    const { details, Suppliers, QuotationNo } = req.body;

    // Check for required fields, skip Suppliers and QuotationNo validation for Estsun
    if (categoryModel !== SupSun && (!details || !Suppliers || !QuotationNo)) {
        return res.status(400).json({ error: 'Details, Suppliers, and QuotationNo fields are required.' });
    }

    try {
        let supplier = null;

        // For models other than Estsun, handle supplier logic
        if (categoryModel !== SupSun) {
            supplier = await SupSupplier.create({ Suppliers, QuotationNo, supID });
            if (!supplier) {
                return res.status(400).json({ error: 'Invalid supplier details. Supplier does not exist.' });
            }

            // Handle image uploads (if any)
            const images = req.files.map((file) => ({
                fileType: file.mimetype,
                fileSize: file.size,
                fileData: file.buffer, // Store file data
                supID: supplier.id, // Associate with supplier
            }));
            await SupQuotation.bulkCreate(images);
        }

        // Save category details
        const categoryDetails = JSON.parse(details).map((item) => ({
            ...item,
            supID, // Always include EstID
        }));

        console.log('Category details:', categoryDetails);
        await categoryModel.bulkCreate(categoryDetails);

        res.status(200).json({ message: `${categoryModel.name} details saved successfully.` });
    } catch (error) {
        console.error(`Error saving ${categoryModel.name} details:`, error);
        res.status(500).json({ error: `Failed to save ${categoryModel.name} details.` });
    }
};

router.post('/submitCategory/material/:supID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, SupMat));
router.post('/submitCategory/labour/:supID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, SupLab));
router.post('/submitCategory/machining/:supID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, SupMac));
router.post('/submitCategory/welding/:supID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, SupWel));
router.post('/submitCategory/transport/:supID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, SupTrans));
router.post('/submitCategory/sundries/:supID', upload.none(), (req, res) => submitCategory(req, res, SupSun));

import db from '../config/sequelize.js';

// router.get('/fetchAllCategories/:LogbookId', async (req, res) => {
//     const { LogbookId } = req.params;

//     try {
//         const sql = `
//             SELECT 
//                 suppliment.No AS no,
//                 supsupplier.Suppliers AS Suppliers,
//                 supmat.Material AS MatItem,
//                 supmat.Mat_cost AS MatCost,
//                 supmat.MatQ AS MatQuantity,
//                 suplab.Labour AS LabItem,
//                 suplab.Lab_cost AS LabCost,
//                 suplab.LabQ AS LabQuantity,
//                 supmac.Machining AS MacItem,
//                 supmac.Mac_cost AS MacCost,
//                 supmac.MacQ AS MacQuantity,
//                 suptrans.Transport AS TransItem,
//                 suptrans.Trans_cost AS TransCost,
//                 suptrans.TransQ AS TransQuantity,
//                 supwel.Welding AS WelItem,
//                 supwel.Wel_cost AS WelCost,
//                 supwel.WelQ AS WelQuantity,
//                 supsun.Sundries AS SunItem,
//                 supsun.Sun_cost AS SunCost,
//                 logbook.id AS LogbookId
//             FROM supsupplier
//             LEFT JOIN supmat ON supsupplier.id = supmat.supID
//             LEFT JOIN suplab ON supsupplier.id = suplab.supID
//             LEFT JOIN supmac ON supsupplier.id = supmac.supID
//             LEFT JOIN suptrans ON supsupplier.id = suptrans.supID
//             LEFT JOIN supwel ON supsupplier.id = supwel.supID
//             LEFT JOIN supsun ON supsupplier.id = supsun.supID
//             LEFT JOIN suppliment ON suppliment.id = supsupplier.supplimentID
//             LEFT JOIN logbook ON logbook.id = suppliment.LogbookID
//             WHERE logbook.id = ?
//             `;

//         const results = await db.query(sql, {
//             replacements: [LogbookId],
//             type: db.QueryTypes.SELECT,
//         });

//         res.status(200).json(results);
//     } catch (error) {
//         console.error('Error fetching category data:', error);
//         res.status(500).json({ error: 'An error occurred while fetching category data.' });
//     }
// });
router.get('/fetchAllCategories/:LogbookId', async (req, res) => {
    const { LogbookId } = req.params;
    try {
        const sql = `
            SELECT 
            supsupplier.Suppliers AS Suppliers,
            supmat.Material AS MatItem,
            supmat.Mat_cost AS MatCost,
            supmat.MatQ AS MatQuantity,
            suplab.Labour AS LabItem,
            suplab.Lab_cost AS LabCost,
            suplab.LabQ AS LabQuantity,
            supmac.Machining AS MacItem,
            supmac.Mac_cost AS MacCost,
            supmac.MacQ AS MacQuantity,
            suptrans.Transport AS TransItem,
            suptrans.Trans_cost AS TransCost,
            suptrans.TransQ AS TransQuantity,
            supwel.Welding AS WelItem,
            supwel.Wel_cost AS WelCost,
            supwel.WelQ AS WelQuantity,
            logbook.id AS LogbookId
        FROM supsupplier
        LEFT JOIN supmat ON supsupplier.id = supmat.supID
        LEFT JOIN suplab ON supsupplier.id = suplab.supID
        LEFT JOIN supmac ON supsupplier.id = supmac.supID
        LEFT JOIN suptrans ON supsupplier.id = suptrans.supID
        LEFT JOIN supwel ON supsupplier.id = supwel.supID
        LEFT JOIN suppliment ON suppliment.id = supsupplier.supID
        LEFT JOIN logbook ON logbook.id = suppliment.LogbookID
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
    const { id: supID } = req.params; 
    try {
        const suppliers = await SupSupplier.findAll({ where: { supID } });
        const images1 = await Promise.all(
            suppliers.map(supplier => 
                SupQuotation.findAll({ where: { supID: supplier.id } })
            )
        );
        const flattenedImages1 = images1.flat();
        const images2 = await Supimage.findAll({ where: { EstID: supID } });
        const formattedImages1 = flattenedImages1.map(image => ({
            ...image.dataValues,
            fileData: image.fileData.toString('base64'),
        }));
        const formattedImages2 = images2.map(image => ({
            ...image.dataValues,
            fileData: image.fileData.toString('base64'),
        }));

        const images = {
            quotationImages1: formattedImages1,
            estimateImages1: formattedImages2,
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
        const estimate = await Suppliment.findOne({ where: { id } });
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