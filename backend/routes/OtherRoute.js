import express from 'express';
import Other from '../Model/Other.js';
import OtherMac from '../Model/OtherMac.js';
import OtherStock from '../Model/OtherStock.js';
import OtherSun from '../Model/OtherSun.js';
import OtherTrans from '../Model/OtherTrans.js';
import OtherWel from '../Model/OtherWel.js';
import OtherOther from '../Model/OtherOther.js';
import db from '../config/sequelize.js'; // Ensure you have the correct database connection

const router = express.Router();

router.post('/Otherinsert/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const { otherDetails, stockDetails, macDetails, welDetails, sunDetails, transDetails } = req.body;

    try {
        const existingOther = await Other.findOne({ where: { book_id } });

        if (existingOther) {
            return res.status(400).json({ message: 'Entry already exists. Use the update route instead.' });
        }

        const other = await Other.create({
            book_id,
        });

        const otherId = other.id; // Get the inserted implement's ID

        const otherPromises = otherDetails.map((data) => {
            const { other, other_cost, otherQ, other_date, other_Sup, other_Auth } = data;
            return OtherOther.create({
                other,
                other_cost,
                otherQ,
                other_date,
                other_Sup,
                other_Auth,
                other_id: otherId, // Reference to the Implement ID
            });
        });

        const stockPromises = stockDetails.map((data) => {
            const { Stock: stockName, Stock_cost, StockQ, Stock_date, Stock_Sup, Stock_Auth } = data;
            return OtherStock.create({
                Stock: stockName,
                Stock_cost,
                StockQ,
                Stock_date,
                Stock_Sup,
                Stock_Auth,
                other_id: otherId, // Reference to the Implement ID
            });
        });

        const machinePromises = macDetails.map((data) => {
            const { Machining: machiningName, Mac_cost, MacQ, Mac_date, Mac_Sup, Mac_Auth } = data;
            return OtherMac.create({
                Machining: machiningName,
                Mac_cost,
                MacQ,
                Mac_date,
                Mac_Sup,
                Mac_Auth,
                other_id: otherId, // Reference to the Implement ID
            });
        });

        const weldingPromises = welDetails.map((data) => {
            const { Welding: weldingName, Wel_cost, WelQ, Wel_date, Wel_Sup, Wel_Auth } = data;
            return OtherWel.create({
                Welding: weldingName,
                Wel_cost,
                WelQ,
                Wel_date,
                Wel_Sup,
                Wel_Auth,
                other_id: otherId, // Reference to the Implement ID
            });
        });

        const sundryPromises = sunDetails.map((data) => {
            const { Sundries: sundryName, Sun_cost, SunQ, Sun_date, Sun_Sup, Sun_Auth } = data;
            return OtherSun.create({
                Sundries: sundryName,
                Sun_cost,
                SunQ,
                Sun_date,
                Sun_Sup,
                Sun_Auth,
                other_id: otherId, // Reference to the Implement ID
            });
        });

        const transPromises = transDetails.map((data) => {
            const { Transport: transName, Trans_cost, TransQ, Trans_date, Trans_Sup, Trans_Auth } = data;
            return OtherTrans.create({
                Transport: transName,
                Trans_cost,
                TransQ,
                Trans_date,
                Trans_Sup,
                Trans_Auth,
                other_id: otherId, // Reference to the Implement ID
            });
        });

        await Promise.all([...otherPromises, ...stockPromises, ...machinePromises, ...weldingPromises, ...sundryPromises, ...transPromises]);

        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An error occurred while inserting data' });
    }
});

router.get('/OtherView/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const otherRecords = await Other.findAll({
            where: { book_id: id },
        });

        if (otherRecords.length === 0) {
            return res.status(404).json({ error: 'No records found' });
        }

        res.json(otherRecords);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

router.get('/Otherother/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book_id = id;

        if (!book_id) {
            return res.status(400).json({ error: 'book_id is required' });
        }

        const sql = `
            SELECT 
                othersothers.id,
                othersothers.other,
                othersothers.other_cost,
                othersothers.otherQ,
                othersothers.other_date,
                othersothers.other_Sup,
                othersothers.other_Auth
            FROM othermaterials LEFT JOIN othersothers ON othersothers.other_id = othermaterials.id
            WHERE othermaterials.book_id = ?
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
});

router.get('/OtherStock/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book_id = id;

        if (!book_id) {
            return res.status(400).json({ error: 'book_id is required' });
        }

        const sql = `
            SELECT 
                otherstocks.id,
                otherstocks.Stock,
                otherstocks.Stock_cost,
                otherstocks.StockQ,
                otherstocks.Stock_date,
                otherstocks.Stock_Sup,
                otherstocks.Stock_Auth
            FROM othermaterials LEFT JOIN otherstocks ON otherstocks.other_id = othermaterials.id
            WHERE othermaterials.book_id = ?
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
});

router.get('/OtherMac/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book_id = id;

        if (!book_id) {
            return res.status(400).json({ error: 'book_id is required' });
        }

        const sql = `
            SELECT 
                othermachines.id,
                othermachines.Machining,
                othermachines.Mac_cost,
                othermachines.MacQ,
                othermachines.Mac_date,
                othermachines.Mac_Sup,
                othermachines.Mac_Auth
            FROM othermaterials LEFT JOIN othermachines ON othermachines.other_id = othermaterials.id
            WHERE othermaterials.book_id = ?
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
});

router.get('/OtherWel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book_id = id;

        if (!book_id) {
            return res.status(400).json({ error: 'book_id is required' });
        }

        const sql = `
            SELECT 
                otherweldings.id,
                otherweldings.Welding,
                otherweldings.Wel_cost,
                otherweldings.WelQ,
                otherweldings.Wel_date,
                otherweldings.Wel_Sup,
                otherweldings.Wel_Auth
            FROM othermaterials LEFT JOIN otherweldings ON otherweldings.other_id = othermaterials.id
            WHERE othermaterials.book_id = ?
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
});

