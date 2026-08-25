import type { APIRoute } from 'astro';
import { site } from '../data/site';

/**
 * AI検索・生成AIのクローラーを明示的に許可する。
 * 明示しておくと、既定の挙動が変わった場合も許可の意図が残る。
 */
const aiCrawlers = [
  'GPTBot',        // OpenAI 学習・インデックス
  'OAI-SearchBot', // ChatGPT の検索
  'ChatGPT-User',  // ChatGPT のユーザー起点アクセス
  'ClaudeBot',     // Anthropic
  'anthropic-ai',  // Anthropic
  'Claude-User',   // Claude のユーザー起点アクセス
  'PerplexityBot', // Perplexity
  'Google-Extended', // Gemini / AI Overview 向け
  'CCBot',         // Common Crawl
  'Applebot-Extended',
];

export const GET: APIRoute = ({ site: astroSite }) => {
  const origin = (astroSite?.href ?? `${site.origin}/`).replace(/\/$/, '');
  const body = [
    '# 大山志保 公式サイト',
    '# すべてのクローラーに全ページを開放している。',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# AI検索・生成AIのクローラー（明示的に許可）',
    ...aiCrawlers.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', '']),
    `Sitemap: ${origin}/sitemap-index.xml`,
    '',
    `# サイトの要約と主要な事実: ${origin}/llms.txt`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
