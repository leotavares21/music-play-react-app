import styled from "styled-components";

const ContainerMain = styled.div`
  width: 100%;
  max-width: 1400px;
  min-height: 100vh;
  padding: 0 0.75rem;
  margin: 0 auto;

  position: relative;

  @media (max-width: 767px) {
    h1 {
      text-align: center;
      font-size: 2rem;
    }
  }

  .loader {
    padding-top: 2rem;
    position: absolute;
    width: 100%;
    height: 100%;

    background: var(--light);
  }
`;

export default ContainerMain;
