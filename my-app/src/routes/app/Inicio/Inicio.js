import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

const Inicio = () => {
  return <Container>Pagina principal</Container>;
};

export default Inicio;
