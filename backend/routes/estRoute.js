// // import express from 'express';
// // import Estimate from '../model/Estimate.js';
// // import Supplier from '../model/Supplier.js';
// // import EstMat from '../model/EstMat.js';
// // import Estlab from '../model/Estlab.js';
// // import Estmac from '../model/Estmac.js';
// // import Estwel from '../model/Estwel.js';
// // import EstTrans from '../model/EstTrans.js';
// // import Estsun from '../model/Estsun.js';
// // import QutationImg from '../model/QutationImg.js';
// // import EstImage from '../model/EstImage.js';
// // import multer from 'multer';
// // import ImplementMat from '../model/ImplementMat.js';
// // import Logbook from '../model/Logbook.js';
// // import verifyToken from '../middlewares/verifyToken.js';

// // const router = express.Router();

// // // Configure multer for file uploads
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage: storage });

// // // Route to create a new estimate
// // router.post('/Estinsert/:logbookId', upload.array('images'), async (req, res) => {
// //     const { Date, Estimated } = req.body;
// //     const { logbookId } = req.params;

// //     if (!Date || !Estimated) {
// //         return res.status(400).json({ error: 'Date and Estimated fields are required.' });
// //     }

// //     try {
// //         const existingEstimate = await Estimate.findOne({ where: { logbookID: logbookId } });

// //         if (existingEstimate) {
// //             return res.status(400).json({ error: 'Estimate already exists for this logbook ID.' });
// //         }

// //         const estimate = await Estimate.create({
// //             Date,
// //             Estimated,
// //             logbookID: logbookId, // Ensure correct field name
// //         });

// //         if (req.files && req.files.length > 0) {
// //             const images = await EstImage.bulkCreate(
// //                 req.files.map((file) => ({
// //                     fileType: file.mimetype,
// //                     fileSize: file.size,
// //                     fileData: file.buffer,
// //                     EstID: estimate.id,
// //                 }))
// //             );

// //             return res.status(201).json({
// //                 message: 'Estimate and images created successfully',
// //                 estimate,
// //                 images,
// //             });
// //         }

// //         res.status(201).json({
// //             message: 'Estimate created successfully (no images uploaded)',
// //             estimate,
// //         });
// //     } catch (error) {
// //         console.error('Error creating estimate:', error);
// //         res.status(500).json({ error: 'An error occurred while creating the estimate.' });
// //     }
// // });


// // // Route to update an existing estimate and add additional images
// // router.put('/Estupdate/:logbookId', upload.array('images'), async (req, res) => {
// //     const { Date, Estimated } = req.body;
// //     const { logbookId } = req.params;

// //     if (!Date || !Estimated) {
// //         return res.status(400).json({ error: 'Date and Estimated fields are required.' });
// //     }

// //     try {
// //         const estimate = await Estimate.findOne({ where: { LogbookID: logbookId } });

// //         if (!estimate) {
// //             return res.status(404).json({ error: 'No estimate found to update for the given logbook ID.' });
// //         }

// //         await estimate.update({ Date, Estimated });

// //         // Check and process uploaded images
// //         if (req.files && req.files.length > 0) {
// //             const images = await EstImage.bulkCreate(
// //                 req.files.map((file) => ({
// //                     fileType: file.mimetype,
// //                     fileSize: file.size,
// //                     fileData: file.buffer, // Save binary data to the database
// //                     EstID: estimate.id,   // Associate images with the updated estimate
// //                 }))
// //             );
// //         }

// //         res.status(200).json({ message: 'Estimate updated successfully' });
// //     } catch (error) {
// //         console.error('Error updating estimate:', error);
// //         res.status(500).json({ error: 'An error occurred while updating the estimate.' });
// //     }
// // });

// // router.get('/Estselect/:logbookId', async (req, res) => {
// //     const { logbookId } = req.params;

// //     try {
// //         const estimate = await Estimate.findOne({
// //             where: { LogbookID: logbookId },
// //         });

// //         if (!estimate) {
// //             return res.status(404).json({
// //                 error: 'No estimate found for the given logbook ID.',
// //             });
// //         }

// //         res.status(200).json({ estimate });
// //     } catch (error) {
// //         console.error('Error fetching estimate:', error);
// //         res.status(500).json({ error: 'An error occurred while fetching the estimate' });
// //     }
// // });

