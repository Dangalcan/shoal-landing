import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Design tokens lifted from the desktop app's variables.scss, one palette
 * per color scheme. Components read them through useTheme().
 */
export interface Theme {
  bg: string;
  bgMuted: string;
  bgTint: string;
  card: string;
  ink: string;
  ink2: string;
  ink3: string;
  ink4: string;
  border: string;
  primary: string;
  primarySoft: string;
  success: string;
  successSoft: string;
  warn: string;
  sidebar: string;
  sidebarText: string;
  dark: boolean;
}

const light: Theme = {
  bg: '#ffffff',
  bgMuted: '#f8fafc',
  bgTint: '#f1f5f9',
  card: '#ffffff',
  ink: '#0f172a',
  ink2: '#334155',
  ink3: '#64748b',
  ink4: '#94a3b8',
  border: '#e2e8f0',
  primary: '#2563eb',
  primarySoft: '#eff6ff',
  success: '#16a34a',
  successSoft: '#dcfce7',
  warn: '#d97706',
  sidebar: '#1e293b',
  sidebarText: '#f1f5f9',
  dark: false,
};

const dark: Theme = {
  bg: '#0b1220',
  bgMuted: '#0f172a',
  bgTint: '#1e293b',
  card: '#101a2e',
  ink: '#f1f5f9',
  ink2: '#cbd5e1',
  ink3: '#94a3b8',
  ink4: '#64748b',
  border: '#1e293b',
  primary: '#3b82f6',
  primarySoft: 'rgba(59,130,246,0.14)',
  success: '#4ade80',
  successSoft: 'rgba(34,197,94,0.16)',
  warn: '#fbbf24',
  sidebar: '#1e293b',
  sidebarText: '#f1f5f9',
  dark: true,
};

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light;
}
