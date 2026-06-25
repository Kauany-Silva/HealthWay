import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { DadosDestaques } from '../../Dados/DadosDestaques';

import style from './Destaques.module.css';

const Destaques = () => {
  return (
    <section className={style.container}>

      <h2>
        Destaques do mês
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
      >
        {DadosDestaques.map((item) => (
          <SwiperSlide key={item.id}>

            <div className={style.slide}>

              <div className={style.texto}>
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
              </div>

              <div className={style.imagem}>
                <img
                  src={item.imagem}
                  alt={item.titulo}
                />
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};

export { Destaques };