// // // // POST route for submitting category estimation details
// // // const submitCategory = async (req, res, categoryModel) => {
// // //     const { EstID } = req.params;
// // //     console.log('EstID:', EstID);
// // //     const { details } = req.body;

// // //     if (!details ) {
// // //         return res.status(400).json({ error: 'Details and supID fields are required.' });
// // //     }

// // //     try {
// // //         // Check if the supID exists in the supplier table
// // //         const supplier = await Supplier.findOne({ where: { id: EstID } });
// // //         if (!supplier) {
// // //             return res.status(400).json({ error: 'Invalid supID. Supplier does not exist.' });
// // //         }

// // //         // Save category details
// // //         const categoryDetails = JSON.parse(details).map((item) => ({
// // //             ...item,
// // //             EstID,
// // //             // supID, // Include supID in the details
// // //         }));
// // //         await categoryModel.bulkCreate(categoryDetails);

// // //         res.status(200).json({ message: `${categoryModel.name} details saved successfully.` });
// // //     } catch (error) {
// // //         console.error(`Error saving ${categoryModel.name} details:`, error);
// // //         res.status(500).json({ error: `Failed to save ${categoryModel.name} details.` });
// // //     }
// // // };

// // // router.post('/submitCategory/material/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, EstMat));
// // // // POST route for submitting category estimation details



// // import db from '../config/sequelize.js';
// // router.post('/implementmat/:logbookID', async (req, res) => {
// //     const { supplier, category, item, cost, quantity, logbookID } = req.body;

// //     try {
// //         // Check if the item already exists in the ImplementMat table
// //         const existingEntry = await ImplementMat.findOne({
// //             where: { supplier, category, item, logbookID },
// //         });

// //         if (existingEntry) {
// //             return res.status(400).json({ error: 'Item already implemented and cannot be added again.' });
// //         }

// //         // If not, create a new entry with stored set to true
// //         const newEntry = await ImplementMat.create({
// //             supplier,
// //             category,
// //             item,
// //             cost,
// //             quantity,
// //             logbookID,
// //             stored: true, // Set stored to true
// //         });

// //         res.status(201).json(newEntry);
// //     } catch (error) {
// //         console.error('Error adding implementmat:', error);
// //         res.status(500).json({ error: 'Failed to add implementmat' });
// //     }
// // });


// // // Route to fetch all category data by logbook ID


// // router.get('/images/:id', async (req, res) => {
// //     const { id: EstID } = req.params; 
// //     try {
// //         const suppliers = await Supplier.findAll({ where: { EstID } });
// //         const images1 = await Promise.all(
// //             suppliers.map(supplier => 
// //                 QutationImg.findAll({ where: { supID: supplier.id } })
// //             )
// //         );
// //         const flattenedImages1 = images1.flat();
// //         const images2 = await EstImage.findAll({ where: { EstID } });
// //         const formattedImages1 = flattenedImages1.map(image => ({
// //             ...image.dataValues,
// //             fileData: image.fileData.toString('base64'),
// //         }));
// //         const formattedImages2 = images2.map(image => ({
// //             ...image.dataValues,
// //             fileData: image.fileData.toString('base64'),
// //         }));

// //         const images = {
// //             quotationImages: formattedImages1,
// //             estimateImages: formattedImages2,
// //         };

// //         res.status(200).json(images);
// //     } catch (error) {
// //         console.error('Error fetching images:', error);
// //         res.status(500).json({ error: 'Failed to fetch images' });
// //     }
// // });

// // router.get('/est/:id', async (req, res) => {
// //     const { id } = req.params;
// //     try {
// //         const estimate = await Estimate.findOne({ where: { id } });
// //         console.log('Estimate:', estimate);
// //         if (!estimate) {
// //             return res.status(404).json({ error: 'Estimate not found' });
// //         }
// //         res.status(200).json({ estimate });
// //     } catch (error) {
// //         console.error('Error fetching estimate:', error);
// //         res.status(500).json({ error: 'Failed to fetch estimate' });
// //     }
// // });
// // router.get('/estall/:id', async (req, res) => {
// //     const { id } = req.params;
// //     try {
// //         const estimate = await Estimate.findByPk({ where: { id } });
// //         console.log('Estimate:', estimate);
// //         if (!estimate) {
// //             return res.status(404).json({ error: 'Estimate not found' });
// //         }
// //         res.status(200).json({ estimate });
// //     } catch (error) {
// //         console.error('Error fetching estimate:', error);
// //         res.status(500).json({ error: 'Failed to fetch estimate' });
// //     }
// // });

