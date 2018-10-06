import * as express from 'express';
import authRoutes from './Auth';

// Create router instance
const router: express.Router = express.Router();

// Publish Auth Routes
router.use('/auth', authRoutes);

export default router;
