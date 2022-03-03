import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { IoMdRefresh } from 'react-icons/io'

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from '../../components/Sidebar';
import { useUsers } from "../../services/hooks/useUsers";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useUsers(page);

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
              {data?.users.map((user) => {
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
          <Pagination
            totalCountOfRegisters={Number(data?.totalCount)}
            currentPage={page}
            onPageChange={setPage}
          />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}