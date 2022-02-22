import {
  FormControl,
  FormLabel,
  Input as ChakraInput, // importa o componente chakraInput para ser usado no componente Input
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && (
        <FormLabel htmlFor="password">Senha</FormLabel>
      )}

      <ChakraInput
        id={name}
        name={name}
        type={name}
        focusBorderColor="pink.500"
        bg="gray.900"
        _hover={{ bg: "gray.900" }}
        variant="filled"
        size="lg"
      />
    </FormControl>
  );
}
