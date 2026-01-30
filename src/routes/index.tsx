import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useProducts, productsQueryOptions } from '../hooks/useProducts';
import { Layout } from '../components/ui/Layout';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { ProductGridSkeleton } from '../components/ui/Skeleton';

const ProductsContent = () => {
  const { data } = useProducts();

  return (
    <ProductGrid>
      {data.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
};

const IndexPage = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <h1>Featured Products</h1>

        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallback={(error, resetError) => (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <p>Error loading products: {error.message}</p>
                  <button
                    onClick={() => {
                      reset();
                      resetError();
                    }}
                    aria-label="Retry loading products"
                  >
                    Try again
                  </button>
                </div>
              )}
            >
              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductsContent />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Layout.Main>
    </Layout>
  );
};

export const Route = createFileRoute('/')({
  component: IndexPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsQueryOptions()),
});
