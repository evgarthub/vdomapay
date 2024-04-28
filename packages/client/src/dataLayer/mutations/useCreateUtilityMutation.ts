import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { utilitiesService } from "../client/UtilitiesService";
import { Utility, UtilityData } from "@vdomapay/types";
import { queryClient } from "../client/queryCLient";
import { utilitiesQueryKey } from "../queries/useUtilitiesQuery";

const useCreateUtilityMutation = (
  mutationProps?: Omit<
    UseMutationOptions<Utility, unknown, UtilityData>,
    "mutationFn"
  >
) => {
  const mutation = useMutation<Utility, unknown, UtilityData>({
    ...mutationProps,
    mutationFn: async (utility: UtilityData) =>
      await utilitiesService.create(utility),
    onSuccess: (...props) => {
      queryClient.invalidateQueries({ queryKey: utilitiesQueryKey });

      mutationProps?.onSuccess?.(...props);
    },
  });

  return mutation;
};

export default useCreateUtilityMutation;
