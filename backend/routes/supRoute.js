import express from 'express';
import Supplement from '../Model/Supplement.js';
import SupStrock from '../Model/SupStrock.js';
import SupMac from '../Model/SupMac.js';
import SupMat from '../Model/SupMat.js';
import SupSun from '../Model/SupSun.js';
import SupLab from '../Model/SupLab.js';
import SupOther from '../Model/SupOther.js';
import SupWel from '../Model/SupWel.js';
import SupTrans from '../Model/SupTrans.js';
import db from '../config/sequelize.js';

const router = express.Router();

router.post('/Supinsert/:book_id', async (req, res) => {
  const { book_id } = req.params;
  const { No, Date, Estimated, otherDetails, stockDetails, macDetails, matDetails, welDetails, sunDetails, LabDetails, transDetails } = req.body;

  try {
    // Check if a supplement with the given No and book_id already exists
    const existingSupplement = await Supplement.findOne({ where: { No} });

    if (existingSupplement) {
      return res.status(400).json({ message: 'Entry with this No already exists. Use the update route instead.' });
    }

    // Create a new supplement entry
    const supplement = await Supplement.create({
      No,
      Date,
      Estimated,
      book_id,
    });

    const SupplementId = supplement.id;

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
      return SupLab.create({
        Labour: labourName,
        Lab_cost,
        LabQ,
        SupplierId: SupplementId,
      });
    });

    const materialPromises = filteredMatDetails.map((data) => {
      const { Material: materialName, Mat_cost, MatQ, issued } = data;
      return SupMat.create({
        Material: materialName,
        Mat_cost,
        MatQ,
        issued,
        SupplierId: SupplementId,
      });
    });

    const machinePromises = filteredMacDetails.map((data) => {
      const { Machining: machineName, Mac_cost, MacQ } = data;
      return SupMac.create({
        Machining: machineName,
        Mac_cost,
        MacQ,
        SupplierId: SupplementId,
      });
    });

    const otherPromises = filteredOtherDetails.map((data) => {
      const { other: otherName, other_cost, otherQ } = data;
      return SupOther.create({
        other: otherName,
        other_cost,
        otherQ,
        SupplierId: SupplementId,
      });
    });

    const sunPromises = filteredSunDetails.map((data) => {
      const { Sundries: sunName, Sun_cost, SunQ } = data;
      return SupSun.create({
        Sundries: sunName,
        Sun_cost,
        SunQ,
        SupplierId: SupplementId,
      });
    });

    const transPromises = filteredTransDetails.map((data) => {
      const { Transport: transName, Trans_cost, TransQ } = data;
      return SupTrans.create({
        Transport: transName,
        Trans_cost,
        TransQ,
        SupplierId: SupplementId,
      });
    });

    const welPromises = filteredWelDetails.map((data) => {
      const { Welding: welName, Wel_cost, WelQ } = data;
      return SupWel.create({
        Welding: welName,
        Wel_cost,
        WelQ,
        SupplierId: SupplementId,
      });
    });

    const stockPromises = filteredStockDetails.map((data) => {
      const { Stock: stockName, Stock_cost, StockQ } = data;
      return SupStrock.create({
        Stock: stockName,
        Stock_cost,
        StockQ,
        SupplierId: SupplementId,
      });
    });

    await Promise.all([...labourPromises, ...materialPromises, ...machinePromises, ...otherPromises, ...sunPromises, ...transPromises, ...welPromises, ...stockPromises]);

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
});

