
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

import { Notificacao } from '../Notificacao';

import styles from './Autenticacao.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [textoMensagem, setTextoMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('sucesso');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(
        'http://localhost:3001/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok || !dados.success || !dados.usuario) {
        setTextoMensagem('Email ou senha inválidos.');
        setTipoMensagem('erro');
        setMostrarMensagem(true);
        return;
      }

      // Atualiza o contexto de autenticação
      setUser(dados.usuario);

      // Mantém compatibilidade com o Dashboard existente
      localStorage.setItem(
        'usuario',
        JSON.stringify(dados.usuario)
      );

      setTextoMensagem('Login realizado com sucesso!');
      setTipoMensagem('sucesso');
      setMostrarMensagem(true);

      // Redireciona para o Dashboard
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);

    } catch (erro) {
      console.error('Erro ao realizar login:', erro);

      setTextoMensagem('Erro ao conectar com o servidor.');
      setTipoMensagem('erro');
      setMostrarMensagem(true);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>
          Health Way
        </h1>

        <h2 className={styles.titulo}>
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            autoComplete="current-password"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Entrar
          </button>
        </form>

        <p className={styles.link}>
          Não possui conta?{' '}
          <a href="/cadastro">
            Cadastre-se
          </a>
        </p>
      </div>

      <Notificacao
        texto={textoMensagem}
        tipo={tipoMensagem}
        visivel={mostrarMensagem}
        fechar={() => setMostrarMensagem(false)}
      />
    </section>
  );
};

export { Login };
