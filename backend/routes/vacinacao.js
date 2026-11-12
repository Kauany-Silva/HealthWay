import express from 'express';

import {
    salvarVacinacao,
    listarVacinacoes,
    editarVacinacao,
    excluirVacinacao
} from '../controllers/vacinacaoController.js';

import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router();

router.post('/', autenticar, salvarVacinacao);

router.get('/', autenticar, listarVacinacoes);

router.put('/:id', autenticar, editarVacinacao);

router.delete('/:id', autenticar, excluirVacinacao);

export default router;