import { useRouter } from 'next/router';

export default function BlogPostPage() {
  // In Next.js App Router, params are passed as props, but for placeholder, just show a message
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <h1 className="text-2xl font-bold mb-2">Blog Post</h1>
      <p className="text-muted-foreground">This blog post page is under construction or missing content.</p>
    </div>
  );
} 