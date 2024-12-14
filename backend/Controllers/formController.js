import Regist from "../Model/Regist.js";

export const getRegist = async (req, res) => {
    try {
        const regist = await Regist.findAll();
        res.json(regist);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

