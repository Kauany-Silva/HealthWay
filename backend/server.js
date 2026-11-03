import express from 'express';
import cors from 'cors';

import usuarioRoutes from './routes/usuarios.js';
import loginRoutes from './routes/login.js';
import catalogosRoutes from './routes/catalogos.js';
import vacinacaoRoutes from './routes/vacinacao.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/catalogos', catalogosRoutes);
app.use('/vacinacao', vacinacaoRoutes);

app.listen(3001, () => {
    console.log('Servidor rodando');
});