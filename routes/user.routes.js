import { Router } from "express";

import * as controllers from '../controllers/user.controllers.js';
import { authenticateRefreshToken } from '../middleware/tokenmanager.js';

const router = Router();

router.post('/login', controllers.loginUser);
router.post('/register', controllers.registerUser);
router.get('/refresh', authenticateRefreshToken, controllers.refreshUserAccessToken);

export default router;