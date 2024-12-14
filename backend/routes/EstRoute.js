import express from 'express';
import Estimate from '../Model/Estimate.js';
import EstLab from '../Model/EstLab.js';
import EstMat from '../Model/EstMat.js';
import EstMac from '../Model/EstMac.js';
import EstOther from '../Model/EstOther.js';
import EstSun from '../Model/EstSun.js';
import EstTrans from '../Model/EstTrans.js';
import EstWel from '../Model/EstWel.js';
import EstStock from '../Model/EstStock.js';
import db from '../config/sequelize.js';

const router = express.Router();

router.post('/Estinsert/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const { Date, Estimated, otherDetails, stockDetails, macDetails, matDetails, welDetails, sunDetails, LabDetails, transDetails } = req.body;

    try {
        const existingEstimate = await Estimate.findOne({ where: { book_id } });

        if (existingEstimate) {
            return res.status(400).json({ message: 'Entry already exists. Use the update route instead.' });
        }

        const estimate = await Estimate.create({
            Date,
            Estimated,
            book_id,
        });

        const EstimateId = estimate.id;

        const filterEmptyFields = (detailsArray) => {
            return detailsArray.filter(item => Object.values(item).every(value => value !== ''));
        };

        const filteredOtherDetails = filterEmptyFields(otherDetails);
        const filteredStockDetails = filterEmptyFields(stockDetails);
        const filteredMacDetails = filterEmptyFields(macDetails);
        const filteredMatDetails = filterEmptyFields(matDetails);
        const filteredWelDetails = filterEmptyFields(welDetails);
        const filteredSunDetails = filterEmptyFields(sunDetails);
        const filteredLabDetails = filterEmptyFields(LabDetails);
        const filteredTransDetails = filterEmptyFields(transDetails);

        const labourPromises = filteredLabDetails.map((labour) => {
            const { Labour: labourName, Lab_cost, LabQ } = labour;
            return EstLab.create({
                Labour: labourName,
                Lab_cost,
                LabQ,
                EstimateId,
            });
        });

        const materialPromises = filteredMatDetails.map((data) => {
            const { Material: materialName, Mat_cost, MatQ, issued } = data;
            return EstMat.create({
                Material: materialName,
                Mat_cost,
                MatQ,
                issued,
                EstimateId,
            });
        });

        const machinePromises = filteredMacDetails.map((data) => {
            const { Machining: machineName, Mac_cost, MacQ } = data;
            return EstMac.create({
                Machining: machineName,
                Mac_cost,
                MacQ,
                EstimateId,
            });
        });

        const otherPromises = filteredOtherDetails.map((data) => {
            const { other: otherName, other_cost, otherQ } = data;
            return EstOther.create({
                other: otherName,
                other_cost,
                otherQ,
                EstimateId,
            });
        });

        const sunPromises = filteredSunDetails.map((data) => {
            const { Sundries: sunName, Sun_cost, SunQ } = data;
            return EstSun.create({
                Sundries: sunName,
                Sun_cost,
                SunQ,
                EstimateId,
            });
        });

        const transPromises = filteredTransDetails.map((data) => {
            const { Transport: transName, Trans_cost, TransQ } = data;
            return EstTrans.create({
                Transport: transName,
                Trans_cost,
                TransQ,
                EstimateId,
            });
        });

        const welPromises = filteredWelDetails.map((data) => {
            const { Welding: welName, Wel_cost, WelQ } = data;
            return EstWel.create({
                Welding: welName,
                Wel_cost,
                WelQ,
                EstimateId,
            });
        });

        const stockPromises = filteredStockDetails.map((data) => {
            const { Stock: stockName, Stock_cost, StockQ } = data;
            return EstStock.create({
                Stock: stockName,
                Stock_cost,
                StockQ,
                EstimateId,
            });
        });

        await Promise.all([...labourPromises, ...materialPromises, ...machinePromises, ...otherPromises, ...sunPromises, ...transPromises, ...welPromises, ...stockPromises]);

        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An error occurred while inserting data' });
    }
});

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