// // // handle delete for estimage quatationimg
// // router.delete('/delete/:id', async (req, res) => {
// //     const { id } = req.params;
// //     console.log('ID received for deletion:', id);

// //     try {
// //         const estimage = await EstImage.findOne({ where: { id } });
// //         if (!estimage) {
// //             return res.status(404).json({ error: 'Estimage not found' });
// //         }
// //         const qutationimg = await QutationImg.findOne({ where: { id } });
// //         if (!qutationimg) {
// //             return res.status(404).json({ error: 'Qutationimg not found' });
// //         }

// //         await estimage.destroy();
// //         await qutationimg.destroy();
// //         res.status(200).json({ message: 'Estimage deleted successfully' });
// //     } catch (error) {
// //         console.error('Error deleting estimage:', error);
// //         res.status(500).json({ error: 'An error occurred while deleting the estimage.' });
// //     }
// // }
// // );

// // export default router;

// import express from 'express';
// import Estimate from '../model/Estimate.js';
// import Supplier from '../model/Supplier.js';
// import EstMat from '../model/EstMat.js';
// import Estlab from '../model/Estlab.js';
// import Estmac from '../model/Estmac.js';
// import Estwel from '../model/Estwel.js';
// import EstTrans from '../model/EstTrans.js';
// import Estsun from '../model/Estsun.js';
// import QutationImg from '../model/QutationImg.js';
// import EstImage from '../model/EstImage.js';
// import multer from 'multer';
// import ImplementMat from '../model/ImplementMat.js';
// import Logbook from '../model/Logbook.js';
// import verifyToken from '../middlewares/verifyToken.js';

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Route to create a new estimate


// // Route to update an existing estimate and add additional images

// // router.get('/Estselect', async (req, res) => {
// //     // const { logbookId } = req.params;

// //     try {
// //         const estimate = await Estimate.findAll({
// //             attributes: ['id', 'Date', 'Estimated']
// //         }
// //         );

// //         if (!estimate) {
// //             return res.status(404).json({
// //                 error: 'No estimate found for the given logbook ID.',
// //             });
// //         }

// //         res.status(200).json({ estimate });
// //     } catch (error) {
// //         console.error('Error fetching estimate:', error);
// //         res.status(500).json({ error: 'An error occurred while fetching the estimate' });
// //     }
// // });

// // // POST route for submitting category estimation details
// // const submitCategory = async (req, res, categoryModel) => {
// //     const { EstID } = req.params;
// //     const { details } = req.body;

// //     if (!details) {
// //         return res.status(400).json({ error: 'Details field is required.' });
// //     }

// //     try {
// //         // Save category details
// //         const categoryDetails = JSON.parse(details).map((item) => ({
// //             ...item,
// //             EstID,
// //         }));
// //         await categoryModel.bulkCreate(categoryDetails);

// //         res.status(200).json({ message: `${categoryModel.name} details saved successfully.` });
// //     } catch (error) {
// //         console.error(`Error saving ${categoryModel.name} details:`, error);
// //         res.status(500).json({ error: `Failed to save ${categoryModel.name} details.` });
// //     }
// // };

// // router.post('/submitCategory/material/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, EstMat));

// // const submitCategory = async (req, res, categoryModel) => {
// //     const { EstID } = req.params;
// //     const { details, Suppliers, QuotationNo } = req.body;

// //     if(!Estsun) {
// //     if (!details || !Suppliers || !QuotationNo) {
// //         return res.status(400).json({ error: 'Details, Suppliers, and QuotationNo fields are required.' });
// //     }
// // }

// //     try {
// //         // Check if the supplier exists in the supplier table
// //         const supplier = await Supplier.create({  Suppliers, QuotationNo, EstID  });
// //         if (!supplier) {
// //             return res.status(400).json({ error: 'Invalid supplier details. Supplier does not exist.' });
// //         }
// //             const images = req.files.map((file) => ({
// //                 fileType: file.mimetype,
// //                 fileSize: file.size,
// //                 fileData: file.buffer, // Store file data
// //                 supID: supplier.id, // Associate with supplier
// //             }));
// //             await QutationImg.bulkCreate(images);
// //         // Save category details
// //         const categoryDetails = JSON.parse(details).map((item) => ({
// //             ...item,
// //             supID: supplier.id, // Ensure supID is included
// //         }));
// //         console.log('Category details:', categoryDetails);
// //         await categoryModel.bulkCreate(categoryDetails);

