'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useFocusManagement } from '@/hooks/use-focus-management';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';

interface AccessibleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccessibleDialog = forwardRef<HTMLDivElement, AccessibleDialogProps>(
  ({ isOpen, onClose, title, description, children, className }, ref) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const focusRef = useFocusManagement({
      trapFocus: true,
      returnFocus: true,
    });

    const keyboardRef = useKeyboardNavigation({
      onEscape: onClose,
    });

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div
        ref={dialogRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="presentation"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Dialog */}
        <div
          ref={focusRef}
          className={cn(
            'relative z-50 w-full max-w-lg rounded-lg bg-background p-6 shadow-lg',
            'focus:outline-none',
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby={description ? 'dialog-description' : undefined}
        >
          {/* Header */}
          <div className="mb-4">
            <h2
              id="dialog-title"
              className="text-lg font-semibold"
              ref={keyboardRef}
            >
              {title}
            </h2>
            {description && (
              <p id="dialog-description" className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="mt-4">{children}</div>

          {/* Close button */}
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    );
  }
);

AccessibleDialog.displayName = 'AccessibleDialog'; 