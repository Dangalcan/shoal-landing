import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Design tokens, one palette per color scheme. Neutrals come from the
 * desktop app's variables.scss; the accent is the teal of the app icon
 * (#0F766E in light mode keeps 4.5:1 contrast on white). Components read
 * them through useTheme().
 */
export interface Theme {
  bg: string;
  card: string;
  ink: string;
  ink2: string;
  ink3: string;
  ink4: string;
  border: string;
  primary: string;
  primarySoft: string;
  success: string;
  warn: string;
  warnSoft: string;
  dark: boolean;
}

const light: Theme = {
  bg: '#ffffff',
  card: '#ffffff',
  ink: '#0f172a',
  ink2: '#334155',
  ink3: '#64748b',
  ink4: '#94a3b8',
  border: '#e2e8f0',
  primary: '#0f766e',
  primarySoft: '#f0fdfa',
  success: '#16a34a',
  warn: '#b45309',
  warnSoft: '#fffbeb',
  dark: false,
};

const dark: Theme = {
  bg: '#0b1220',
  card: '#101a2e',
  ink: '#f1f5f9',
  ink2: '#cbd5e1',
  ink3: '#94a3b8',
  ink4: '#64748b',
  border: '#1e293b',
  primary: '#2dd4bf',
  primarySoft: 'rgba(45,212,191,0.14)',
  success: '#4ade80',
  warn: '#fcd34d',
  warnSoft: 'rgba(252,211,77,0.12)',
  dark: true,
};

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light;
}
