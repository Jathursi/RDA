import express from 'express';
import Implement from '../Model/Implement.js';
import Labour from '../Model/Labour.js';
import Material from '../Model/Material.js';
import db from '../config/sequelize.js';

const router = express.Router();

router.post('/Iminsert/:book_id', async (req, res) => {
  const { book_id } = req.params;
  const { Start_Date, Job_Assigned, labourDetails, matcost, Req_date, Req_off, Vaucher, Auth, supplier } = req.body;

  try {
    const existingImplement = await Implement.findOne({ where: { book_id } });

    if (existingImplement) {
      return res.status(400).json({ message: 'Entry already exists. Use the update route instead.' });
    }

    const implement = await Implement.create({
      Start_Date,
      Job_Assigned,
      book_id,
      Req_date,
      Req_off,
      Vaucher,
      Auth,
      supplier,
    });

    const implementId = implement.id;

    const labourPromises = labourDetails.map((labour) => {
      const { Labour: labourName, Lab_cost, LabQ } = labour;
      return Labour.create({
        Labour: labourName,
        Lab_cost,
        LabQ,
        implement_id: implementId,
      });
    });

    const materialPromises = matcost.map((data) => {
      const { Material: materialName, Mat_cost, MatQ, issued } = data;
      return Material.create({
        Material: materialName,
        Mat_cost,
        MatQ,
        issued,
        implement_id: implementId,
      });
    });

    await Promise.all([...labourPromises, ...materialPromises]);

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
});

router.get('/Imview/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const implementRecords = await Implement.findAll({
      where: { book_id: id },
    });

    if (implementRecords.length === 0) {
      return res.status(404).json({ error: 'No records found' });
    }

    res.json(implementRecords);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

router.get('/ImviewMat/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book_id = id;

    if (!book_id) {
      return res.status(400).json({ error: 'book_id is required' });
    }

    const sql = `
      SELECT 
          material.id,
          material.Material,
          material.Mat_cost,
          material.MatQ,
          material.issued
        FROM Material
        LEFT JOIN implement ON implement.id = material.implement_id
        WHERE implement.book_id = ?
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

router.get('/ImviewLab/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book_id = id;

    if (!book_id) {
      return res.status(400).json({ error: 'book_id is required' });
    }

    const sql = `
      SELECT 
          labour.id,
          labour.Labour,
          labour.Lab_cost,
          labour.LabQ
        FROM Labour
        LEFT JOIN implement ON implement.id = labour.implement_id
        WHERE implement.book_id = ?
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

router.put('/Imput/:book_id', async (req, res) => {
  const { book_id } = req.params;
  const { Start_Date, Job_Assigned, labourDetails, matcost, Req_date, Req_off, Vaucher, Auth, supplier } = req.body;

  try {
    const implement = await Implement.update(
      {
        Start_Date,
        Job_Assigned,
        Req_date,
        Req_off,
        Vaucher,
        Auth,
        supplier
      },
      { where: { book_id } }
    );

    const existingImplement = await Implement.findOne({ where: { book_id } });
    const implementId = existingImplement.id;

    const labourPromises = labourDetails.map((labour) => {
      const { id, Labour: labourName, Lab_cost, LabQ } = labour;
      if (id) {
        return Labour.update(
          { Labour: labourName, Lab_cost, LabQ },
          { where: { id } }
        );
      } else {
        return Labour.create({
          Labour: labourName,
          Lab_cost,
          LabQ,
          implement_id: implementId
        });
      }
    });

    const materialPromises = matcost.map((material) => {
      const { id, Material: materialName, Mat_cost, MatQ, issued } = material;
      if (id) {
        return Material.update(
          { Material: materialName, Mat_cost, MatQ, issued },
          { where: { id } }
        );
      } else {
        return Material.create({
          Material: materialName,
          Mat_cost,
          MatQ,
          issued,
          implement_id: implementId
        });
      }
    });

    await Promise.all([...labourPromises, ...materialPromises]);

    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'An error occurred while updating data' });
  }
});

export default router;