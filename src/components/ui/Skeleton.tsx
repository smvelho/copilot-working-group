import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  className?: string;
  style?: CSSProperties;
}

export const Skeleton = ({
  width,
  height,
  variant = 'text',
  className,
  style: customStyle,
}: SkeletonProps) => {
  const style: CSSProperties = {
    ...customStyle,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const classes = [
    styles.skeleton,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} style={style} />;
};

// Product Grid Skeleton Layout
export const ProductGridSkeleton = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Skeleton width="200px" height="32px" style={{ marginBottom: '24px' }} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Skeleton variant="rectangular" width="100%" height="200px" />
            <Skeleton width="80%" height="24px" />
            <Skeleton width="40%" height="20px" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Product Detail Skeleton Layout
export const ProductDetailSkeleton = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Skeleton width="150px" height="20px" style={{ marginBottom: '24px' }} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '40px',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="400px" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Skeleton width="80%" height="32px" />
          <Skeleton width="40%" height="28px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton variant="rectangular" width="100%" height="48px" />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton width="60%" height="16px" />
            <Skeleton width="80%" height="20px" />
          </div>
        ))}
      </div>
    </div>
  );
};
