// Every vector is rendered at its intrinsic size, so each entry carries the
// width and height from the SVG root alongside its source.
export type SizedAsset = {
  source: number;
  width: number;
  height: number;
};

export const icons = {
  bellRinging: { source: require('../../assets/icons/bell-ringing.svg'), width: 24, height: 24 },
  gift: { source: require('../../assets/icons/gift.svg'), width: 24, height: 24 },
  messageCircleDots: { source: require('../../assets/icons/message-circle-dots.svg'), width: 24, height: 24 },
  verified: { source: require('../../assets/icons/verified.svg'), width: 15, height: 14.9795 },
  eyeAlt: { source: require('../../assets/icons/eye-alt.svg'), width: 20, height: 20 },
  flagNg: { source: require('../../assets/icons/flag-ng.svg'), width: 12.3881, height: 12.3881 },
  arrowDown: { source: require('../../assets/icons/arrow-down-01.svg'), width: 11.5624, height: 6.60698 },
  arrowRight: { source: require('../../assets/icons/arrow-right-01.svg'), width: 7.50001, height: 13.5 },
  arrowCircleDownLeft: { source: require('../../assets/icons/arrow-circle-down-left.svg'), width: 24, height: 24 },
  arrowCircleDownRight: { source: require('../../assets/icons/arrow-circle-down-right.svg'), width: 24, height: 24 },
  refreshCcw: { source: require('../../assets/icons/refresh-ccw-alt-1.svg'), width: 24, height: 24 },
  coins: { source: require('../../assets/icons/coins-01.svg'), width: 21.5002, height: 21.5 },
  giftCard: { source: require('../../assets/icons/gift-card.svg'), width: 21.5, height: 17.5 },
  invoice: { source: require('../../assets/icons/invoice-04.svg'), width: 21.5002, height: 21.5 },
  analyticsUp: { source: require('../../assets/icons/analytics-up.svg'), width: 20.5, height: 20.5 },
  furexMark: { source: require('../../assets/icons/furex-mark.svg'), width: 21.5, height: 26.3777 },
  wallet: { source: require('../../assets/icons/wallet.svg'), width: 24, height: 24 },
  giftCardNav: { source: require('../../assets/icons/gift-card-nav.svg'), width: 21.5, height: 17.5 },
  creditCard: { source: require('../../assets/icons/credit-card.svg'), width: 24, height: 24 },
  circleUser: { source: require('../../assets/icons/circle-user.svg'), width: 24, height: 24 },
  refreshMark: { source: require('../../assets/icons/refresh-mark.svg'), width: 14.64, height: 17.9614 },
} as const satisfies Record<string, SizedAsset>;

export const images = {
  avatar: require('../../assets/images/avatar.png') as number,
  promoModel: require('../../assets/images/promo-model.png') as number,
  furexLogo: require('../../assets/images/furex-logo.png') as number,
  promoWatermark1: { source: require('../../assets/images/promo-watermark-1.svg'), width: 45.9817, height: 20.9269 },
  promoWatermark2: { source: require('../../assets/images/promo-watermark-2.svg'), width: 69.9804, height: 20.8309 },
  promoWatermark3: { source: require('../../assets/images/promo-watermark-3.svg'), width: 21.9829, height: 20.9269 },
  navScribble: require('../../assets/images/nav-scribble.svg') as number,
  // Gradient arc exported as a 2x raster; it has no vector form.
  refreshRing: { source: require('../../assets/images/refresh-ring.png'), width: 51.24, height: 51.24 },
} as const;
