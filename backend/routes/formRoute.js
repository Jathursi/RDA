// // import express from 'express';
// // import { getRegist } from '../Controllers/formController.js';
// // import verifyToken from '../middlewares/verifyToken.js';
// // import db from '../config/sequelize.js'; // Ensure you have the correct database connection

// // const router = express.Router();

// // router.get('/Regist', getRegist);

// // router.get('/Regist/:id', verifyToken, async (req, res) => {
// //     const { id } = req.params;
// //     try {
// //         const sql = `
// //             SELECT
// //                 regist.id,
// //                 regist.Vehicle_num,
// //                 regist.Year,
// //                 regist.Vehicle_type,
// //                 regist.Fault,
// //                 regist.Inspected,
// //                 regist.Meter,
// //                 regist.Location,
// //                 regist.Reference,
// //                 regist.Response,
// //                 regist.CrossCheck
// //             FROM regist WHERE regist.id = ?;
// //         `;

// //         // Use Sequelize's query method
// //         const results = await db.query(sql, {
// //             replacements: [id], // Corrected variable name
// //             type: db.QueryTypes.SELECT
// //         });
// //         console.log('Query Results:', results);
// //         res.status(200).json(results);
// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //         res.status(500).json({ error: 'An error occurred while fetching data' });
// //     }
// // });
// // router.get('/RegistPRINT/:id', verifyToken, async (req, res) => {
// //     const { id } = req.params;
// //     try {
// //         const sql = `
// //             SELECT
// //                 regist.id,
// //                 regist.Vehicle_num,
// //                 regist.Year,
// //                 regist.Vehicle_type,
// //                 regist.Fault,
// //                 regist.Inspected,
// //                 regist.Meter,
// //                 regist.Location,
// //                 regist.Reference,
// //                 regist.Response,
// //                 regist.CrossCheck
// //             FROM regist WHERE regist.id = ?;
// //         `;
        
// //         const results = await db.query(sql, {
// //             replacements: [id],  // Passing ID to the SQL query
// //             type: db.QueryTypes.SELECT
// //         });
// //         console.log('Query Results:', results); // Check if the results are printed here
// //         res.status(200).json(results);
// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //         res.status(500).json({ error: 'An error occurred while fetching data' });
// //     }
// // });

// // router.put('/Registupdate/:id', verifyToken, async (req, res) => {
// //     const { id } = req.params;
// //     const { Vehicle_num, Year, Vehicle_type, Fault, Inspected, Meter, Location, Reference, Response, CrossCheck } = req.body;
// //     try {
// //         const sql = `
// //             UPDATE regist
// //             SET
// //                 Vehicle_num = ?,
// //                 Year = ?,
// //                 Vehicle_type = ?,
// //                 Fault = ?,
// //                 Inspected = ?,
// //                 Meter = ?,
// //                 Location = ?,
// //                 Reference = ?,
// //                 Response = ?,
// //                 CrossCheck = ?
// //             WHERE id = ?;
// //         `;

// //         // Use Sequelize's query method
// //         const results = await db.query(sql, {
// //             replacements: [Vehicle_num, Year, Vehicle_type, Fault, Inspected, Meter, Location, Reference, Response, CrossCheck, id],
// //             type: db.QueryTypes.UPDATE
// //         });
// //         console.log('Query Results:', results);
// //         res.status(200).json({ message: 'Record updated successfully' });
// //     } catch (error) {
// //         console.error('Error updating data:', error);
// //         res.status(500).json({ error: 'An error occurred while updating data' });
// //     }
// // });

// // export default router;

// import express from 'express';
// import multer from 'multer';
// import { getRegist } from '../Controllers/formController.js';
// import verifyToken from '../middlewares/verifyToken.js';
// import db from '../config/sequelize.js'; // Ensure you have the correct database connection

// const router = express.Router();

// // Configure multer for file uploads
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, 'uploads/'); // Ensure this directory exists
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + '-' + file.originalname);
// //     }
// // });
// // const upload = multer({ storage });

// const storage = multer.memoryStorage();
// const upload = multer({ 
//     storage,
//     limits: {
//         fileSize: 100 * 1024 * 1024 // Limit file size to 100MB (100 * 1024 * 1024 bytes)
//     }
// });

// router.get('/Regist', getRegist);

// router.post('/Regist', upload.single('file'), async (req, res) => {
//     const { Vehicle_num, Year, Vehicle_type, Fault, Inspected, Meter, Location, Reference, Response, CrossCheck, userID } = req.body;
//     // const filePath = req.file ? req.file.path : null;

//     try {
//         const newRegist = await Regist.create({
//             Vehicle_num,
//             Year,
//             Vehicle_type,
//             Fault,
//             Inspected,
//             Meter,
//             Location,
//             Reference,
//             Response,
//             CrossCheck,
//             userID,
//             // filePath
//         });
//         res.status(201).json(newRegist);
//     } catch (error) {
//         console.error('Error creating new regist:', error);
//         res.status(500).json({ error: 'An error occurred while creating new regist' });
//     }
// });

// // Other routes...

// export default router;

import express from 'express';
import multer from 'multer';
import { getRegist } from '../Controllers/formController.js';
import verifyToken from '../middlewares/verifyToken.js';
import db from '../config/sequelize.js';
import Regist from '../Model/Regist.js';
import Trchecklist from '../Model/Trchecklist.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit file size to 100MB
    }
});

router.get('/Regist', getRegist);

router.post('/Regist', upload.single('file'), async (req, res) => {
    const { Vehicle_num, Year, Vehicle_type, Fault, Inspected, Meter, Location, Reference, Response, CrossCheck, userID } = req.body;
    const file = req.file;

    try {
        const newRegist = await Regist.create({
            Vehicle_num,
            Year,
            Vehicle_type,
            Fault,
            Inspected,
            Meter,
            Location,
            Reference,
            Response,
            CrossCheck,
            userID
        });

        if (file) {
            await Trchecklist.create({
                fileType: file.mimetype,
                fileSize: file.size,
                fileData: file.buffer,
                book_id: newRegist.id
            });
        }

        res.status(201).json(newRegist);
    } catch (error) {
        console.error('Error creating new regist:', error);
        res.status(500).json({ error: 'An error occurred while creating new regist' });
    }
});

export default router;