router.get('/OtherTrans/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book_id = id;

        if (!book_id) {
            return res.status(400).json({ error: 'book_id is required' });
        }

        const sql = `
            SELECT 
                othertrans.id,
                othertrans.Transport,
                othertrans.Trans_cost,
                othertrans.TransQ,
                othertrans.Trans_date,
                othertrans.Trans_Sup,
                othertrans.Trans_Auth
            FROM othermaterials LEFT JOIN othertrans ON othertrans.other_id = othermaterials.id
            WHERE othermaterials.book_id = ?
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
});

router.get('/OtherSun/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book_id = id;

        if (!book_id) {
            return res.status(400).json({ error: 'book_id is required' });
        }

        const sql = `
            SELECT 
                othersuns.id,
                othersuns.Sundries,
                othersuns.Sun_cost,
                othersuns.SunQ,
                othersuns.Sun_date,
                othersuns.Sun_Sup,
                othersuns.Sun_Auth
            FROM othermaterials LEFT JOIN othersuns ON othersuns.other_id = othermaterials.id
            WHERE othermaterials.book_id = ?
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
});

router.put('/OtherUpdate/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const { otherDetails, stockDetails, macDetails, welDetails, sunDetails, transDetails } = req.body;

    try {
        await Other.update({}, { where: { book_id } });

        const existingOther = await Other.findOne({ where: { book_id } });
        const otherId = existingOther.id;

        const otherPromises = otherDetails.map((data) => {
            const { id, other, other_cost, otherQ, other_date, other_Sup, other_Auth } = data;
            if (id) {
                return OtherOther.update(
                    { other, other_cost, otherQ, other_date, other_Sup, other_Auth },
                    { where: { id } }
                );
            } else {
                return OtherOther.create({
                    other,
                    other_cost,
                    otherQ,
                    other_date,
                    other_Sup,
                    other_Auth,
                    other_id: otherId
                });
            }
        });

        const stockPromises = stockDetails.map((data) => {
            const { id, Stock: stockName, Stock_cost, StockQ, Stock_date, Stock_Sup, Stock_Auth } = data;
            if (id) {
                return OtherStock.update(
                    { Stock: stockName, Stock_cost, StockQ, Stock_date, Stock_Sup, Stock_Auth },
                    { where: { id } }
                );
            } else {
                return OtherStock.create({
                    Stock: stockName,
                    Stock_cost,
                    StockQ,
                    Stock_date,
                    Stock_Sup,
                    Stock_Auth,
                    other_id: otherId
                });
            }
        });

        const machinePromises = macDetails.map((data) => {
            const { id, Machining: machiningName, Mac_cost, MacQ, Mac_date, Mac_Sup, Mac_Auth } = data;
            if (id) {
                return OtherMac.update(
                    { Machining: machiningName, Mac_cost, MacQ, Mac_date, Mac_Sup, Mac_Auth },
                    { where: { id } }
                );
            } else {
                return OtherMac.create({
                    Machining: machiningName,
                    Mac_cost,
                    MacQ,
                    Mac_date,
                    Mac_Sup,
                    Mac_Auth,
                    other_id: otherId
                });
            }
        });

        const weldingPromises = welDetails.map((data) => {
            const { id, Welding: weldingName, Wel_cost, WelQ, Wel_date, Wel_Sup, Wel_Auth } = data;
            if (id) {
                return OtherWel.update(
                    { Welding: weldingName, Wel_cost, WelQ, Wel_date, Wel_Sup, Wel_Auth },
                    { where: { id } }
                );
            } else {
                return OtherWel.create({
                    Welding: weldingName,
                    Wel_cost,
                    WelQ,
                    Wel_date,
                    Wel_Sup,
                    Wel_Auth,
                    other_id: otherId
                });
            }
        });

        const sundryPromises = sunDetails.map((data) => {
            const { id, Sundries: sundryName, Sun_cost, SunQ, Sun_date, Sun_Sup, Sun_Auth } = data;
            if (id) {
                return OtherSun.update(
                    { Sundries: sundryName, Sun_cost, SunQ, Sun_date, Sun_Sup, Sun_Auth },
                    { where: { id } }
                );
            } else {
                return OtherSun.create({
                    Sundries: sundryName,
                    Sun_cost,
                    SunQ,
                    Sun_date,
                    Sun_Sup,
                    Sun_Auth,
                    other_id: otherId
                });
            }
        });

        const transPromises = transDetails.map((data) => {
            const { id, Transport: transName, Trans_cost, TransQ, Trans_date, Trans_Sup, Trans_Auth } = data;
            if (id) {
                return OtherTrans.update(
                    { Transport: transName, Trans_cost, TransQ, Trans_date, Trans_Sup, Trans_Auth },
                    { where: { id } }
                );
            } else {
                return OtherTrans.create({
                    Transport: transName,
                    Trans_cost,
                    TransQ,
                    Trans_date,
                    Trans_Sup,
                    Trans_Auth,
                    other_id: otherId
                });
            }
        });

        await Promise.all([...otherPromises, ...stockPromises, ...machinePromises, ...weldingPromises, ...sundryPromises, ...transPromises]);

        res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'An error occurred while updating data', details: error.message });
    }
});

export default router;