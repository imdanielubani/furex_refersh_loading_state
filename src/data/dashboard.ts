import type { Promo } from '@/components/home/PromoBanner';
import { images } from '@/constants/assets';

// Placeholder data until the dashboard is backed by the API.

export const currentUser = {
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
