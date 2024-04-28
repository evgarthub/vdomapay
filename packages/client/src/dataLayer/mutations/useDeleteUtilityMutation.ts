import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { utilitiesService } from "../client/UtilitiesService";

export const useDeleteUtilityMutation = (
  mutationProps?: Omit<UseMutationOptions<void, unknown, string>, "mutationFn">
) => {
  return useMutation({
    ...mutationProps,
    mutationFn: async (id: string) => await utilitiesService.delete(id),
  });
};
