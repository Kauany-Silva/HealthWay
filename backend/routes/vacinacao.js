
import express from 'express';

import {
    salvarVacinacao,
    listarVacinacoes
} from '../controllers/vacinacaoController.js';

import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router();

router.post('/', autenticar, salvarVacinacao);
router.get('/', autenticar, listarVacinacoes);

export default router;
