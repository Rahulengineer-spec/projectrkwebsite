// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if contrast meets WCAG guidelines
export function meetsContrastGuidelines(
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const ratio = getContrastRatio(l1, l2);

  if (level === 'AA') {
    return size === 'normal' ? ratio >= 4.5 : ratio >= 3;
  } else {
    return size === 'normal' ? ratio >= 7 : ratio >= 4.5;
  }
}

// Find accessible text color for a background
export function getAccessibleTextColor(
  backgroundColor: string,
  options: {
    level?: 'AA' | 'AAA';
    size?: 'normal' | 'large';
    lightColor?: string;
    darkColor?: string;
  } = {}
): string {
  const {
    level = 'AA',
    size = 'normal',
    lightColor = '#ffffff',
    darkColor = '#000000',
  } = options;

  const rgb = hexToRgb(backgroundColor);
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);

  // Check contrast with both light and dark text
  const lightContrast = getContrastRatio(
    getLuminance(...Object.values(hexToRgb(lightColor))),
    luminance
  );
  const darkContrast = getContrastRatio(
    getLuminance(...Object.values(hexToRgb(darkColor))),
    luminance
  );

  // Determine minimum required contrast
  const minContrast = level === 'AA' ? (size === 'normal' ? 4.5 : 3) : size === 'normal' ? 7 : 4.5;

  // Return the color with better contrast
  return lightContrast >= minContrast && lightContrast > darkContrast
    ? lightColor
    : darkColor;
}

// Generate accessible color palette
export function generateAccessiblePalette(
  baseColor: string,
  options: {
    level?: 'AA' | 'AAA';
    size?: 'normal' | 'large';
    steps?: number;
  } = {}
): string[] {
  const { level = 'AA', size = 'normal', steps = 5 } = options;
  const rgb = hexToRgb(baseColor);
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);

  const palette: string[] = [];
  const step = 1 / (steps - 1);

  for (let i = 0; i < steps; i++) {
    const factor = 1 - i * step;
    const newRgb = {
      r: Math.round(rgb.r * factor),
      g: Math.round(rgb.g * factor),
      b: Math.round(rgb.b * factor),
    };

    const hex = `#${[newRgb.r, newRgb.g, newRgb.b]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')}`;

    palette.push(hex);
  }

  return palette;
} 