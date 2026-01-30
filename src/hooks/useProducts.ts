import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { productService } from '../services';

export const productsQueryOptions = (limit?: number, skip?: number) =>
  queryOptions({
    queryKey: ['products', limit, skip],
    queryFn: () => productService.getProducts(limit, skip),
  });

export const useProducts = (limit?: number, skip?: number) => {
  return useSuspenseQuery(productsQueryOptions(limit, skip));
};
