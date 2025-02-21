import { useState } from "react";
import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { useAuthStore } from "../stores/authStore";
import { Button, Input, Text } from "@isabelajs/design-system";
import { RegisterContainer } from "./Register.styles";
import { TypeRegisterForm } from "../interfaces/register.type";

function Register() {
  const [error, setError] = useState("");

  const register = useAuthStore((state) => state.register);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: TypeRegisterForm) => {
    console.log(data);
    try {
      await register(data.name, data.email, data.password);
    } catch (error: any) {
      setError(error.message);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <Text
              color="primary"
              fontWeight="bold"
              text="Nombre"
              type="body1"
            />
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Nombre es requerido",
                minLength: {
                  value: 2,
                  message: "Nombre debe tener al menos 2 caracteres",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Name"
                  isValid={!errors.name && field.value !== ""}
                  error={errors.name?.message || ""}
                />
              )}
            />
          </div>
          <div className="input-container">
            <Text
              color="primary"
              fontWeight="bold"
              text="Correo electrónico"
              type="body1"
            />
            <Controller
              control={control}
              name="email"
              rules={{ required: "Correo electrónico es requerido", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Correo electrónico inválido" } }}
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
          </div>
          <div className="input-container">
            <Text
              color="primary"
              fontWeight="bold"
              text="Contraseña"
              type="body1"
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: "Contraseña es requerida" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Contraseña"
                  isValid={!errors.password && field.value !== ""}
                  error={errors.password?.message || ""}
                />
              )}
            />
          </div>
          <div className="info">
            <Text
              color="primary"
              fontWeight="regular"
              text="Al hacer clic en 'Continuar' doy mi consentimiento para recopilar, procesar y almacenar mi información de acuerdo a la "
              type="body2"
              customStyles={{
                fontSize: "12px",
                lineHeight: "1.2",
                display: "inline",
              }}
            />
            <Link to="/privacy-policy">
              <Text
                color="secondary"
                fontWeight="regular"
                text="Política de privacidad"
                type="body2"
                customStyles={{
                  fontSize: "12px",
                  lineHeight: "1.2",
                  display: "inline",
                }}
              />
            </Link>
            <Text
              color="primary"
              fontWeight="regular"
              text=", y las "
              type="body2"
              customStyles={{
                fontSize: "12px",
                lineHeight: "1.2",
                display: "inline",
              }}
            />
            <Link to="/terms-and-conditions">
              <Text
                color="secondary"
                fontWeight="regular"
                text="Condiciones legales"
                type="body2"
                customStyles={{
                  fontSize: "12px",
                  lineHeight: "1.2",
                  display: "inline",
                }}
              />
            </Link>
            <Text
              color="primary"
              fontWeight="regular"
              text="."
              type="body2"
              customStyles={{
                fontSize: "12px",
                lineHeight: "1.2",
                display: "inline",
              }}
            />
          </div>
          {error && isValid && <Text color="error" text={error} type="body1" />}
          <Button
            text="Continuar"
            type="submit"
            variant="primary"
            size="large"
            disabled={!isValid}
          />
        </form>
      </div>
    </RegisterContainer>
  );
}

export default Register;
