import Login from "../Model/Login.js";

export const getUserById = async (req, res) => {
  try {
    const user = await Login.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


