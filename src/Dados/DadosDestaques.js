import DestaqueConsulta from "../Assets/Imagens/DestaqueConsulta.jpeg"
import DestaqueCelular from "../Assets/Imagens/DestaqueCelular.jpeg"
//fazer import das imagens de cada dica

//dicas:

const DadosDestaques = [
  {
    id: 1,
    titulo: 'Realizar consultas regulares',
    descricao:
      'Realize consultas médicas regulares e exames de check-up pelo menos uma vez ao ano para prevenir doenças.',
    imagem: DestaqueConsulta,
  },

  {
    id: 2,
    titulo: 'Evitar usar o celular antes de dormir',
    descricao:
      'Evite usar o celular pelo menos 30 minutos antes de dormir para melhorar a qualidade do sono.',
    imagem: DestaqueCelular,
  },
];
{/*
  {
    id: 3,
    titulo: 'Durma bem',
    descricao:
      'Uma boa noite de sono fortalece o sistema imunológico e melhora o humor.',
    imagem: Sono,
  },

  {
    id: 4,
    titulo: 'Alimente-se melhor',
    descricao:
      'Uma alimentação equilibrada contribui para a saúde e o bem-estar.',
    imagem: Alimentacao,
  },
];*/}

export {DadosDestaques}