// //         res.status(200).json({ message: `${categoryModel.name} details saved successfully.` });
// //     } catch (error) {
// //         console.error(`Error saving ${categoryModel.name} details:`, error);
// //         res.status(500).json({ error: `Failed to save ${categoryModel.name} details.` });
// //     }
// // };

// // router.get('/Estselect/:logbookID', async (req, res) => {
// //     const { logbookID } = req.params;

// //     try {
// //         const estimates = await Estimate.findAll({
// //             where: { logbookID },
// //             include: [
// //                 { model: EstImage },
// //                 {model: Supplier
// //                     // it should have the another model QuotationImg with supplier id

// //                 },
// //             ],

// //         });

// //         if (!estimates || estimates.length === 0) {
// //             return res.status(404).json({
// //                 error: 'No estimates found for the given logbook ID.',
// //             });
// //         }

// //         // const images = await Promise.all(
// //         //     estimates.map(async (estimate) => {
// //         //         const estimateImages = await EstImage.findAll({ where: { EstID: estimate.id } });
// //         //         return estimateImages.map(image => ({
// //         //             ...image.dataValues,
// //         //             fileData: image.fileData.toString('base64'),
// //         //             EstID: estimate.id,  // Ensure EstID is available for matching in frontend
// //         //         }));
// //         //     })
// //         // );

// //         // // Flatten the array of images (since we are returning images per estimate)
// //         // const formattedImages = images.flat();

// //         res.status(200).json({ estimates });
// //     } catch (error) {
// //         console.error('Error fetching estimates and images:', error);
// //         res.status(500).json({ error: 'An error occurred while fetching the estimates and images.' });
// //     }
// // });

// // router.get('/Estselect/:logbookID', async (req, res) => {
// //     const { logbookID } = req.params;

// //     try {
// //         const estimates = await Estimate.findAll({
// //             where: { logbookID },
// //             include: [
// //                 {
// //                     model: EstImage,
// //                     attributes: ['id', 'fileData', 'fileType'],  // Include relevant image fields
// //                 },
// //                 {
// //                     model: Supplier,
// //                     include: [
// //                         {
// //                             model: QutationImg,  // Assuming Supplier has a QuotationImg model
// //                             attributes: ['id', 'fileData', 'fileType'],  // Include relevant quotation image fields
// //                         },
// //                     ],
// //                     attributes: ['id'],  // You can include any other necessary fields from Supplier
// //                 },
// //             ],
// //         });

// //         if (!estimates || estimates.length === 0) {
// //             return res.status(404).json({
// //                 error: 'No estimates found for the given logbook ID.',
// //             });
// //         }

// //         // Send the estimates data as response
// //         res.status(200).json({ estimates });
// //         console.log('Estimates:', estimates);

// //     } catch (error) {
// //         console.error('Error fetching estimates and images:', error);
// //         res.status(500).json({ error: 'An error occurred while fetching the estimates and images.' });
// //     }
// // });





// // Route to fetch all category data by logbook ID
// router.get('/fetchAllCategories/:LogbookId', async (req, res) => {
//     const { LogbookId } = req.params;
//     try {
//         const sql = `
//             SELECT 
//             supplier.Suppliers AS Suppliers,
//             estmat.Material AS MatItem,
//             estmat.Mat_cost AS MatCost,
//             estmat.MatQ AS MatQuantity,
//             estlab.Labour AS LabItem,
//             estlab.Lab_cost AS LabCost,
//             estlab.LabQ AS LabQuantity,
//             estmac.Machining AS MacItem,
//             estmac.Mac_cost AS MacCost,
//             estmac.MacQ AS MacQuantity,
//             esttrans.Transport AS TransItem,
//             esttrans.Trans_cost AS TransCost,
//             esttrans.TransQ AS TransQuantity,
//             estwel.Welding AS WelItem,
//             estwel.Wel_cost AS WelCost,
//             estwel.WelQ AS WelQuantity,
//             logbook.id AS LogbookId
//         FROM supplier
//         LEFT JOIN estmat ON supplier.id = estmat.supID
//         LEFT JOIN estlab ON supplier.id = estlab.supID
//         LEFT JOIN estmac ON supplier.id = estmac.supID
//         LEFT JOIN esttrans ON supplier.id = esttrans.supID
//         LEFT JOIN estwel ON supplier.id = estwel.supID
//         LEFT JOIN estimates ON estimates.id = supplier.EstID
//         LEFT JOIN logbook ON logbook.id = estimates.LogbookID
//         WHERE logbook.id = ?
//         `;
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




