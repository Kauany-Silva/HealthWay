import style from './SobreNos.module.css';

import { FaClockRotateLeft, FaHeartPulse, FaCircleNodes } from 'react-icons/fa6';

import imagemSaude from '../../Assets/Imagens/ImagemSobreNos.jpeg';
import videoHealthWay from '../../Assets/Videos/VideoSobreNos.mp4';

const SobreNos = () => {
  return (
    <section className={style.secao}>
      <span className={style.selo}>
        ● Sobre Nós
      </span>

      <div className={style.conteudo}>
        <h2 className={style.titulo}>
          Cuidando da sua saúde com
          tecnologia e praticidade.
        </h2>

        <div className={style.textos}>
          <p>
            A Health Way foi criada para centralizar
            informações importantes de saúde,
            facilitando o acesso a documentos,
            histórico médico e serviços essenciais.
          </p>

          <p>
            Nosso objetivo é oferecer uma experiência
            moderna e intuitiva para que cada usuário
            tenha mais controle sobre sua própria
            saúde e bem-estar.
          </p>
        </div>
      </div>

      <div className={style.cartoes}>
        <div className={style.cartao}>
          <div className={style.icone}><FaClockRotateLeft/></div>

          <div>
            <h3>Agilidade</h3>

            <p>
              Informações médicas sempre
              acessíveis.
            </p>
          </div>
        </div>

        <div className={style.cartao}>
          <div className={style.icone}><FaHeartPulse/></div>

          <div>
            <h3>Bem-estar</h3>

            <p>
              Incentivo a hábitos saudáveis
              e prevenção.
            </p>
          </div>
        </div>

        <div className={style.cartao}>
          <div className={style.icone}><FaCircleNodes/></div>

          <div>
            <h3>Conectividade</h3>

            <p>
              Integração entre pacientes
              e profissionais.
            </p>
          </div>
        </div>
      </div>

      <div className={style.areaMidia}>
        <div className={style.containerImagem}>
          <img
            src={imagemSaude}
            alt="Profissionais da saúde"
            className={style.imagem}
          />
        </div>

        <div className={style.containerVideo}>
          <video
            className={style.video}
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src={videoHealthWay}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
};

export {SobreNos};