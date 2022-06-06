import { Router } from "express";

import * as controllers from '../controllers/chad.controller.js';
import { authenticateAccessToken } from '../middleware/tokenmanager.js';

const router = Router();

router.get('/', authenticateAccessToken, controllers.getChads);
router.post('/', authenticateAccessToken, controllers.postChad);
router.patch('/', authenticateAccessToken, controllers.patchChad);
router.delete('/', authenticateAccessToken, controllers.deleteChad);

router.patch('/like', authenticateAccessToken, controllers.likeChad);
router.patch('/dislike', authenticateAccessToken, controllers.dislikeChad);

export default router;