import { useEffect, useRef, KeyboardEvent } from 'react';

interface UseKeyboardNavigationOptions {
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: (event: KeyboardEvent) => void;
  onSpace?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  onEnter,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
  onSpace,
  enabled = true,
}: UseKeyboardNavigationOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          onEnter?.();
          break;
        case 'Escape':
          event.preventDefault();
          onEscape?.();
          break;
        case 'ArrowUp':
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onArrowRight?.();
          break;
        case 'Tab':
          onTab?.(event);
          break;
        case ' ':
          event.preventDefault();
          onSpace?.();
          break;
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown as any);
      return () => {
        element.removeEventListener('keydown', handleKeyDown as any);
      };
    }
  }, [enabled, onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab, onSpace]);

  return elementRef;
} 