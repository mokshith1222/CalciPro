/**
 * Standardized chart colors and styles for CalcVerse.
 * These use CSS variables to ensure automatic Dark Mode support.
 */
export const CHART_THEME = {
  colors: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    accent: "hsl(var(--accent))",
    muted: "hsl(var(--muted-foreground))",
    grid: "hsl(var(--border) / 0.5)",
    tooltip: {
      bg: "hsl(var(--popover))",
      border: "hsl(var(--border))",
      text: "hsl(var(--popover-foreground))",
    },
  },
  grid: {
    strokeDasharray: "3 3",
    vertical: false,
  },
  animationDuration: 1000,
};

export type ChartTheme = typeof CHART_THEME;