import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Notificacao } from '../Notificacao';

import styles from './Autenticacao.module.css';

const Cadastro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    idade: '',
    endereco: '',
    senha: '',
  });

  const [mostrarMensagem, setMostrarMensagem] =
    useState(false);

  const [textoMensagem, setTextoMensagem] =
    useState('');

  const [tipoMensagem, setTipoMensagem] =
    useState('sucesso');

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
        'http://localhost:3001/usuarios',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.message || 'Erro ao cadastrar'
        );
      }

      setTextoMensagem(
        'Usuário cadastrado com sucesso!'
      );

      setTipoMensagem('sucesso');

      setMostrarMensagem(true);

      setFormData({
        nome: '',
        email: '',
        cpf: '',
        idade: '',
        endereco: '',
        senha: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (erro) {

      console.error(erro);

      setTextoMensagem(
        'Erro ao cadastrar usuário.'
      );

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
          Cadastro
        </h2>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            maxLength={11}
            value={formData.cpf}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="idade"
            placeholder="Idade"
            value={formData.idade}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Cadastrar
          </button>

        </form>

        <p className={styles.link}>
          Já tem conta?
          <a href="/login">
            Faça login
          </a>
        </p>

      </div>

      <Notificacao
        texto={textoMensagem}
        tipo={tipoMensagem}
        visivel={mostrarMensagem}
        fechar={() =>
          setMostrarMensagem(false)
        }
      />
    </section>
  );
};

export { Cadastro };