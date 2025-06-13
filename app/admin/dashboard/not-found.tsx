import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/admin/dashboard">
          Return to Dashboard
        </Link>
      </Button>
    </div>
  );
} 