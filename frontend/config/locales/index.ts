import en from './en';
import ka from './ka';
import type { Locale } from '@/lib/i18n';

const dictionaries = { en, ka } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
