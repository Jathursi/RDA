import express from 'express';
import Out from '../Model/Out.js';
import OutReg from '../Model/OutReg.js';
import db from '../config/sequelize.js'; // Ensure you have the correct database connection

const router = express.Router();

router.post('/Outinsert/:book_id', async (req, res) => {
    const book_id = req.params.book_id;
    const values = req.body.values;

    try {
        // Create OutReg entry
        const outreg = await OutReg.create({ book_id });
        const out_id = outreg.id;

        // Map values to include Out_id for each entry
        const outValues = values.map(value => ({
            ...value,
            Out_id: out_id,
        }));

        // Bulk create Out entries
        await Out.bulkCreate(outValues);

        res.status(201).send('Logbook entries added successfully');
    } catch (error) {
        console.error('Error adding logbook entries:', error);
        res.status(500).send(`An error occurred while adding logbook entries: ${error.message}`);
    }
});

router.get('/Outview/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book_id = id; // Get book_id from request parameters

    // Ensure that book_id is provided
    if (!book_id) {
      return res.status(400).json({ error: 'book_id is required' });
    }

    const sql = `
      SELECT 
          \`out\`.id,
          \`out\`.Date,
          \`out\`.Description,
          \`out\`.Job_NO,
          \`out\`.Supplier,
          \`out\`.cost,
          \`out\`.Authority
        FROM outreg LEFT JOIN \`out\` ON \`out\`.Out_id = outreg.id
        WHERE outreg.book_id = ?;
        `;

    // Use Sequelize's query method
    const results = await db.query(sql, {
      replacements: [book_id],
      type: db.QueryTypes.SELECT
    });

    // Log the results for debugging
    console.log('Query Results:', results);

    // Check if any records were found
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No records found' });
    }

    // Return the fetched records
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

router.put('/Outupdate/:book_id', async (req, res) => {
    const book_id = req.params.book_id;
    const values = req.body.values;

    try {
        const outreg = await OutReg.findOne({ where: { book_id } });
        if (!outreg) {
            return res.status(404).send('No records found');
        }
        const out_id = outreg.id;

        const updateOrCreatePromises = values.map(value => {
            if (value.id) {
                // Update existing entry if ID is present
                return Out.update(value, { where: { id: value.id, Out_id: out_id } });
            } else {
                // Create new entry if ID is absent
                return Out.create({ ...value, Out_id: out_id });
            }
        });

        await Promise.all(updateOrCreatePromises);

        res.status(200).send('Logbook entries updated successfully');
    } catch (error) {
        console.error('Error updating logbook entries:', error);
        res.status(500).send(`An error occurred while updating logbook entries: ${error.message}`);
    }
});

export default router;