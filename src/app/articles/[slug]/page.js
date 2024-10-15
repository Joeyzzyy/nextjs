// app/articles/[slug]/page.js

import { getArticleBySlug, getArticles } from '../../../lib/api';
import Head from 'next/head';
import LayoutAuthor1 from '../../../components/LayoutAuthor1';
import LayoutAuthor2 from '../../../components/LayoutAuthor2';
import ClientArticleContent from '../../../components/ClientArticleContent';

// 生成静态参数
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// 动态路由页面组件
export default async function ArticlePage({ params }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return <p>文章未找到</p>;
  }

  const { title, description, imageUrl, author, blocks } = article;

  // 提取 body 内容
  const richTextBlock = blocks.find(block => block.__component === 'shared.rich-text');
  const content = richTextBlock ? richTextBlock.body : '';

  // 根据 author 动态选择布局
  let LayoutComponent;
  switch (author.id) {
    case 1:
      LayoutComponent = LayoutAuthor1;
      break;
    case 2:
      LayoutComponent = LayoutAuthor2;
      break;
    default:
      LayoutComponent = LayoutAuthor1;
  }

  // 将页面数据传递到 Layout 中
  return (
    <LayoutComponent title={title} description={description} author={author} content={content} imageUrl={imageUrl} />
  );
}
