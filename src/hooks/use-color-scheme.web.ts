import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Static web rendering happens without a browser, so the first client render
 * must match the server output ('light') and re-resolve after hydration.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();
  return hasHydrated ? colorScheme : 'light';
}
