import React from 'react';
import { cn } from '@/lib/utils';

const LoadingSkeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
};

export { LoadingSkeleton };