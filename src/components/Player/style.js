import styled from "styled-components";

const ContainerPlayer = styled.div`
  width: 100%;
  height: 5rem;

  background: var(--secondary);
  color: var(--info);

  position: fixed;
  bottom: ${props => (props.playerIsOpen ? "0" : "-5rem")};
  transition: bottom 0.2s ease-in-out;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0 3vw;

  margin-top: 3rem;
  border-top: 1px solid var(--primary);

  @media (max-width: 890px) {
    flex-wrap: wrap;
    height: 11.5rem;
    padding: 1rem;

    bottom: ${props => (props.playerIsOpen ? "0" : "-11.5rem")};
  }

  .icon-wrapper {
    position: absolute;
    top: ${props => (props.playerIsOpen ? "-1rem" : "-2rem")};
    transition: top 0.2s ease-in-out;
    right: 3vw;

    cursor: pointer;

    background: var(--light);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    .icon {
      width: 2rem;
      height: 2rem;
    }
  }

  button {
    color: var(--primary);
    background: transparent;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.85);
    }
  }

  .play-action {
    @media (max-width: 890px) {
      width: 100vw;
      display: flex;
      justify-content: center;
    }

    button {
      font-size: 2.25rem;

      &.play-button {
        margin: 0 5px;
      }
    }
  }

  .music-info {
    width: 25rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 890px) {
      width: 100vw;
      justify-content: center;
    }

    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }

    div {
      display: flex;
      flex-direction: column;
    }
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;

    .time {
      color: var(--info);
    }
  }

  .buttons {
    display: flex;
    gap: 0.5rem;

    button {
      font-size: 1.25rem;

      &.isActive {
        color: var(--info);
      }
    }
  }
`;

export default ContainerPlayer;
