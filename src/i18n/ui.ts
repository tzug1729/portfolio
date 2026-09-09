import ja from './ja.json';
import en from './en.json';

export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';

type Dict = { [key: string]: string | Dict };

const dictionaries: Record<Locale, Dict> = { ja, en };

export function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/**
 * URL から現在のロケールと、base・ロケール接頭辞を取り除いたパスを取り出す。
 * 言語切替が「同じページの対応言語版」に留まるのはこの path を使うため。
 *
 *   /portfolio/works/atm     -> { locale: 'ja', path: 'works/atm' }
 *   /portfolio/en/works/atm  -> { locale: 'en', path: 'works/atm' }
 */
export function parsePath(url: URL): { locale: Locale; path: string } {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  let rest = url.pathname;
  if (base && rest.startsWith(base)) rest = rest.slice(base.length);

  const segments = rest.split('/').filter(Boolean);
  const first = segments[0];
  const locale: Locale = isLocale(first) && first !== defaultLocale ? first : defaultLocale;
  if (locale !== defaultLocale) segments.shift();

  return { locale, path: segments.join('/') };
}

function lookup(dict: Dict, key: string): string | undefined {
  let current: string | Dict | undefined = dict;
  for (const part of key.split('.')) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = current[part];
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * UI 文言を引く。指定ロケールに無ければ既定ロケール、それも無ければキーを返す。
 * 記事本文はここではなく src/content/works/<locale>/*.md が持つ。
 */
export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  const fallback = dictionaries[defaultLocale];
  return function t(key: string): string {
    return lookup(dict, key) ?? lookup(fallback, key) ?? key;
  };
}

/** <html lang> や og:locale 用 */
export const htmlLang: Record<Locale, string> = { ja: 'ja', en: 'en' };
export const ogLocale: Record<Locale, string> = { ja: 'ja_JP', en: 'en_US' };

/** public/ 配下のアセットに base を付ける（BASE_URL の末尾スラッシュ有無を吸収する） */
export function withBase(assetPath: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${assetPath.replace(/^\/+/, '')}`;
}
