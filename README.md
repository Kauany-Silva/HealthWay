Dicas para o futuro:

props (propriedades)
exemplo:

const Conteudo = (props) => {
    const (NomeDaPropriedade) = props // para desestruturação, para não ter que ficar chamando .props
    return (
        {NomeDaPropriedade}
    );
}

Na Page:
invés de só abrir e fechar o Componente ex: <Conteudo/>
Você coloca as informações dentro, dependendo do que quer que apareça em cada página
exemplo:

<Conteudo>
    <h1> Título </h1>
    <p> texto texto texto </p>
</Conteudo>