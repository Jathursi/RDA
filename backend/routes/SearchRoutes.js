import express from 'express';
import Regist from '../Model/Regist.js';

const router = express.Router();

router.get('/vehicleUser/:vehicle_num', async (req, res) => {
  const { vehicle_num } = req.params;

  try {
    // Fetch data from database based on `vehicle_num`
    const vehicleData = await Regist.findAll({ where: { vehicle_num } });

    if (vehicleData && vehicleData.length > 0) {
      res.json(vehicleData);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Error fetching vehicle data:', error.message); // Log the exact error message
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

export default router;
