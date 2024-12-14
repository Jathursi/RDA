import { Router } from 'express';
import userRoutes from './userRoutes.js';
import formRoute from './formRoute.js';
import impRoute from './impRoute.js';
import compRoute from './compRoute.js';
import EstRoute from './EstRoute.js';
import OtherRoute from './OtherRoute.js';
import outRoute from './outRoute.js';
import supRoute from './supRoute.js';
import resourceRoute from './resourceRoute.js';
import InImageRoute from './InImageRoute.js';
import ImpImageRoute from './ImpImageRoute.js';
import comImageRoute from './comImageRoute.js';
import SumRoute from './SumRoute.js';
import AuthEmailRoute from './AuthEmailRoute.js';
import CompEmailRoute from './CompEmailRoute.js';
import SearchRoutes from './SearchRoutes.js';
import FeedBackRoute from './FeedBackRoute.js';
import UserDetailsRoute from './UserDetailsRoute.js';

const router = Router(); // Initialize the Router instance

router.use('/users', userRoutes);
router.use('/reg', formRoute);
router.use('/imp', impRoute);
router.use('/comp', compRoute);
router.use('/est', EstRoute);
router.use('/other', OtherRoute);
router.use('/out', outRoute);
router.use('/sup', supRoute);
router.use('/resource', resourceRoute);
router.use('/images', InImageRoute);
router.use('/images', ImpImageRoute);
router.use('/images', comImageRoute); // Ensure this line is present
router.use('/Sum', SumRoute);
router.use('/email', AuthEmailRoute);
router.use('/email', CompEmailRoute);
router.use('/search', SearchRoutes);
router.use('/feedback', FeedBackRoute);
router.use('/userdet', UserDetailsRoute);

export default router;