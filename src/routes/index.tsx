import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useProducts, productsQueryOptions } from '../hooks/useProducts';
import { Layout } from '../components/ui/Layout';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { ProductGridSkeleton } from '../components/ui/Skeleton';

const IndexPage = () => {
  const { data } = useProducts();

  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <h1>Featured Products</h1>

        <ErrorBoundary
          fallback={(error, reset) => (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>Error loading products: {error.message}</p>
              <button onClick={reset}>Try again</button>
            </div>
          )}
        >
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid>
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </Suspense>
        </ErrorBoundary>
      </Layout.Main>
    </Layout>
  );
};

export const Route = createFileRoute('/')({
  component: IndexPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsQueryOptions()),
});