// router.get('/est/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const estimate = await Estimate.findOne({ where: { id } });
//         if (!estimate) {
//             return res.status(404).json({ error: 'Estimate not found' });
//         }
//         res.status(200).json({ estimate });
//     } catch (error) {
//         console.error('Error fetching estimate:', error);
//         res.status(500).json({ error: 'Failed to fetch estimate' });
//     }
// });

// export default router;

import express from 'express';
import Estimate from '../Model/Estimate.js';
import Estlab from '../Model/Estlab.js';
import EstMat from '../Model/EstMat.js';
import Estmac from '../Model/Estmac.js';
import Supplier from '../model/Supplier.js'
import ImplementMat from '../model/ImplementMat.js'
// import EstOther from '../Model/EstOther.js';
import QutationImg from '../model/QutationImg.js'
import Estsun from '../Model/Estsun.js';
import EstTrans from '../Model/EstTrans.js';
import Estwel from '../Model/Estwel.js';
// import EstStock from '../Model/EstStock.js';
import EstImage from '../Model/EstImage.js';
import db from '../config/sequelize.js';

const router = express.Router();

import multer from 'multer';

// Set up multer to store files in memory with size limits
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit file size to 100MB
    }
});

router.post('/Estinsert/:logbookId', upload.array('images'), async (req, res) => {
    const { Date, Estimated } = req.body;
    const { logbookId } = req.params;

    if (!Date || !Estimated) {
        return res.status(400).json({ error: 'Date and Estimated fields are required.' });
    }

    try {
        // const existingEstimate = await Estimate.findOne({ where: { logbookID: logbookId } });

        // if (existingEstimate) {
        //     return res.status(400).json({ error: 'Estimate already exists for this logbook ID.' });
        // }

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

// router.post('/Estinsert/:book_id', upload.array('images', 10), async (req, res) => {
//     const { book_id } = req.params;
//     const { Date, Estimated } = req.body;

//     try {
//         const estimate = await Estimate.create({
//             book_id,
//             Date,
//             Estimated
//         });

//         const EstimateId = estimate.id;

//         const parseDetails = (details) => {
//             return typeof details === 'string' ? JSON.parse(details) : details;
//         };

//         // const parsedLabDetails = parseDetails(LabDetails);
//         // const parsedMatDetails = parseDetails(matDetails);
//         // const parsedMacDetails = parseDetails(macDetails);
//         // const parsedWelDetails = parseDetails(welDetails);
//         // const parsedSunDetails = parseDetails(sunDetails);
//         // const parsedTransDetails = parseDetails(transDetails);
//         // const parsedStockDetails = parseDetails(stockDetails);
//         // const parsedOtherDetails = parseDetails(otherDetails);

//         // const labourPromises = parsedLabDetails.map((labour) => {
//         //     const { Labour, Lab_cost, LabQ } = labour;
//         //     return EstLab.create({ EstimateId, Labour, Lab_cost, LabQ });
//         // });

//         // const materialPromises = parsedMatDetails.map((material) => {
//         //     const { Material, Mat_cost, MatQ } = material;
//         //     return EstMat.create({ EstimateId, Material, Mat_cost, MatQ });
//         // });

//         // const machinePromises = parsedMacDetails.map((machine) => {
//         //     const { Machining, Mac_cost, MacQ } = machine;
//         //     return EstMac.create({ EstimateId, Machining, Mac_cost, MacQ });
//         // });

//         // const sunPromises = parsedSunDetails.map((sun) => {
//         //     const { Sundries, Sun_cost, SunQ } = sun;
//         //     return EstSun.create({ EstimateId, Sundries, Sun_cost, SunQ });
//         // });

//         // const transPromises = parsedTransDetails.map((trans) => {
//         //     const { Transport, Trans_cost, TransQ } = trans;
//         //     return EstTrans.create({ EstimateId, Transport, Trans_cost, TransQ });
//         // });

//         // const welPromises = parsedWelDetails.map((wel) => {
//         //     const { Welding, Wel_cost, WelQ } = wel;
//         //     return EstWel.create({ EstimateId, Welding, Wel_cost, WelQ });
//         // });

//         // const stockPromises = parsedStockDetails.map((stock) => {
//         //     const { Stock, Stock_cost, StockQ } = stock;
//         //     return EstStock.create({ EstimateId, Stock, Stock_cost, StockQ });
//         // });

//         // await Promise.all([...labourPromises, ...materialPromises, ...machinePromises, ...sunPromises, ...transPromises, ...welPromises, ...stockPromises]);

//         // Handle file uploads
//         const files = req.files;
//         if (files && files.length > 0) {
//             const imagePromises = files.map((file) => {
//                 return EstImage.create({
//                     fileType: file.mimetype,
//                     fileSize: file.size,
//                     fileData: file.buffer,
//                     EstimateId
//                 });
//             });
//             await Promise.all(imagePromises);
//         }

//         res.status(201).json({ message: 'Estimation data inserted successfully' });
//     } catch (error) {
//         console.error('Error inserting estimation data:', error);
//         res.status(500).json({ error: 'An error occurred while inserting estimation data', details: error.message });
//     }
// });
router.get('/Estview/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const estimateRecords = await Estimate.findAll({
            where: { book_id: id },
        });

        if (estimateRecords.length === 0) {
            return res.status(404).json({ error: 'No records found' });
        }

        res.json(estimateRecords);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

const createGetRoute = (tableName, alias, columns) => {
    return async (req, res) => {
        const { id } = req.params;
        try {
            const book_id = id;

            if (!book_id) {
                return res.status(400).json({ error: 'book_id is required' });
            }

            const sql = `
                SELECT 
                    ${alias}.id,
                    ${columns.map(column => `${alias}.${column}`).join(', ')}
                FROM ${tableName} ${alias}
                LEFT JOIN estimate ON estimate.id = ${alias}.EstimateId
                WHERE estimate.book_id = ?
            `;

            const results = await db.query(sql, {
                replacements: [book_id],
                type: db.QueryTypes.SELECT
            });

            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'No records found' });
            }

            res.json(results);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    };
};

