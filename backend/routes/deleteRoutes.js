import express from 'express';
import { Op } from 'sequelize';
// import CrossCheck from '../models/CrossCheck.js';
import CrossCheck from '../model/CrossCheck.js';
import CheckList from '../model/CheckList.js';
import QutationImg from '../model/QutationImg.js';
import SupQuotation from '../model/SupQuotation.js';
import EstImage from '../model/EstImage.js';
import ImpImage from '../model/ImpImage.js';
import CompImage from '../model/CompImage.js';
import Outimg from '../model/Outimg.js';

const router = express.Router();

const deleteImage = async (req, res) => {
    const { id, model } = req.params;

    let Model;
    switch (model) {
        case 'crosscheck':
            Model = CrossCheck;
            break;
        case 'checklist':
            Model = CheckList;
            break;
        case 'qutationimg':
            Model = QutationImg;
            break;
        case 'supquotation':
            Model = SupQuotation;
            break;
        case 'estimage':
            Model = EstImage;
            break;
        case 'impimage':
            Model = ImpImage;
            break;
        case 'compimage':
            Model = CompImage;
            break;
        case 'outimg':
            Model = Outimg;
            break;
        default:
            return res.status(400).json({ error: 'Invalid model name' });
    }

    try {
        const result = await Model.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        if (result === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the image' });
    }
};

router.delete('/delete/:model/:id', deleteImage);

export default router;