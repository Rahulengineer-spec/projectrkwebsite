'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <AlertCircle className="h-10 w-10 text-red-500" />
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground">
        {error.message || 'An error occurred while loading this page.'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
} 