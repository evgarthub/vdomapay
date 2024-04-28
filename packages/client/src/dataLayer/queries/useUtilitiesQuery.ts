import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { utilitiesService } from "../client/UtilitiesService";
import { Utility } from "@vdomapay/types";

export const utilitiesQueryKey = ["utilities"] as const;

export const useUtilitiesQuery = (
  quryProps?: Omit<UseQueryOptions<Utility[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Utility[]>({
    ...quryProps,
    queryKey: utilitiesQueryKey,
    queryFn: async () => await utilitiesService.getAll(),
  });
};
