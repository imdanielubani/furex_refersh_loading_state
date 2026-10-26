import type { TextStyle } from 'react-native';

export const colors = {
  background: '#f5f5f5',
  headerBackground: '#f8f9fb',
  surface: '#fcfcfc',
  white: '#ffffff',
  black: '#000000',

  textPrimary: '#171717',
  textSlate: '#0f172a',
  labelPrimary: '#111827',
  labelSecondary: '#475467',
  neutral900: '#0d0d12',
  neutral300: '#a4abb8',

  brand: '#ffc700',
  brandAccent: '#ffcc02',
  brandPattern: '#ffd027',
  currencyPill: '#c9a519',

  borderTertiary: '#e5e6e7',
  borderYellowish: '#f6f6f3',
  avatarPlaceholder: '#d9d9d9',
  navButton: 'rgba(71, 71, 71, 0.37)',

  serviceCrypto: 'rgba(228, 71, 69, 0.08)',
  serviceGiftcards: 'rgba(214, 205, 234, 0.2)',
  servicePaybills: 'rgba(170, 188, 220, 0.2)',
  serviceRate: 'rgba(18, 115, 109, 0.08)',
} as const;


export const fonts = {
  regular: 'Sora_400Regular',
  semiBold: 'Sora_600SemiBold',
  bold: 'Sora_700Bold',
  extraBold: 'Sora_800ExtraBold',
  montserratBold: 'Montserrat_700Bold',
} as const;


export const type = {
  regular: { fontFamily: fonts.regular, includeFontPadding: false },
  semiBold: { fontFamily: fonts.semiBold, includeFontPadding: false },
  bold: { fontFamily: fonts.bold, includeFontPadding: false },
  extraBold: { fontFamily: fonts.extraBold, includeFontPadding: false },
} as const satisfies Record<string, TextStyle>;
