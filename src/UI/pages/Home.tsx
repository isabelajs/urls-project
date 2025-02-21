import { useAuthStore } from "../stores/authStore";
import { HomeContainer, URLContainer } from "./Home.styles";
import { Button, Input, Text } from "@isabelajs/design-system";
import { InputContainer } from "./Login.styles";
import { Controller, useForm } from "react-hook-form";
import { TypeUrl } from "../interfaces/urls.type";

function Home() {
  const logout = useAuthStore((state) => state.logout);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TypeUrl>({
    defaultValues: {
      url: "",
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: TypeUrl) => {
    console.log(data);
  };

  return (
    <HomeContainer>
      <Button
        text="Salir"
        variant="outline"
        onClick={logout}
        customStyles={{ alignSelf: "flex-end" }}
      />
      <URLContainer>
        <Text color="primary" fontWeight="bold" text="Urls" type="h1" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Text
              color="primary"
              fontWeight="bold"
              text="URL para salvar"
              type="body1"
            />
            <Controller
              control={control}
              name="url"
              rules={{
                required: "URL es requerida",
                pattern: {
                  value: /^https?:\/\/[^\s]+$/,
                  message: "URL inválida",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="URL"
                  isValid={!errors.url && field.value !== ""}
                  error={errors.url?.message || ""}
                />
              )}
            />
          </InputContainer>
          <InputContainer>
            <Text
              color="primary"
              fontWeight="bold"
              text="Nombre de URL"
              type="body1"
            />
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Nombre de URL es requerido",
                minLength: {
                  value: 3,
                  message: "Nombre de URL debe tener al menos 3 caracteres",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Nombre de URL"
                  isValid={!errors.name && field.value !== ""}
                  error={errors.name?.message || ""}
                />
              )}
            />
          </InputContainer>
          <Button
            text="Guardar"
            type="submit"
            variant="primary"
            size="large"
            disabled={!isValid}
          />
        </form>
      </URLContainer>
    </HomeContainer>
  );
}

export default Home;
