import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { InputContainer, LoginContainer, LoginForm } from "./Login.styles";
import { Button, Input, Text } from "@isabelajs/design-system";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      console.log("email", email);
      console.log("password", password);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <LoginContainer>
      <Button
        text="Crear cuenta"
        variant="outline"
        customStyles={{ alignSelf: "flex-end" }}
        onClick={() => (window.location.href = "/register")}
      />
      <LoginForm>
        <Text
          color="primary"
          fontWeight="bold"
          text="Iniciar sesión"
          type="h1"
        />
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Text
              color="primary"
              fontWeight="bold"
              text="Correo electrónico"
              type="body1"
            />
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Text
              color="primary"
              fontWeight="bold"
              text="Contraseña"
              type="body1"
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </InputContainer>
          <Button
            text="Continuar"
            type="submit"
            variant="primary"
            size="large"
          />
        </form>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
