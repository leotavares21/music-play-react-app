import styled from "styled-components";

const Container = styled.section`
  padding-bottom: 5rem;

  @media (max-width: 890px) {
    padding-bottom: 11.5rem;
  }
  
  ul {
    .scroller {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      @media (max-width: 835px) {
        flex-direction: column;
      }
    }

    li {
      width: 50%;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      @media (max-width: 835px) {
        width: 100%;
        margin-bottom: 3rem;
      }

      @media (max-width: 410px) {
        flex-direction: column;
      }

      h2 {
        font-size: 1.5rem;

        @media (max-width: 410px) {
          font-size: 1.25rem;
        }
      }

      img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;

        @media (max-width: 767px) {
          width: 6rem;
          height: 6rem;
        }
      }

      .song-info {
        @media (max-width: 410px) {
          text-align: center;
        }
        strong {
          margin-right: 1rem;
        }
      }

      .buttons {
        display: flex;
        align-items: center;

        gap: 1rem;
        margin-top: 1rem;

        @media (max-width: 410px) {
          justify-content: center;
        }

        a {
          border-radius: 0.5rem;

          padding: 0.5rem;
          color: var(--dark);
          border: 1px solid var(--dark);

          &:hover {
            background: var(--info);
            color: var(--light);
          }
        }

        button {
          border-radius: 0.5rem;

          display: flex;
          align-items: center;

          transition: all 0.2s;
          background: transparent;

          &:nth-of-type(1),
          &:nth-of-type(2) {
            color: var(--primary);

            font-size: 2rem;

            &:hover {
              filter: brightness(0.85);
            }
          }

          &:nth-of-type(2) {
            &.isIncluded {
              color: var(--info);
            }
          }
        }
      }
    }
  }
`;

export default Container;
