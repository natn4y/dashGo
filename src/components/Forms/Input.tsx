import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput, // importa o componente chakraInput para ser usado no componente Input
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import {
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name}>{label}</FormLabel>
      )}

      <ChakraInput
        id={name}
        name={name}
        type={rest.type}
        focusBorderColor="pink.500"
        bg="gray.900"
        _hover={{ bg: "gray.900" }}
        variant="filled"
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
