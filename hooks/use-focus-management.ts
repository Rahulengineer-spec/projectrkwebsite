import { useEffect, useRef } from 'react';

interface UseFocusManagementOptions {
  trapFocus?: boolean;
  returnFocus?: boolean;
  initialFocus?: HTMLElement | null;
  onFocusChange?: (focused: boolean) => void;
}

export function useFocusManagement({
  trapFocus = false,
  returnFocus = false,
  initialFocus = null,
  onFocusChange,
}: UseFocusManagementOptions = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Store the previously focused element
    if (returnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    // Set initial focus
    if (initialFocus) {
      initialFocus.focus();
    } else if (firstFocusable) {
      firstFocusable.focus();
    }

    const handleFocusChange = () => {
      const isFocused = container.contains(document.activeElement);
      onFocusChange?.(isFocused);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!trapFocus) return;

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    container.addEventListener('focusin', handleFocusChange);
    container.addEventListener('focusout', handleFocusChange);
    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('focusin', handleFocusChange);
      container.removeEventListener('focusout', handleFocusChange);
      container.removeEventListener('keydown', handleKeyDown);

      // Restore focus when unmounting
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [trapFocus, returnFocus, initialFocus, onFocusChange]);

  return containerRef;
} 