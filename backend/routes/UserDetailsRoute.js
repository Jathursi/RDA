import express from 'express';
import sequelize from '../config/sequelize.js';
import UsersInf from '../Model/UsersInf.js';
import UserInfDet from '../Model/UserInfdet.js';

const router = express.Router();

router.post('/use/:book_id', async (req, res) => {
  const { book_id } = req.params;
  const { userInfo } = req.body;

  try {
    // Create a new UsersInf record
    const usersInf = await UsersInf.create({ book_id });

    // Create UserInfDet records for each userInfo item
    const userInfDetPromises = userInfo.map(info => 
      UserInfDet.create({
        title: info.title,
        content: info.content,
        usedet_id: usersInf.id
      })
    );

    await Promise.all(userInfDetPromises);

    res.status(201).json({ message: 'User information saved successfully' });
  } catch (error) {
    console.error('Error saving user information:', error);
    res.status(500).json({ error: 'An error occurred while saving user information' });
  }
});

router.get('/use/:book_id', async (req, res) => {
  const { book_id } = req.params;

  try {
    const results = await sequelize.query(
      `SELECT 
          *
       FROM 
          usersinf
       JOIN 
          userinfdet ON usersinf.id = userinfdet.usedet_id
       WHERE 
          usersinf.book_id = :book_id`,
      {
        replacements: { book_id },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (results.length === 0) {
      return res.status(404).json({ error: 'No user information found' });
    }

    res.json(results);
    console.log('Fetched user information:', results);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'An error occurred while fetching user information' });
  }
});

router.get('/useveh/:Vehicle_num', async (req, res) => {
  const { Vehicle_num } = req.params;

  try {
    const results = await sequelize.query(
      `SELECT 
          *
       FROM 
          usersinf
       JOIN 
          userinfdet ON usersinf.id = userinfdet.usedet_id
       WHERE 
          usersinf.Vehicle_num = :Vehicle_num`,
      {
        replacements: { Vehicle_num },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (results.length === 0) {
      return res.status(404).json({ error: 'No user information found' });
    }

    res.json(results);
    console.log('Fetched user information:', results);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'An error occurred while fetching user information' });
  }
});
export default router;