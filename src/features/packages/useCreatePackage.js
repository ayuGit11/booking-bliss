import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditPackage } from "../../services/apiPackage";
export function useCreatePackage() {
  const queryClient = useQueryClient();
  const { mutate: createPackage, isLoading: isCreating } = useMutation({
    mutationFn: createEditPackage,
    onSuccess: () => {
      toast.success("New pakage successfully created");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createPackage };
}
