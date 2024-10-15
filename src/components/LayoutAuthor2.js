// components/LayoutAuthor2.js

import React from 'react';
import Head from 'next/head';
import ClientArticleContent from './ClientArticleContent';

const LayoutAuthor2 = ({ title, description, author, content, imageUrl }) => {
  return (
    <>
      <Head>
        <title>{title} - Professional Blog</title>
        <meta name="description" content={description} />
      </Head>

      <div style={layoutStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>{title}</h1>
          <p style={authorStyle}>Author: {author.name}</p>
        </header>

        <main style={mainStyle}>
          <div style={contentWrapperStyle}>
            <ClientArticleContent imageUrl={imageUrl} content={content} />
          </div>
        </main>

        <footer style={footerStyle}>
          <p>© 2024 Professional Blog - All rights reserved</p>
        </footer>
      </div>
    </>
  );
};

// 页面样式
const layoutStyle = {
  background: 'linear-gradient(to bottom, #fafafa, #f0f0f0)',  // 非常浅的渐变背景
  color: '#333',  // 深灰色文字
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const headerStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',  // 轻微阴影，提升质感
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  margin: '0 0 10px',
  color: '#333',
  letterSpacing: '0.5px',  // 增加字母间距，显得更精致
};

const authorStyle = {
  fontSize: '1rem',
  color: '#666',
};

const mainStyle = {
  padding: '40px 20px',
  backgroundColor: '#fafafa',  // 轻微的浅灰色背景
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
};

const contentWrapperStyle = {
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // 更明显的阴影
  padding: '40px',  // 增加内边距
  borderRadius: '12px',  // 更大的圆角
  maxWidth: '900px',
  width: '100%',
};

const footerStyle = {
  backgroundColor: '#ffffff',
  color: '#666',
  textAlign: 'center',
  padding: '20px',
  borderTop: '1px solid #ddd',
  marginTop: '40px',
};

/* 按钮样式 */
const buttonStyle = {
  backgroundColor: '#4CAF50',  // 柔和的绿色
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '6px',
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease',
};

const buttonHoverStyle = {
  backgroundColor: '#45a049',  // 按钮悬停颜色
};

export default LayoutAuthor2;
