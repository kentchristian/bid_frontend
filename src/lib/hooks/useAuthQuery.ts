
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useMiddleware } from '../../middleware/MiddlewareProvider';
import { getCookie } from '../utils/getCookie';

export const useAuthQuery = <T>(
  // Accept string OR array
  key: string | any[], 
  fetcher: () => Promise<T>, 
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) => {
  const { isAuthenticated } = useMiddleware();
  const csrftoken = getCookie('csrftoken');

  return useQuery<T>({
    ...options,
    // If it's an array, spread it; if it's a string, just wrap it
    queryKey: Array.isArray(key) ? [csrftoken, ...key] : [csrftoken, key],
    queryFn: fetcher,
    enabled: !!isAuthenticated && (options?.enabled !== false),
  });
};