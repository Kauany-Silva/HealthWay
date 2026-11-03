import express from 'express';

import {
    salvarVacinacao,
    listarVacinacoes
} from '../controllers/vacinacaoController.js';

const router = express.Router();

router.post('/', salvarVacinacao);
router.get('/', listarVacinacoes);

export default router;