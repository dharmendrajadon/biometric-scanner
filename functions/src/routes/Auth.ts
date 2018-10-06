import * as express from 'express';
import * as AuthController from '../controllers/Auth/Auth';
import { Validations } from '../schemas/Auth/Auth';

// Create router instance
const router: express.Router = express.Router();

// Auth Device Verify
router.post('/device-verify', Validations.deviceVerify, AuthController.postDeviceVerify);

export default router;
