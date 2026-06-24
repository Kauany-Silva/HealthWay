import { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaVolumeUp,
  FaPlus,
  FaMinus,
  FaRedo,
  FaUniversalAccess,
} from "react-icons/fa";

import style from "./PainelAcessibilidade.module.css";

const HeroTema = {
  AzulGelo: "#B3D9FF",
  AzulPolar: "#E6F2FF",
  AzulBebe: "#80BFFF",

  AzulDog: "#1E90FF",
  AzulVibrante: "#007BFF",
  AzulSuave: "#4DA6FF",

  AzulRoyal: "#0059B3",
  AzulEscuro: "#001D39",
};

const PainelAcessibilidade = () => {
  const [aberto, setAberto] = useState(false);

  const [escalaFonte, setEscalaFonte] = useState(1);

  const [contrasteAtivo, setContrasteAtivo] =
    useState(false);

  const [modoLeitura, setModoLeitura] =
    useState(false);

  const [idioma, setIdioma] =
    useState("pt-BR");

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--escala-fonte",
      escalaFonte
    );
  }, [escalaFonte]);

  useEffect(() => {
    if (contrasteAtivo) {
      document.documentElement.style.setProperty(
        "--AzulGelo",
        HeroTema.AzulEscuro
      );

      document.documentElement.style.setProperty(
        "--AzulPolar",
        HeroTema.AzulRoyal
      );

      document.documentElement.style.setProperty(
        "--AzulBebe",
        HeroTema.AzulEscuro
      );

      document.documentElement.style.setProperty(
        "--AzulRoyal",
        HeroTema.AzulPolar
      );

      document.documentElement.style.setProperty(
        "--AzulEscuro",
        HeroTema.AzulGelo
      );
    } else {
      document.documentElement.style.setProperty(
        "--AzulGelo",
        HeroTema.AzulGelo
      );

      document.documentElement.style.setProperty(
        "--AzulPolar",
        HeroTema.AzulPolar
      );

      document.documentElement.style.setProperty(
        "--AzulBebe",
        HeroTema.AzulBebe
      );

      document.documentElement.style.setProperty(
        "--AzulRoyal",
        HeroTema.AzulRoyal
      );

      document.documentElement.style.setProperty(
        "--AzulEscuro",
        HeroTema.AzulEscuro
      );
    }
  }, [contrasteAtivo]);

  useEffect(() => {
    const falarTexto = (texto) => {
      if (!texto) return;

      window.speechSynthesis.cancel();

      const msg =
        new SpeechSynthesisUtterance(texto);

      msg.lang = idioma;

      window.speechSynthesis.speak(msg);
    };

    const handleMouseOver = (e) => {
      if (!modoLeitura) return;

      const texto =
        e.target.innerText ||
        e.target.alt ||
        "";

      falarTexto(texto);
    };

    if (modoLeitura) {
      document.addEventListener(
        "mouseover",
        handleMouseOver
      );
    }

    return () => {
      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );
    };
  }, [modoLeitura, idioma]);

  return (
    <>
      <button
        className={style.botaoAcessibilidade}
        onClick={() => setAberto(!aberto)}
      >
        <FaUniversalAccess />
      </button>

      {aberto && (
        <div className={style.painel}>
          <div className={style.linha}>
            <button
              onClick={() =>
                setEscalaFonte((v) =>
                  Math.max(v - 0.1, 0.8)
                )
              }
            >
              <FaMinus />
            </button>

            <span>
              {(escalaFonte * 100).toFixed(0)}%
            </span>

            <button
              onClick={() =>
                setEscalaFonte((v) =>
                  Math.min(v + 0.1, 1.8)
                )
              }
            >
              <FaPlus />
            </button>

            <button
              onClick={() =>
                setEscalaFonte(1)
              }
            >
              <FaRedo />
            </button>
          </div>

          <button
            className={style.botao}
            onClick={() =>
              setContrasteAtivo(
                (v) => !v
              )
            }
          >
            {contrasteAtivo ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}

            {contrasteAtivo
              ? " Tema Claro"
              : " Tema Escuro"}
          </button>

          <button
            className={style.botao}
            onClick={() =>
              setModoLeitura(
                (v) => !v
              )
            }
          >
            <FaVolumeUp />

            {modoLeitura
              ? " Desligar Leitor"
              : " Ligar Leitor"}
          </button>

          <div className={style.idiomas}>
            <button
              onClick={() =>
                setIdioma("pt-BR")
              }
            >
              PT
            </button>

            <button
              onClick={() =>
                setIdioma("en-US")
              }
            >
              EN
            </button>

            <button
              onClick={() =>
                setIdioma("es-ES")
              }
            >
              ES
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export { PainelAcessibilidade };