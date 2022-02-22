import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const SignIn: NextPage = () => {
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
      >
        <Stack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>

            <Input
              id="email"
              name="email"
              type="email"
              focusBorderColor="pink.500"
              bg="gray.900"
              _hover={{ bg: "gray.900" }}
              variant="filled"
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>

            <Input
              id="password"
              name="password"
              type="password"
              focusBorderColor="pink.500"
              bg="gray.900"
              _hover={{ bg: "gray.900" }}
              variant="filled"
              size="lg"
            />
          </FormControl>
        </Stack>

        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignIn;
