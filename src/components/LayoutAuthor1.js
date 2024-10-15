// components/LayoutAuthor1.js

import React from 'react';
import Head from 'next/head';
import ClientArticleContent from './ClientArticleContent';
import styles from './LayoutAuthor1.module.css';  // 导入 CSS 模块

const LayoutAuthor1 = ({ title, description, author, content, imageUrl }) => {
  return (
    <>
      <Head>
        <title>{title} - 专业博客</title>
        <meta name="description" content={description} />
      </Head>

      <div className={styles.layout}>  {/* 使用模块样式 */}
        <header className={styles.header}>
          <h1>{title}</h1>
          <p>作者: {author.name}</p>
        </header>

        <main className={styles.main}>
          <ClientArticleContent imageUrl={imageUrl} content={content} />
        </main>

        <footer className={styles.footer}>
          <p>© 2024 高端商务博客 - 保留所有权利</p>
        </footer>
      </div>
    </>
  );
};

export default LayoutAuthor1;
