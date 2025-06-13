import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with proper separators
 */
export function formatNumber(num: number) {
  return new Intl.NumberFormat().format(num);
}

/**
 * Generate a shimmer effect SVG for image loading
 */
export function shimmer(w: number, h: number) {
  const svg = `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
    </svg>
  `.trim();
  return svg;
}

/**
 * Convert a string to base64
 */
export function toBase64(str: string) {
  if (typeof window === 'undefined') {
    return Buffer.from(str).toString('base64');
  }
  return window.btoa(str);
}

/**
 * Get initials from a name
 */
export function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Create a debounced version of a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate a unique ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Generate metadata for SEO
 */
export function generateMetadata(title: string, description: string, image?: string) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

/**
 * Create a simple cache with timestamp-based expiration
 */
export function createCache<T>(maxSize = 100) {
  const cache = new Map<string, { value: T; timestamp: number }>();

  return {
    get(key: string) {
      const item = cache.get(key);
      if (!item) return undefined;
      item.timestamp = Date.now();
      return item.value;
    },
    set(key: string, value: T) {
      if (cache.size >= maxSize) {
        let oldest = Date.now();
        let oldestKey = "";
        cache.forEach((item, k) => {
          if (item.timestamp < oldest) {
            oldest = item.timestamp;
            oldestKey = k;
          }
        });
        cache.delete(oldestKey);
      }
      cache.set(key, { value, timestamp: Date.now() });
    },
    clear() {
      cache.clear();
    },
  };
} 