import { useCallback, useState } from 'react';

import { fetchDashboard, initialDashboard, type Dashboard } from '@/data/dashboard';

/** Dashboard data plus a refresh that resolves once the new data is on screen. */
export function useDashboard() {
  const [dashboard, setDashboard] = useState<Dashboard>(initialDashboard);

  const refresh = useCallback(async () => {
    setDashboard(await fetchDashboard());
  }, []);

  return { dashboard, refresh };
}
