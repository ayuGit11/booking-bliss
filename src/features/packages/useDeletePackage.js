import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePackage as deletePackageApi } from "../../services/apiPackage";

export function useDeletePackage() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deletePackage } = useMutation({
    mutationFn: deletePackageApi,
    onSuccess: () => {
      toast.success("Package successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deletePackage };
}
