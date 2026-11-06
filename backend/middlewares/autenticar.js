
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const autenticar = (req, res, next) => {
    const autorizacao = req.headers.authorization;

    if (!autorizacao) {
        return res.status(401).json({
            success: false,
            message: 'Acesso não autorizado. Faça login.'
        });
    }

    const partes = autorizacao.split(' ');

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({
            success: false,
            message: 'Formato de token inválido.'
        });
    }

    const token = partes[1];

    try {
        const dadosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = dadosUsuario;

        next();

    } catch (erro) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido ou expirado.'
        });
    }
};
