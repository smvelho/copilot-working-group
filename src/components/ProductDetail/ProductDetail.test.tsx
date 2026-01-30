import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductDetail } from './index';
import type { Product } from '../../types/product';

// Mock data
const mockAddToCart = vi.fn();
const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product description',
  category: 'electronics',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'https://example.com/thumbnail.jpg',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
};

// Mock the hooks - useSuspenseQuery no longer returns isLoading or error
vi.mock('../../hooks/useProduct', () => ({
  useProduct: () => ({
    data: mockProduct,
  }),
}));

vi.mock('../../contexts/useCartContext', () => ({
  useCartContext: () => ({
    addToCart: mockAddToCart,
    items: [],
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    totalItems: 0,
    totalPrice: 0,
  }),
}));

// Mock Link component from TanStack Router
vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
    <a href={to} className={className}>{children}</a>
  ),
  useParams: () => ({ productId: '1' }),
}));

describe('ProductDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render core product information correctly', () => {
    // Test 1: Initial Rendering - verify core product info displays
    render(<ProductDetail />);

    // Verify title is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();

    // Verify price is displayed with correct formatting
    expect(screen.getByText('$99.99')).toBeInTheDocument();

    // Verify description is displayed
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
  });

  it('should trigger addToCart action when Add to Cart button is clicked', async () => {
    // Test 2: Add to Cart Action - verify button triggers context action
    const user = userEvent.setup();
    render(<ProductDetail />);

    // Find and click the Add to Cart button
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addToCartButton);

    // Verify addToCart was called with the correct product data
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('should render Back to Products navigation link', () => {
    // Test 3: Navigation - verify Back to Products link correctly links to root
    render(<ProductDetail />);

    // Verify the navigation link is rendered with correct href
    const backLink = screen.getByRole('link', { name: /back to products/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('should display product image with first image or fallback thumbnail', () => {
    // Test 4: Image Display - verify image rendering with fallback
    render(<ProductDetail />);

    // Verify the product image is rendered
    const productImage = screen.getByRole('img', { name: mockProduct.title });
    expect(productImage).toBeInTheDocument();

    // Verify it uses the first image from the images array
    expect(productImage).toHaveAttribute('src', mockProduct.images[0]);
  });
});