router.put('/Estupdate/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const { Date, Estimated, otherDetails, stockDetails, macDetails, matDetails, welDetails, sunDetails, LabDetails, transDetails } = req.body;

    try {
        const estimate = await Estimate.update(
            {
                Date,
                Estimated
            },
            { where: { book_id } }
        );

        const existingEstimate = await Estimate.findOne({ where: { book_id } });
        const EstimateId = existingEstimate.id;

        const labourPromises = LabDetails.map((labour) => {
            const { id, Labour: labourName, Lab_cost, LabQ } = labour;
            if (id) {
                return EstLab.update(
                    { Labour: labourName, Lab_cost, LabQ, EstimateId },
                    { where: { id } }
                );
            } else {
                return EstLab.create({
                    Labour: labourName,
                    Lab_cost,
                    LabQ,
                    EstimateId
                });
            }
        });

        const materialPromises = matDetails.map((material) => {
            const { id, Material: materialName, Mat_cost, MatQ, issued } = material;
            if (id) {
                return EstMat.update(
                    { Material: materialName, Mat_cost, MatQ, issued, EstimateId },
                    { where: { id } }
                );
            } else {
                return EstMat.create({
                    Material: materialName,
                    Mat_cost,
                    MatQ,
                    issued,
                    EstimateId
                });
            }
        });

        const machinePromises = macDetails.map((machine) => {
            const { id, Machining: machineName, Mac_cost, MacQ } = machine;
            if (id) {
                return EstMac.update(
                    { Machining: machineName, Mac_cost, MacQ, EstimateId },
                    { where: { id } }
                );
            } else {
                return EstMac.create({
                    Machining: machineName,
                    Mac_cost,
                    MacQ,
                    EstimateId
                });
            }
        });

        const otherPromises = otherDetails.map((other) => {
            const { id, other: otherName, other_cost, otherQ } = other;
            if (id) {
                return EstOther.update(
                    { other: otherName, other_cost, otherQ, EstimateId },
                    { where: { id } }
                );
            } else {
                return EstOther.create({
                    other: otherName,
                    other_cost,
                    otherQ,
                    EstimateId
                });
            }
        });

        const sunPromises = sunDetails.map((sun) => {
            const { id, Sundries: sunName, Sun_cost, SunQ } = sun;
            if (id) {
                return EstSun.update(
                    { Sundries: sunName, Sun_cost, SunQ, EstimateId },
                    { where: { id } }
                );
            } else {
                return EstSun.create({
                    Sundries: sunName,
                    Sun_cost,
                    SunQ,
                    EstimateId
                });
            }
        });

        const transPromises = transDetails.map((trans) => {
            const { id, Transport: transName, Trans_cost, TransQ } = trans;
            if (id) {
                return EstTrans.update(
                    { Transport: transName, Trans_cost, TransQ, EstimateId },
                    { where: { id } }
                );
            } else {
                return EstTrans.create({
                    Transport: transName,
                    Trans_cost,
                    TransQ,
                    EstimateId
                });
            }
        });

        const welPromises = welDetails.map((wel) => {
            const { id, Welding: welName, Wel_cost, WelQ } = wel;
            if (id) {
                return EstWel.update(
                    { Welding: welName, Wel_cost, WelQ, EstimateId },
                    { where: { id } }
                );
            } else {
                return EstWel.create({
                    Welding: welName,
                    Wel_cost,
                    WelQ,
                    EstimateId
                });
            }
        });

        const stockPromises = stockDetails.map((stock) => {
            const { id, Stock: stockName, Stock_cost, StockQ } = stock;
            if (id) {
                return EstStock.update(
                    { Stock: stockName, Stock_cost, StockQ, EstimateId },
                    { where: { id } }
                );
            } else {
                return EstStock.create({
                    Stock: stockName,
                    Stock_cost,
                    StockQ,
                    EstimateId
                });
            }
        });

        await Promise.all([...labourPromises, ...materialPromises, ...machinePromises, ...otherPromises, ...sunPromises, ...transPromises, ...welPromises, ...stockPromises]);

        res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'An error occurred while updating data', details: error.message });
    }
});


export default router;