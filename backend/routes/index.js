import { Router } from 'express';
// import Logins from '../models/loginModel.js';
import userRoutes from './userRoutes.js';
import logbookRoute from './logbookRoute.js';
import estRoute from './estRoute.js';
import supRoutes from './supRoutes.js';
import impRoutes from './impRoutes.js';
const router = Router();

router.use('/users', userRoutes);
router.use('/logbook', logbookRoute);
router.use('/est', estRoute);
router.use('/sup', supRoutes);
router.use('/imp', impRoutes);
export default router;