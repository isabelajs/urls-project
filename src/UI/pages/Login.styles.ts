import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


export const LoginForm = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 400px;

  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }
`;


export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;
