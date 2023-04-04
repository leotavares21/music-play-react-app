import styled from "styled-components";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 5rem;
  width: 100%;
  background: var(--light);
  border-bottom: 1px solid #ccc;

  margin-bottom: 3rem;

  position: sticky;
  top: 0;
  z-index: 100;

  transition: transform 0.3s ease-in-out;

  @media (max-width: 580px) {
    transform: ${props =>
      props.stickyUp ? "translateY(0)" : "translateY(-6.5rem)"};
  }

  @media (max-width: 580px) {
    flex-direction: column;
    text-align: center;

    gap: 1.5rem;

    height: auto;
    padding: 1rem;
  }

  h3 {
    width: 33.33%;
    a {
      color: var(--primary);
    }

    @media (max-width: 580px) {
      width: 80%;
    }
  }

  nav {
    width: 33.33%;

    @media (max-width: 580px) {
      width: 80%;
    }

    ul {
      display: flex;
      gap: 1.5rem;

      @media (max-width: 580px) {
        justify-content: center;
      }
    }

    a {
      color: var(--dark);
      transition: all 0.2s;
      position: relative;

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 1rem;
        height: 1rem;

        border-radius: 50%;

        background: var(--primary);
        color: var(--light);
        font-size: 0.625rem;

        position: absolute;
        top: -0.35rem;
        right: -0.75rem;
      }

      &:hover {
        color: var(--primary);
        filter: brightness(0.95);
      }
    }
  }
`;

export default Container;
