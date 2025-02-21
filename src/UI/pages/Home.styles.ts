import { styled } from "styled-components";


export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const URLContainer = styled.div`
  display: flex;
  margin-top: 8rem;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 3rem;

  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }
`;
