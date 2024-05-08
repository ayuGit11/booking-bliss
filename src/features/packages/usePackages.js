import { useQuery } from "@tanstack/react-query";
import { getPackages } from "../../services/apiPackage";

export function usePackages() {
  const {
    isLoading,
    data: packages,
    error,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  });
  return { isLoading, error, packages };
}
