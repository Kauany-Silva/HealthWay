
import express from 'express';

import { cadastrarExame } from '../controllers/exameController.js';
import { autenticar } from '../middlewares/autenticar.js';
import uploadExame from '../middlewares/uploadExame.js';

const router = express.Router();

router.post(
    '/',
    autenticar,
    uploadExame.single('arquivo'),
    cadastrarExame
);

export default router;
