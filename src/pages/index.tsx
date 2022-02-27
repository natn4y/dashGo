import { Button, Flex, Stack } from "@chakra-ui/react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../components/Forms/Input";

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm( { resolver: yupResolver(signInFormSchema) } );
  const handleSignIn: SubmitHandler<FieldValues> = async (
    values,
    event
  ) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW="360px"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            error={errors.email}
            {...register("email")}
          />
          <Input
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
