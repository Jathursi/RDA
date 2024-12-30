import express from 'express';
import Userinf from '../model/Userinf.js';

const router = express.Router();

router.post('/insert/:id', async (req, res) => {
    const { id: book_id } = req.params;
    const { title, content } = req.body;

    if (!title || !content || !book_id) {
        return res.status(400).json({ error: 'Title, content, and book_id fields are required.' });
    }

    try {
        const userinf = await Userinf.create({
            title,
            content,
            book_id
        });

        res.status(201).json({ userinf });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/use/:book_id', async (req, res) => {
    const { book_id } = req.params;

    try {
        const userinf = await Userinf.findAll({
            where: { book_id },
            order: [['id', 'DESC']]
        });

        // Format the response for frontend
        const formattedData = userinf.map((entry) => ({
            title: entry.title,
            content: entry.content,
            createdAt: entry.created_at ? entry.created_at.toISOString() : null
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content fields are required.' });
    }

    try {
        const [updated] = await Userinf.update(
            { title, content },
            { where: { id } }
        );

        if (updated) {
            const updatedUserinf = await Userinf.findByPk(id);
            return res.status(200).json(updatedUserinf);
        }

        throw new Error('Userinf not found');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;