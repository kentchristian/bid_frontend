
import { useQuery } from '@tanstack/react-query';
import { useMiddleware } from '../../middleware/MiddlewareProvider';
import { getCookie } from '../utils/getCookie';


export const useAuthQuery = <T>(key: string, fetcher: () => Promise<T>) => {
  const { isAuthenticated } = useMiddleware();
  const csrftoken = getCookie('csrftoken');

  return useQuery<T>({
    queryKey: [csrftoken, key],
    queryFn: fetcher,
    enabled: !!isAuthenticated,
  })
}