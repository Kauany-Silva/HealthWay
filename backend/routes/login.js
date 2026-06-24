import express from 'express';

import {
  realizarLogin
} from '../controllers/loginController.js';

const router = express.Router();

router.post('/', realizarLogin);

export default router;