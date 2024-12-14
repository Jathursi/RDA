import express from 'express';
import db from '../config/sequelize.js';

const router = express.Router();

router.get('/SumAll/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const book_id = id; // Get book_id from request parameters

        // Ensure that book_id is provided
        if (!book_id) {
            return res.status(400).json({ error: 'book_id is required' });
        }

        const sql1 = `
            SELECT 
                SUM(material.Mat_cost) AS totalMatCost,
                SUM(material.MatQ) AS totalMatQ,
                SUM(material.Mat_cost * material.MatQ) AS totalMatP
            FROM material 
            LEFT JOIN implement ON material.implement_id = implement.id
            WHERE implement.book_id = ?
        `;
        const sql2 = `
            SELECT 
                SUM(labour.Lab_cost) AS totalLabCost,
                SUM(labour.LabQ) AS totalLabQ,
                SUM(labour.LabQ * labour.Lab_cost) AS totalLabP
            FROM labour 
            LEFT JOIN implement ON labour.implement_id = implement.id
            WHERE implement.book_id = ?
        `;

        const sql3 = `
            SELECT
                SUM(othertrans.Trans_cost) AS totalTransCost,
                SUM(othertrans.TransQ) AS totalTransQ,
                SUM(othertrans.TransQ * othertrans.Trans_cost) AS totalTransP,
                SUM(otherstocks.Stock_cost) AS totalStockCost,
                SUM(otherstocks.StockQ) AS totalStockQ,
                SUM(otherstocks.StockQ * otherstocks.Stock_cost) AS totalStockP,
                SUM(othersuns.Sun_cost) AS totalSunCost,
                SUM(othersuns.SunQ) AS totalSunQ,
                SUM(othersuns.SunQ * othersuns.Sun_cost) AS totalSunP,
                SUM(otherweldings.Wel_cost) AS totalWelCost,
                SUM(otherweldings.WelQ) AS totalWelQ,
                SUM(otherweldings.WelQ * otherweldings.Wel_cost) AS totalWelP,
                SUM(othermachines.Mac_cost) AS totalMacCost,
                SUM(othermachines.MacQ) AS totalMacQ,
                SUM(othermachines.MacQ * othermachines.Mac_cost) AS totalMacP,
                SUM(othersothers.Other_cost) AS totalOtherCost,
                SUM(othersothers.OtherQ) AS totalOtherQ,
                SUM(othersothers.OtherQ * othersothers.Other_cost) AS totalOtherP
            FROM othertrans
            LEFT JOIN othermaterials ON othertrans.other_id = othermaterials.id
            LEFT JOIN otherstocks ON otherstocks.other_id = othermaterials.id
            LEFT JOIN othersuns ON othersuns.other_id = othermaterials.id
            LEFT JOIN otherweldings ON otherweldings.other_id = othermaterials.id
            LEFT JOIN othermachines ON othermachines.other_id = othermaterials.id
            LEFT JOIN othersothers ON othersothers.other_id = othermaterials.id
            WHERE othermaterials.book_id = ?
        `;

        const [results1, results2, results3] = await Promise.all([
            db.query(sql1, { replacements: [book_id], type: db.QueryTypes.SELECT }),
            db.query(sql2, { replacements: [book_id], type: db.QueryTypes.SELECT }),
            db.query(sql3, { replacements: [book_id], type: db.QueryTypes.SELECT })
        ]);

        if (!results1.length && !results2.length && !results3.length) {
            return res.status(404).json({ error: 'No records found' });
        }

        res.json({ results1, results2, results3 });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

export default router;