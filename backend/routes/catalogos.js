import express from 'express';

import {
    listarVacinas,
    listarDoses
} from '../controllers/catalogoController.js';

const router = express.Router();

router.get('/vacinas', listarVacinas);
router.get('/doses', listarDoses);

export default router;