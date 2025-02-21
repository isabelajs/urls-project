import styled from "styled-components";

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .register-container {
    display: flex;
    flex-direction: column;
    margin-top: 8rem;
    gap: 3rem;
    width: 100%;
    max-width: 400px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
  }

  .info {
    display: inline;
    text-align: left;
    margin: 1rem 0;

    a {
      display: inline;
    }

    p {
      display: inline;
    }
  }

  .error {
    color: red;
    margin-top: 10px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  a:-webkit-any-link {
    text-decoration: none;
  }
`;
