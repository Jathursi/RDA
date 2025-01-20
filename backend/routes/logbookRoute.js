import express from 'express';
import Logbook from '../model/Logbook.js';
import CheckList from '../model/checklist.js';
import CrossCheck from '../model/crosscheck.js';
import multer from 'multer';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/Logbook', verifyToken, upload.fields([{ name: 'checklistImage' }, { name: 'crosscheckImage' }]), async (req, res) => {
  const { Vehicle_num, Year, Vehicle_type, Fault, Inspected, Meter, Location, Reference, Response, CrossCheckby } = req.body;
  const userID = req.user.id;

  try {
    // Create logbook entry
    const logbookEntry = await Logbook.create({
      Vehicle_num,
      Year,
      Vehicle_type,
      Fault,
      Inspected,
      Meter,
      Location,
      Reference,
      Response,
      CrossCheckby,
      userID,
    });

    // Store checklist image if provided
    if (req.files.checklistImage) {
      const checklistImages = req.files.checklistImage;
      await CheckList.bulkCreate(
        checklistImages.map((image) => ({
          fileType: image.mimetype,
          fileSize: image.size,
          fileData: image.buffer,
          book_id: logbookEntry.id,
        }))
      );
    }

    // Store crosscheck image if provided
    if (req.files.crosscheckImage) {
      const crosscheckImages = req.files.crosscheckImage;
      await CrossCheck.bulkCreate(
        crosscheckImages.map((image) => ({
          fileType: image.mimetype,
          fileSize: image.size,
          fileData: image.buffer,
          book_id: logbookEntry.id,
        }))
      );
    }

    res.status(201).json({ message: 'Logbook entry created successfully', logbookEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the logbook entry' });
  }
});

router.get('/Logbook', verifyToken, async (req, res) => {
  try {
    const logbookEntries = await Logbook.findAll();
    res.status(200).json(logbookEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the logbook entries' });
  }
});

router.get('/log/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const logbookEntry = await Logbook.findOne({
      where: { id: id },
    });
    if (!logbookEntry) {
      return res.status(404).json({ error: 'Logbook entry not found' });
    }

    const checklistImages = await CheckList.findAll({
      where: { book_id: id },
    });

    const crosscheckImages = await CrossCheck.findAll({
      where: { book_id: id },
    });

    const checklistImagesWithBase64 = checklistImages.map((image) => ({
      ...image.toJSON(),
      base64Data: image.fileData.toString('base64'),
    }));

    const crosscheckImagesWithBase64 = crosscheckImages.map((image) => ({
      ...image.toJSON(),
      base64Data: image.fileData.toString('base64'),
    }));

    res.status(200).json({ logbookEntry, checklistImages: checklistImagesWithBase64, crosscheckImages: crosscheckImagesWithBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the logbook entry' });
  }
});

router.get('/logprint/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const logbookEntry = await Logbook.findOne({
      where: { id: id },
    });
    if (!logbookEntry) {
      return res.status(404).json({ error: 'Logbook entry not found' });
    }

    res.status(200).json({ logbookEntry});
    console.log('Logbook Entry Response:', { logbookEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the logbook entry' });
  }
});


// delete route for crosscheck and checklist image
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log('ID received for deletion:', id);

  try {
    const checklistImage = await CheckList.findOne({ where: { id } });
    if (!checklistImage) {
      return res.status(404).json({ error: 'Checklist image not found' });
    }
    const crosscheckImage = await CrossCheck.findOne({ where: { id } });
    if (!crosscheckImage) {
      return res.status(404).json({ error: 'Crosscheck image not found' });
    }
    
    await checklistImage.destroy();
    await crosscheckImage.destroy();
    res.status(200).json({ message: 'Checklist image deleted successfully' });
  } catch (error) {
    console.error('Error deleting checklist image:', error);
    res.status(500).json({ error: 'An error occurred while deleting the checklist image' });
  }
}

);  


export default router;