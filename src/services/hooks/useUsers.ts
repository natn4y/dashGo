import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
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
      created_at: new Date(
        user.created_at
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

export function useUsers(page: number, /*options?: UseQueryOptions*/) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 5,
    // ...options as {},
  });
}
