import express from 'express';
import cors from 'cors';

import usuarioRoutes from './routes/usuarios.js';
import loginRoutes from './routes/login.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/login', loginRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando');
});