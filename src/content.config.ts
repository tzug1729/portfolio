import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 作品。ロケール別のディレクトリに置く。
 *   src/content/works/ja/atm-simulator.md  -> id: "ja/atm-simulator"
 *   src/content/works/en/atm-simulator.md  -> id: "en/atm-simulator"
 *
 * 本文（4つの固定見出しを含む）は Markdown 本体に書く。
 */
const works = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/works',
    // 既定の generateId は frontmatter の slug をそのまま id にするため、
    // ja/en で同じ slug を持つと id が衝突する。ロケール込みのパスを id にする。
    generateId: ({ entry }) => entry.replace(/\.[^.]+$/, ''),
  }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string(),
      /** 例: "2025.12 – 2026.02" */
      period: z.string(),
      role: z.enum(['solo', 'team']),
      /** role が team のとき必須。自分の担当範囲 */
      responsibility: z.string().optional(),
      tech: z.array(z.string()),
      links: z
        .object({
          github: z.url().optional(),
          demo: z.url().optional(),
          article: z.url().optional(),
        })
        .default({}),
      order: z.number(),
    })
    .superRefine((data, ctx) => {
      if (data.role === 'team' && !data.responsibility?.trim()) {
        ctx.addIssue({
          code: 'custom',
          path: ['responsibility'],
          message:
            'role: "team" の作品には responsibility が必要です。自分の担当範囲を書いてください。',
        });
      }
    }),
});

/**
 * プロフィールの各節。窓の大きさは section で決める（テンプレート側）。
 * 見出しは works と同じく Markdown 本体に書く。
 */
const about = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/about',
    generateId: ({ entry }) => entry.replace(/\.[^.]+$/, ''),
  }),
  schema: z.object({
    section: z.enum(['affiliation', 'activities', 'certifications']),
    order: z.number(),
  }),
});

export const collections = { works, about };
