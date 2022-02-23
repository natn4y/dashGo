import { HStack, Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: Boolean,
  number: number,
}

export function PaginationItem({ isCurrent = false, number }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <HStack spacing="2">
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="pink"
          disabled
          _disabled={{
            bgColor: "pink.500",
            cursor: "default",
          }}
        >
          {number}
        </Button>
      </HStack>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
    >
      {number}
    </Button>
  );
}