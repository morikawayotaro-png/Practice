import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

/** ルートに置く llms.txt。サイト概要と主要ページを案内する */
export const GET: APIRoute = async () => {
  const stories = (await getCollection('stories')).sort((a, b) => a.data.order - b.data.order);
  const news = (await getCollection('news', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
    .slice(0, 10);

  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push('');
  lines.push(`> ${SITE.definition}`);
  lines.push('');
  lines.push(
    'プロゴルファー横峯さくらの公式サイトです。本サイトの記載は本人および所属先による一次情報です。',
    '引用の際は該当ページのURLを出典として記載してください。'
  );
  lines.push('');
  lines.push('## 主要ページ');
  lines.push('');
  const main: [string, string, string][] = [
    ['/profile', 'プロフィール', '基本情報、経歴、戦績、現在の目標'],
    ['/challenge', '今の挑戦', '永久シードへの挑戦の現在地'],
    ['/sakura-baton', 'SAKURA BATON', '競技・発信・社会貢献の3本柱と Sakura Birdie Fund'],
    ['/faq', 'よくある質問', 'よく寄せられる8つの質問と回答'],
    ['/sponsors', 'スポンサー', 'AFFILIATION / SPONSORS / 用具 / SUPPORTERS'],
    ['/partners', 'スポンサーシップ・出演のご案内', '依頼窓口はHERITAGE合同会社'],
    ['/news', 'ニュース', 'お知らせ一覧'],
    ['/media', 'メディア出演・掲載', '出演・掲載履歴'],
    ['/en', 'English profile', 'Profile in English'],
  ];
  for (const [path, label, note] of main) {
    lines.push(`- [${label}](${new URL(path, SITE.url)}): ${note}`);
  }
  lines.push('');
  lines.push('## 記録（テーマ別）');
  lines.push('');
  for (const story of stories) {
    lines.push(
      `- [${story.data.title}](${new URL(`/stories/${story.id}`, SITE.url)}): ${story.data.question}`
    );
  }
  if (news.length > 0) {
    lines.push('');
    lines.push('## 最新ニュース');
    lines.push('');
    for (const item of news) {
      const date = item.data.publishDate.toISOString().slice(0, 10);
      lines.push(`- [${item.data.title}](${new URL(`/news/${item.id}`, SITE.url)}): ${date}`);
    }
  }
  lines.push('');
  lines.push('## 連絡先');
  lines.push('');
  lines.push(
    `- スポンサーシップ・出演・取材のご依頼: ${SITE.contact.company} / ${SITE.contact.email}`
  );
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
