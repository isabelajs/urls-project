import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { Button, Input } from "@isabelajs/design-system";
import { RegisterContainer } from "./Register.styles";
import { Text } from "@isabelajs/design-system";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      console.log("name", name);
      console.log("email", email);
      console.log("password", password);
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed");
    }
  };

  return (
    <RegisterContainer>
      <Button
        text="Iniciar sesión"
        variant="outline"
        customStyles={{ alignSelf: "flex-end" }}
        onClick={() => (window.location.href = "/login")}
      />
      <div className="register-container">
        <Text color="primary" fontWeight="bold" text="Registrarse" type="h1" />
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <Text
              color="primary"
              fontWeight="bold"
              text="Nombre"
              type="body1"
            />
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
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
          </div>
          <div className="input-container">
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
          </div>
          <div className="info">
            <Text
              color="primary"
              fontWeight="regular"
              text="Al hacer clic en 'Continuar' doy mi consentimiento para recopilar, procesar y almacenar mi información de acuerdo a la "
              type="body2"
              customStyles={{ fontSize: "12px", lineHeight: "1.2", display: "inline" }}
            />
            <Link to="/privacy-policy">
              <Text
                color="secondary"
                fontWeight="regular"
                text="Política de privacidad"
                type="body2"
                customStyles={{ fontSize: "12px", lineHeight: "1.2", display: "inline" }}
              />
            </Link>
            <Text
              color="primary"
              fontWeight="regular"
              text=", y las "
              type="body2"
              customStyles={{ fontSize: "12px", lineHeight: "1.2", display: "inline" }}
            />
            <Link to="/terms-and-conditions">
              <Text
                color="secondary"
                fontWeight="regular"
                text="Condiciones legales"
                type="body2"
                customStyles={{ fontSize: "12px", lineHeight: "1.2", display: "inline" }}
              />
            </Link>
            <Text
              color="primary"
              fontWeight="regular"
              text="."
              type="body2"
              customStyles={{ fontSize: "12px", lineHeight: "1.2", display: "inline" }}
            />
          </div>
          <Button
            text="Continuar"
            type="submit"
            variant="primary"
            size="large"
          />
        </form>
      </div>
    </RegisterContainer>
  );
}

export default Register;
