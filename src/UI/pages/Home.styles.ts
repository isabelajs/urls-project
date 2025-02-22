import { styled } from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px 0px;

`;

export const URLContainer = styled.div`
  display: flex;
  margin-top: 8rem;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 3rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;


export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 850px;
    flex-wrap: no-wrap;
    margin: 2rem auto;
    padding: 0 24px;
  }

`;