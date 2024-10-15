"use client"; // 声明这是客户端组件

import { useState, useEffect } from 'react';
import { getArticles, getAuthors } from '../lib/api';
import Link from 'next/link';
import { Select, Typography } from 'antd';
import { Row, Col } from 'antd';

const { Option } = Select;

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    // 初始获取所有文章和作者
    async function fetchData() {
      const articleData = await getArticles(); // 获取所有文章
      const authorData = await getAuthors();   // 获取所有作者
      setArticles(articleData);  // 设置文章列表
      setAuthors(authorData);    // 设置作者列表
    }
    fetchData();
  }, []);

  // 当选择的作者发生变化时，更新文章列表
  useEffect(() => {
    if (selectedAuthor) {
      // 筛选文章，只显示所选作者的文章
      const fetchArticlesByAuthor = async () => {
        const articleData = await getArticles();  // 获取所有文章
        console.log('current articles are: ', articleData);
        const filteredArticles = articleData.filter(article => article.author.id === selectedAuthor);
        setArticles(filteredArticles);  // 只显示符合条件的文章
      };
      fetchArticlesByAuthor();
    } else {
      // 如果没有选择作者，重新显示所有文章
      const fetchAllArticles = async () => {
        const articleData = await getArticles(); // 重新获取所有文章
        setArticles(articleData);  // 重置文章列表
      };
      fetchAllArticles();
    }
  }, [selectedAuthor]);  // 依赖项为 selectedAuthor，当它变化时触发

  const handleAuthorChange = (value) => {
    setSelectedAuthor(value);  // 更新选中的作者 ID
  };

  return (
    <div className="home-container">
      {/* 作者选择下拉框 */}
      <Row justify="center" gutter={[32, 32]}>
        <Col span={32}>
          <Typography.Title level={5} style={{ textAlign: 'center' }}>
            Select Author
          </Typography.Title>
          <Select
            placeholder="Select author"
            value={selectedAuthor}
            onChange={handleAuthorChange}
            style={{ width: '100%' }}
          >
            <Option value="">All Authors</Option>
            {authors.map((author) => (
              <Option key={author.id} value={author.id}>
                {author.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* 文章列表 */}
      <Row justify="center" gutter={[32, 32]}>
        <Col span={32}>
          <Typography.Title level={4} style={{ marginTop: '20px', textAlign: 'center' }}>
            Articles List
          </Typography.Title>
          <ul className="article-list">
            {articles.map((article) => (
              <li key={article.id} className="article-item">
                <Link href={`/articles/${article.slug}`} legacyBehavior>
                  <a style={{ display: 'block', wordBreak: 'break-word' }}>{article.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>

      {/* 样式 */}
      <style jsx>{`
        .home-container {
          min-width: 800px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center; /* 水平居中 */
        }

        .article-list {
          list-style-type: none;
          padding: 0;
        }

        .article-item {
          min-width: 480px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-bottom: 1rem;
          padding: 1rem;
          width: 100%; /* 确保宽度适应长标题 */
          transition: background-color 0.3s ease;
        }

        .article-item:hover {
          background-color: #f1f1f1;
        }

        a {
          text-decoration: none;
          color: #007bff;
          font-size: 1.2rem;
          word-wrap: break-word;
          display: block;
          width: 100%;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
