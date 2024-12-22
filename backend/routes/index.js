import { Router } from 'express';
// import Logins from '../models/loginModel.js';
import userRoutes from './userRoutes.js';
import logbookRoute from './logbookRoute.js';
const router = Router();

router.use('/users', userRoutes);
router.use('/logbook', logbookRoute);

export default router;