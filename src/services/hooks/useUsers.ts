import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponseProps = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponseProps> {
  const { data, headers } = await api.get<{users: []}>("users", {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const users: User[] = data.users.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(
        user.createdAt
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    users,
    totalCount
  };
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 5,
  });
}
