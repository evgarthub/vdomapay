import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { utilitiesService } from '../client/UtilitiesService';
import { queryClient } from '../client/queryClient';
import { utilitiesQueryKey } from '../queries/useUtilitiesQuery';

export const useDeleteUtilityMutation = (
    mutationProps?: Omit<UseMutationOptions<void, unknown, string>, 'mutationFn'>,
) => {
    return useMutation({
        ...mutationProps,
        mutationFn: async (id: string) => await utilitiesService.delete(id),
        onSuccess: (...props) => {
            queryClient.invalidateQueries({ queryKey: utilitiesQueryKey });

            mutationProps?.onSuccess?.(...props);
        },
    });
};
