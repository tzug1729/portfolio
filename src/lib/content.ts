import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n/ui';

export interface Localized<T> {
  entry: T;
  /** 対応言語版が無く、既定ロケールの本文を出しているか */
  fallback: boolean;
}

function forLocale<T extends { id: string }>(all: T[], locale: string): T[] {
  return all.filter((entry) => entry.id.startsWith(`${locale}/`));
}

/**
 * 母集合と並び順は常に既定ロケールが持つ。
 * 対応言語版が無ければ既定ロケールの記事を返して fallback を立てる（404 にしない）。
 */
function localize<T extends { id: string }>(
  all: T[],
  locale: Locale,
  key: (entry: T) => string,
  order: (entry: T) => number,
): Localized<T>[] {
  const translated = new Map(forLocale(all, locale).map((entry) => [key(entry), entry]));

  return forLocale(all, defaultLocale)
    .sort((a, b) => order(a) - order(b))
    .map((entry) => {
      const hit = translated.get(key(entry));
      return { entry: hit ?? entry, fallback: !hit };
    });
}

export type WorkEntry = CollectionEntry<'works'>;
export type AboutEntry = CollectionEntry<'about'>;
export type LocalizedWork = Localized<WorkEntry>;
export type LocalizedAbout = Localized<AboutEntry>;

export async function getWorks(locale: Locale): Promise<LocalizedWork[]> {
  return localize(
    await getCollection('works'),
    locale,
    (entry) => entry.data.slug,
    (entry) => entry.data.order,
  );
}

export async function getAboutSections(locale: Locale): Promise<LocalizedAbout[]> {
  return localize(
    await getCollection('about'),
    locale,
    (entry) => entry.data.section,
    (entry) => entry.data.order,
  );
}
