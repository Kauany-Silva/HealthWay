import { useEffect } from 'react';
import styles from './Notificacao.module.css';

const Notificacao = ({
  texto,
  tipo = 'sucesso',
  visivel,
  fechar,
}) => {

  useEffect(() => {
    if (!visivel) return;

    const timer = setTimeout(() => {
      fechar();
    }, 2000);

    return () => clearTimeout(timer);
  }, [visivel, fechar]);

  if (!visivel) return null;

  return (
    <div
      className={`
        ${styles.mensagem}
        ${styles[tipo]}
      `}
    >
      {texto}
    </div>
  );
};

export { Notificacao };