import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { InputContainer, LoginContainer, LoginForm } from "./Login.styles";
import { Button, Input, Text } from "@isabelajs/design-system";
import { useForm, Controller } from "react-hook-form";
import { TypeloginForm } from "../interfaces/login.type";
import { useNavigate } from "react-router";

function Login() {
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TypeloginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });


  const onSubmit = async (data: TypeloginForm) => {
    console.log(data);
    try {
      await login(data.email, data.password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <LoginContainer>
      <Button
        text="Crear cuenta"
        variant="outline"
        customStyles={{ alignSelf: "flex-end" }}
        onClick={() => navigate("/register")}
      />
      <LoginForm>
        <Text
          color="primary"
          fontWeight="bold"
          text="Iniciar sesión"
          type="h1"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Text
              color="primary"
              fontWeight="bold"
              text="Correo electrónico"
              type="body1"
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Correo electrónico es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Correo electrónico"
                  isValid={!errors.email && field.value !== ""}
                  error={errors.email?.message || ""}
                />
              )}
            />
          </InputContainer>
          <InputContainer>
            <Text
              color="primary"
              fontWeight="bold"
              text="Contraseña"
              type="body1"
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  error={
                    errors.password?.type === "required"
                      ? "Contraseña es requerida"
                      : ""
                  }
                  placeholder="Contraseña"
                />
              )}
            />
          </InputContainer>
          {error && isValid && <Text color="error" text={error} type="body1" />}
          <Button
            text="Continuar"
            type="submit"
            variant="primary"
            size="large"
            disabled={!isValid}
          />
        </form>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
