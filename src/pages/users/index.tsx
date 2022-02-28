import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { IoMdRefresh } from 'react-icons/io'
import { useQuery } from 'react-query';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export default function UserList() {
  const { data, isLoading, isFetching, error, refetch } = useQuery('users', async () => {
    const { data } = await api.get('users');

    const users = data.users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      }
    })

    return users;
  }, {
    staleTime: 1000 * 5,
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const [showTableContent, setShowTableContent] = useState(false);

  useEffect(() => {
    if (isWideVersion) {
      setShowTableContent(true);
    } else {
      setShowTableContent(false);
    }
  }, [isWideVersion]);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" justifyContent="center">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex
            mb="8"
            justify="start"
            align="center"
          >
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Button
              onClick={() => refetch()}
              isLoading={!isLoading && isFetching}
              size="sm"
              fontSize="sm"
              marginLeft="auto"
              marginRight="2"
              colorScheme="twitter"
              leftIcon={<Icon as={IoMdRefresh} fontSize="20" position="absolute" inset="0" m="auto"/>}
            >
            </Button>
            <Link href="/users/create" passHref>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
            >
              Criar novo
            </Button>
            </Link>
          </Flex>
          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" w="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                { showTableContent && <Th>Data de cadastro</Th> }
                { showTableContent && <Th w="8">Editar</Th> }
              </Tr>
            </Thead>
            <Tbody>
              {data.map((user: User) => {
                return(
                  <Tr key={user.id}>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">
                      { user.name }
                    </Text>
                    <Text fontSize="sm" color="gray.300">
                      { user.email }
                    </Text>
                  </Box>
                </Td>
                {showTableContent && <Td>{ user.createdAt }</Td>}
                {showTableContent && <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                  >
                    Editar
                  </Button>
                </Td> }
              </Tr>
                )
              })}
            </Tbody>
          </Table>
          <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}