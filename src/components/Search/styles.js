import styled from "styled-components";

export const ContainerForm = styled.form`
  position: relative;
  width: 15rem;
  max-width: 33.33%;
  border: 1px solid var(--primary);
  border-radius: 9999px;

  @media (max-width: 580px) {
    width: 20rem;
    max-width: 80%;
  }

  input {
    background: transparent;
    padding: 0.75rem;
    border-radius: 9999px;
    border: none;

    width: calc(100% - 2rem);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--dark);
      opacity: 0.5;
    }
  }

  button {
    color: var(--primary);
    padding: 0.5rem;

    width: 2rem;
    height: 2rem;

    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
  }
`;
