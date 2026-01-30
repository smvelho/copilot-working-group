import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { productService } from '../services';

export const productQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
  });

export const useProduct = () => {
  const { productId } = useParams({ from: '/products/$productId' });
  const id = Number(productId);

  return useSuspenseQuery(productQueryOptions(id));
};
