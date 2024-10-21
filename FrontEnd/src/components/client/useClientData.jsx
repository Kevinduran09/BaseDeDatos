import { useQuery } from "@tanstack/react-query";
import { getClient } from "../../services/ClientService";

const useClientData = (id) => {
  let cliente;

  if (id !== ":id") {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["cliente", id],
      queryFn: () => getClient(id),
      gcTime: 1 * 60 * 1000,
    });

    cliente = data;
    return { cliente, isLoading, isError };
  }

  return { cliente: null, isLoading: false, isError: false };
};

export default useClientData;
