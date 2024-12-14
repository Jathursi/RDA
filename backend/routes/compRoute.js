import express from 'express';
import Complete from '../Model/Complete.js';

const router = express.Router();
/*supervised: '',
        initiated: '',
        closed: '',
        approved: '',
        aditional_fault: ''*/
router.post('/Cominsert/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const { supervised, initiated, closed, approved, aditional_fault } = req.body;

    try {
        // Insert into Completion table
        const completion = await Complete.create({
            supervised,
            initiated,
            closed,
            approved,
            aditional_fault,
            book_id,
        });

        return res.status(201).json(completion);
    } catch (error) {
        return res.status(500).json({ error: 'Error adding completion details' });
    }
}
);

router.get('/comp/:id', async (req, res) => {
    const { id } = req.params;

    const book_id = id;
    try {
        const completion = await Complete.findAll({ where: { book_id } });
        return res.status(200).json(completion);
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving completion details' });
    }
});

router.put('/comp/:id', async (req, res) => {
    const { id } = req.params;
    const { supervised, initiated, closed, approved, aditional_fault } = req.body;

    try {
        const completion = await Complete.update({
            supervised,
            initiated,
            closed,
            approved,
            aditional_fault,
        }, { where: { book_id: id } });

        return res.status(200).json(completion);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating completion details' });
    }
});

export default router;
