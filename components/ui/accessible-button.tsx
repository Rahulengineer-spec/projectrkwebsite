'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  description?: string;
  pressed?: boolean;
  expanded?: boolean;
  controls?: string;
  hasPopup?: boolean;
  current?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      label,
      description,
      pressed,
      expanded,
      controls,
      hasPopup,
      current,
      disabled,
      loading,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const buttonRef = useKeyboardNavigation({
      onEnter: () => {
        if (!disabled && !loading) {
          props.onClick?.(new MouseEvent('click') as any);
        }
      },
      onSpace: () => {
        if (!disabled && !loading) {
          props.onClick?.(new MouseEvent('click') as any);
        }
      },
    });

    return (
      <button
        ref={buttonRef}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        aria-label={label}
        aria-description={description}
        aria-pressed={pressed}
        aria-expanded={expanded}
        aria-controls={controls}
        aria-haspopup={hasPopup}
        aria-current={current}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin" role="status" aria-label="Loading">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : null}
        {children}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton'; 