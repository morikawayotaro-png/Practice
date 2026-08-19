import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/** 関連リンク3本（storiesページの型で必須） */
const relatedLink = z.object({
  href: z.string(),
  label: z.string(),
  note: z.string().optional(),
});

const news = defineCollection({
  // _template.md は draft: true なので記事としては出力されない
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default('お知らせ'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const stories = defineCollection({
  loader: glob({ base: './src/content/stories', pattern: '**/[^_]*.md' }),
  schema: z.object({
    /** 質問への答えになる宣言文 */
    title: z.string(),
    /** このページが答えている質問 */
    question: z.string(),
    /** meta description */
    description: z.string(),
    /** 冒頭段落。これだけで質問への回答が完結すること（4〜5文） */
    lead: z.string(),
    /** /challenge のハブでの並び順 */
    order: z.number(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** 末尾の関連リンク。3本必須 */
    related: z.array(relatedLink).min(3),
  }),
});

export const collections = { news, stories };
