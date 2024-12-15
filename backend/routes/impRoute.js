import express from 'express';
import multer from 'multer';
import db from '../config/sequelize.js';
import Implement from '../Model/Implement.js';
import Labour from '../Model/Labour.js';
import Material from '../Model/Material.js';
import Supplier from '../Model/Supplier.js';
import QutationImg from '../Model/QutationImg.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/Iminsert/:id', upload.array('images'), async (req, res) => {
  const { id } = req.params;
  const book_id = id;
  const { Start_Date, Job_Assigned, labourDetails, Req_date, Req_off, Auth = 'DefaultAuthValue', suppliers } = req.body;

  try {
    // Check if book_id exists in regist table
    const bookExists = await db.query(
      'SELECT * FROM regist WHERE id = ?',
      { replacements: [book_id], type: db.QueryTypes.SELECT }
    );
    if (!bookExists.length) {
      return res.status(400).json({ error: 'Invalid book_id: Does not exist in regist table' });
    }

    // Check if implement entry already exists
    const existingImplement = await Implement.findOne({ where: { book_id } });
    if (existingImplement) {
      return res.status(400).json({ error: 'Implement entry already exists for this book_id' });
    }

    // Create Implement entry
    const implement = await Implement.create({
      Start_Date,
      Job_Assigned,
      book_id,
      Req_date,
      Req_off,
      Auth,
    });

    const implementId = implement.id;

    // Parse labourDetails and suppliers
    const labourDetailsArray = Array.isArray(labourDetails) ? labourDetails : JSON.parse(labourDetails);
    const suppliersArray = Array.isArray(suppliers) ? suppliers : JSON.parse(suppliers);

    // Insert Labour details
    const labourPromises = labourDetailsArray.map((labour) => {
      const { Labour: labourName, Labour_cost, LabourQ, issued } = labour;
      return Labour.create({
        Labour: labourName,
        Labour_cost,
        LabourQ,
        issued,
        implement_id: implementId,
      });
    });

    // Insert Suppliers and Materials
    const supplierPromises = suppliersArray.map(async (supplier) => {
      const { supplier: supplierName, Quotation, materials } = supplier;
      const newSupplier = await Supplier.create({
        supplier: supplierName,
        Quotation,
        implement_id: implementId,
      });

      const supplierId = newSupplier.id;

      const materialPromises = materials.map((material) => {
        const { Material: materialName, Mat_cost, MatQ, issued } = material;
        return Material.create({
          Material: materialName,
          Mat_cost,
          MatQ,
          issued,
          implement_id: implementId,
          quatationsupplier_id: supplierId,
        });
      });

      const imagePromises = req.files.map((file) => {
        const fileType = file.mimetype; // Extract the MIME type of the file
        const fileSize = file.size; // Extract the size of the file
        const fileData = file.buffer; // Extract the file data as a buffer
        return QutationImg.create({
          fileType,
          fileSize,
          fileData,
          quatationsupplier_id: supplierId,
        });
      });

      await Promise.all([...materialPromises, ...imagePromises]);
    });

    await Promise.all([...labourPromises, ...supplierPromises]);

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
});

export default router;