import type { Promo } from '@/components/home/PromoBanner';
import { images } from '@/constants/assets';

// Placeholder data until the dashboard is backed by the API.

export type DashboardUser = {
  name: string;
  avatar: number;
  verified: boolean;
};

export type Dashboard = {
  user: DashboardUser;
  balance: number;
  promos: Promo[];
};

export const currentUser: DashboardUser = {
  name: 'Jubril Babatunde',
  avatar: images.avatar,
  verified: true,
};

export const walletBalance = 24234.65;

export const promos: Promo[] = Array.from({ length: 5 }, (_, index) => ({
  id: `crypto-liquidity-${index + 1}`,
  title: 'Low on cash but ',
  highlight: 'high on crypto?',
  subtitle: 'Your favourite crypto liquidity infrastructure.',
  image: images.promoModel,
}));

export const initialDashboard: Dashboard = {
  user: currentUser,
  balance: walletBalance,
  promos,
};

const SIMULATED_LATENCY_MS = 1200;

/** Stands in for the dashboard request; resolves with the same data after a network-like delay. */
export async function fetchDashboard(): Promise<Dashboard> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  return initialDashboard;
}