router.get('/Otherother/:id', createGetRoute('est_other', 'other', ['other', 'other_cost', 'otherQ']));
router.get('/OtherStock/:id', createGetRoute('est_stock', 'Stock', ['Stock', 'Stock_cost', 'StockQ']));
router.get('/OtherMac/:id', createGetRoute('est_mac', 'Mac', ['Machining', 'Mac_cost', 'MacQ']));
router.get('/OtherWel/:id', createGetRoute('est_wel', 'Wel', ['Welding', 'Wel_cost', 'WelQ']));
router.get('/OtherTrans/:id', createGetRoute('esttrans', 'Trans', ['Transport', 'Trans_cost', 'TransQ']));
router.get('/OtherSun/:id', createGetRoute('est_sun', 'Sun', ['Sundries', 'Sun_cost', 'SunQ']));
router.get('/EstviewLab/:id', createGetRoute('est_lab', 'Lab', ['Labour', 'Lab_cost', 'LabQ']));
router.get('/EstviewMat/:id', createGetRoute('est_mat', 'Mat', ['Material', 'Mat_cost', 'MatQ']));

// router.put('/Estupdate/:id', upload.array('images'), async (req, res) => {
//     const { Date, Estimated } = req.body;
//     const { id } = req.params;

//     if (!Date || !Estimated) {
//         return res.status(400).json({ error: 'Date and Estimated fields are required.' });
//     }

//     try {
//         const query = `UPDATE estimate SET Date = ?, Estimated = ? WHERE id = ?`;
//         const result = await db.query(query, {
//             replacements: [Date, Estimated, id],
//             type: db.QueryTypes.UPDATE,
//         });

//         if (result[0] === 0) {
//             return res.status(404).json({ error: 'No estimate found for the given ID.' });
//         }

