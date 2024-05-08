import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditPackage } from "../../services/apiPackage";
export function useEditPackage() {
  const queryClient = useQueryClient();
  const { mutate: editPackage, isLoading: isEditing } = useMutation({
    mutationFn: ({ newPackageData, id }) =>
      createEditPackage(newPackageData, id),
    onSuccess: () => {
      toast.success("Package successfully edited");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editPackage };
}