router.get('/Supview/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `
      SELECT
        supplement.No,
        supplement.Date,
        supplement.Estimated
      FROM supplement
      WHERE supplement.book_id = ?
    `;

    const estimateRecords = await db.query(sql, {
      replacements: [id],
      type: db.QueryTypes.SELECT
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
          LEFT JOIN supplement ON supplement.id = ${alias}.SupplierId
          WHERE supplement.book_id = ?
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

router.get('/Otherother/:id', createGetRoute('sup_other', 'other', ['other', 'other_cost', 'otherQ']));
router.get('/OtherStock/:id', createGetRoute('supstrock', 'strock', ['Stock', 'Stock_cost', 'StockQ']));
router.get('/OtherMac/:id', createGetRoute('sup_mac', 'Mac', ['Machining', 'Mac_cost', 'MacQ']));
router.get('/OtherWel/:id', createGetRoute('supwel', 'Wel', ['Welding', 'Wel_cost', 'WelQ']));
router.get('/OtherTrans/:id', createGetRoute('suptrans', 'Trans', ['Transport', 'Trans_cost', 'TransQ']));
router.get('/OtherSun/:id', createGetRoute('supsun', 'Sun', ['Sundries', 'Sun_cost', 'SunQ']));
router.get('/SupviewLab/:id', createGetRoute('sup_lab', 'Lab', ['Labour', 'Lab_cost', 'LabQ']));
router.get('/SupviewMat/:id', createGetRoute('sup_mat', 'Mat', ['Material', 'Mat_cost', 'MatQ']));

router.put('/Supupdate/:book_id', async (req, res) => {
  const { book_id } = req.params;
  const { No, Date, Estimated, otherDetails, stockDetails, macDetails, matDetails, welDetails, sunDetails, LabDetails, transDetails } = req.body;

  try {
    const supplement = await Supplement.update(
      {
        No,
        Date,
        Estimated
      },
      { where: { book_id } }
    );

    const existingSupplement = await Supplement.findOne({ where: { book_id } });
    const SupplementId = existingSupplement.id;

    const labourPromises = LabDetails.map((labour) => {
      const { id, Labour: labourName, Lab_cost, LabQ } = labour;
      if (id) {
        return SupLab.update(
          { Labour: labourName, Lab_cost, LabQ, SupplierId: SupplementId },
          { where: { id } }
        );
      } else {
        return SupLab.create({
          Labour: labourName,
          Lab_cost,
          LabQ,
          SupplierId: SupplementId
        });
      }
    });

    const materialPromises = matDetails.map((material) => {
      const { id, Material: materialName, Mat_cost, MatQ, issued } = material;
      if (id) {
        return SupMat.update(
          { Material: materialName, Mat_cost, MatQ, issued, SupplierId: SupplementId },
          { where: { id } }
        );
      } else {
        return SupMat.create({
          Material: materialName,
          Mat_cost,
          MatQ,
          issued,
          SupplierId: SupplementId
        });
      }
    });

    const machinePromises = macDetails.map((machine) => {
      const { id, Machining: machineName, Mac_cost, MacQ } = machine;
      if (id) {
        return SupMac.update(
          { Machining: machineName, Mac_cost, MacQ, SupplierId: SupplementId },
          { where: { id } }
        );
      } else {
        return SupMac.create({
          Machining: machineName,
          Mac_cost,
          MacQ,
          SupplierId: SupplementId
        });
      }
    });

    const otherPromises = otherDetails.map((other) => {
      const { id, other: otherName, other_cost, otherQ } = other;
      if (id) {
        return SupOther.update(
          { other: otherName, other_cost, otherQ, SupplierId: SupplementId },
          { where: { id } }
        );
      } else {
        return SupOther.create({
          other: otherName,
          other_cost,
          otherQ,
          SupplierId: SupplementId
        });
      }
    });

    const sunPromises = sunDetails.map((sun) => {
      const { id, Sundries: sunName, Sun_cost, SunQ } = sun;
      if (id) {
        return SupSun.update(
          { Sundries: sunName, Sun_cost, SunQ, SupplierId: SupplementId },
          { where: { id } }
        );
      } else {
        return SupSun.create({
          Sundries: sunName,
          Sun_cost,
          SunQ,
          SupplierId: SupplementId
        });
      }
    });

    const transPromises = transDetails.map((trans) => {
      const { id, Transport: transName, Trans_cost, TransQ } = trans;
      if (id) {
        return SupTrans.update(
          { Transport: transName, Trans_cost, TransQ, SupplierId: SupplementId },
          { where: { id } }
        );
      } else {
        return SupTrans.create({
          Transport: transName,
          Trans_cost,
          TransQ,
          SupplierId: SupplementId
        });
      }
    });

    const welPromises = welDetails.map((wel) => {
      const { id, Welding: welName, Wel_cost, WelQ } = wel;
      if (id) {
        return SupWel.update(
          { Welding: welName, Wel_cost, WelQ, SupplierId: SupplementId },
          { where: { id } }
        );
      } else {
        return SupWel.create({
          Welding: welName,
          Wel_cost,
          WelQ,
          SupplierId: SupplementId
        });
      }
    });

    const stockPromises = stockDetails.map((stock) => {
      const { id, Stock: stockName, Stock_cost, StockQ } = stock;
      if (id) {
        return SupStrock.update(
          { Stock: stockName, Stock_cost, StockQ, SupplierId: SupplementId },
          { where: { id } }
        );
      } else {
        return SupStrock.create({
          Stock: stockName,
          Stock_cost,
          StockQ,
          SupplierId: SupplementId
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

router.get('/SupViewgroup/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `
      SELECT 
        supplement.No,
        supplement.Date,
        supplement.Estimated,
        sup_lab.Labour,
        sup_lab.Lab_cost,
        sup_lab.LabQ,
        sup_mat.Material,
        sup_mat.Mat_cost,
        sup_mat.MatQ,
        sup_mac.Machining,
        sup_mac.Mac_cost,
        sup_mac.MacQ,
        suptrans.Transport,
        suptrans.Trans_cost,
        suptrans.TransQ,
        supstrock.Stock,
        supstrock.Stock_cost,
        supstrock.StockQ,
        supwel.Welding,
        supwel.Wel_cost,
        supwel.WelQ,
        supsun.Sundries,
        supsun.Sun_cost,
        supsun.SunQ,
        sup_other.other,
        sup_other.other_cost,
        sup_other.otherQ
      FROM supplement
      LEFT JOIN sup_lab ON supplement.id = sup_lab.SupplierId
      LEFT JOIN sup_mat ON supplement.id = sup_mat.SupplierId
      LEFT JOIN sup_mac ON supplement.id = sup_mac.SupplierId
      LEFT JOIN suptrans ON supplement.id = suptrans.SupplierId
      LEFT JOIN supstrock ON supplement.id = supstrock.SupplierId
      LEFT JOIN supwel ON supplement.id = supwel.SupplierId
      LEFT JOIN supsun ON supplement.id = supsun.SupplierId
      LEFT JOIN sup_other ON supplement.id = sup_other.SupplierId
      WHERE supplement.book_id = ?
      GROUP BY supplement.No;
    `;

    const results = await db.query(sql, {
      replacements: [id],
      type: db.QueryTypes.SELECT,
    });

    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No records found' });
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error.stack || error.message);
    res.status(500).json({ error: 'An error occurred while fetching data', details: error.message });
  }
});

export default router;