//         // Process uploaded images
//         if (req.files && req.files.length > 0) {
//             await EstImage.bulkCreate(
//                 req.files.map((file) => ({
//                     fileType: file.mimetype,
//                     fileSize: file.size,
//                     fileData: file.buffer,
//                     EstID: id,
//                 }))
//             );
//         }

//         res.status(200).json({ message: 'Estimate updated successfully.' });
//     } catch (error) {
//         console.error('Error updating estimate:', error);
//         res.status(500).json({ error: 'An error occurred while updating the estimate.' });
//     }
// });

router.put('/Estupdate/:id', upload.array('images'), async (req, res) => {
    const { Date, Estimated } = req.body;
    const { id } = req.params;

    if (!Date || !Estimated) {
        return res.status(400).json({ error: 'Date and Estimated fields are required.' });
    }

    try {
        const estimate = await Estimate.findOne({ where: { id } });

        if (!estimate) {
            return res.status(404).json({ error: 'No estimate found to update for the given ID.' });
        }

        await estimate.update({ Date, Estimated });

        // Check and process uploaded images
        if (req.files && req.files.length > 0) {
            await EstImage.bulkCreate(
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
        const estimates = await Estimate.findAll({
            where: { logbookID: logbookId },
        });

        if (!estimates || estimates.length === 0) {
            return res.status(404).json({
                error: 'No estimates found for the given logbook ID.',
            });
        }
        

        res.status(200).json({ estimates });
        console.log('Estimates:', estimates);
    } catch (error) {
        console.error('Error fetching estimates and images:', error);
        res.status(500).json({ error: 'An error occurred while fetching the estimates and images.' });
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




// router.post('/submitCategory/material/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, EstMat));
// router.post('/submitCategory/labour/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, Estlab));
// router.post('/submitCategory/machining/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, Estmac));
// router.post('/submitCategory/welding/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, Estwel));
// router.post('/submitCategory/transport/:EstID', upload.array('Quotationimg', 10), (req, res) => submitCategory(req, res, EstTrans));
// // router.post('/submitCategory/material/:EstID', upload.array('Quotationimg', 10), submitMaterialCategory);

// import db from '../config/sequelize.js';
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
const submitAllCategories = async (req, res) => {
    const { EstID } = req.params;
    const { Suppliers, QuotationNo, matDetails, labDetails, macDetails, tranDetails, welDetails, sunDetails } = req.body;

    if (!Suppliers || !QuotationNo) {
        return res.status(400).json({ error: 'Suppliers and QuotationNo fields are required.' });
    }

    try {
        // Create supplier
        const supplier = await Supplier.create({ Suppliers, QuotationNo, EstID });
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
        await QutationImg.bulkCreate(images);

        // Save category details
        const saveCategoryDetails = async (details, categoryModel) => {
            const categoryDetails = JSON.parse(details).map((item) => ({
                ...item,
                supID: supplier.id, // Ensure supID is included
                EstID, // Always include EstID
            }));
            await categoryModel.bulkCreate(categoryDetails);
        };

        await Promise.all([
            saveCategoryDetails(matDetails, EstMat),
            saveCategoryDetails(labDetails, Estlab),
            saveCategoryDetails(macDetails, Estmac),
            saveCategoryDetails(tranDetails, EstTrans),
            saveCategoryDetails(welDetails, Estwel),
            saveCategoryDetails(sunDetails, Estsun),
        ]);

        res.status(200).json({ message: 'All category details saved successfully.' });
    } catch (error) {
        console.error('Error saving category details:', error);
        res.status(500).json({ error: 'Failed to save category details.' });
    }
};

router.post('/submitCategory/all/:EstID', upload.array('Quotationimg', 10), submitAllCategories);

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

router.post('/submitCategory/sundries/:EstID', upload.none(), (req, res) => submitCategory(req, res, Estsun));

router.get('/images/:logbookID', async (req, res) => {
    const { logbookID: logbookID} = req.params; 
    try {
        const estimate = await Estimate.findOne({ where: { logbookID } });
        const suppliers = await Supplier.findAll({ where: { EstID: estimate.id } });
        const images1 = await Promise.all(
            suppliers.map(supplier => 
                QutationImg.findAll({ where: { supID: supplier.id } })
            )
        );
        const flattenedImages1 = images1.flat();
        const images2 = await EstImage.findAll({ where: { EstID: estimate.id } });
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

export default router;