import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { productQueryOptions } from '../../hooks/useProduct';
import { Layout } from '../../components/ui/Layout';
import { Header } from '../../components/Header';
import { ProductDetail } from '../../components/ProductDetail';
import { ErrorBoundary } from '../../components/ui/ErrorBoundary';
import { ProductDetailSkeleton } from '../../components/ui/Skeleton';

const ProductPage = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallback={(error, resetError) => (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <p>Error loading product: {error.message}</p>
                  <button
                    onClick={() => {
                      reset();
                      resetError();
                    }}
                    aria-label="Retry loading product"
                  >
                    Try again
                  </button>
                </div>
              )}
            >
              <Suspense fallback={<ProductDetailSkeleton />}>
                <ProductDetail />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Layout.Main>
    </Layout>
  );
};

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
  loader: ({ context: { queryClient }, params: { productId } }) => {
    const id = Number(productId);
    if (isNaN(id)) {
      throw new Error('Invalid product ID');
    }
    return queryClient.ensureQueryData(productQueryOptions(id));
  },
});
