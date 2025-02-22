import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../stores/authStore";
import {
  CardsContainer,
  HomeContainer,
  MessageContainer,
  URLContainer,
} from "./Home.styles";
import { Button, Card, Input, Text } from "@isabelajs/design-system";
import { InputContainer } from "./Login.styles";
import { TypeUrl } from "../interfaces/urls.type";
import { useUrlsStore } from "../stores/urlsStore";

function Home() {
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState(false);
  const { logout, user } = useAuthStore((state) => state);
  const { addUrl, getUrls, removeUrl, urls } = useUrlsStore((state) => state);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TypeUrl>({
    defaultValues: {
      url: "",
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: TypeUrl) => {
    if (!user?.email) return;
    try {
      await addUrl(user?.email, data);
      setError("");
      setSucess(true);
      reset();
    } catch (error: any) {
      setError(error.message);
      setSucess(false);
    }
  };

  useEffect(() => {
    if (error || sucess) {
      setTimeout(() => {
        setError("");
        setSucess(false);
      }, 1500);
    }
  }, [error, sucess]);

  useEffect(() => {
    const fetchUrls = async () => {
      if (!user?.email) return;
      await getUrls(user?.email);
    };
    fetchUrls();
  }, []);

  return (
    <>
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
                    value: /^(https?:\/\/|www\.)[^\s]+$/,
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

        <MessageContainer>
          {sucess && (
            <Text
              color="success"
              text="URL guardada correctamente"
              type="body1"
            />
          )}
          {error && <Text color="error" text={error} type="body1" />}
        </MessageContainer>
      </HomeContainer>
      <CardsContainer>
        {urls.map((url) => (
          <Card
            key={url.url}
            title={url.url}
            description={url.name}
            icon="RiDeleteBinLine"
            customStylesIcon={{
              color: "#F17474",
              fontSize: "1rem",
            }}
            onAction={() => {
              if (!user?.email) return;
              removeUrl(user?.email, url.name);
            }}
          />
        ))}
      </CardsContainer>
    </>
  );
}

export default Home;
