import React, { useEffect } from 'react';
import { List, Card, Select, Spin, message, Typography } from 'antd';
import Link from 'next/link';
import useArticles from '../hooks/useArticles';
import { useAuthorDomain } from '../contexts/AuthorDomainContext';
const { Option } = Select;
const { Paragraph } = Typography;

export default function ArticleList({  }) {
  const { articles, authors, selectedAuthor, setSelectedAuthor, isLoading, error } = useArticles();
  const { authorDomainMap } = useAuthorDomain();

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  useEffect(() => {
    console.log('当前选中的作者:', selectedAuthor);
    console.log('过滤后的文章数量:', articles.length);
    console.log('authorDomainMap is: ', authorDomainMap);
  }, [selectedAuthor, articles]);

  if (isLoading) {
    return <Spin tip="加载中..." />;
  }

  const getContentPreview = (content) => {
    if (typeof content === 'string' && content.length > 0) {
      return content.substring(0, 100) + '...';
    }
    return '无内容预览';
  };

  const getArticleUrl = (article) => {
    if (authorDomainMap && authorDomainMap[article.authorId]) {
      return `https://${authorDomainMap[article.authorId]}/articles/${article.slug}`;
    }
    // 如果没有映射，使用当前域名
    return `/articles/${article.slug}`;
  };

  return (
    <div>
      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="选择作者"
        value={selectedAuthor}
        onChange={setSelectedAuthor}
      >
        <Option value="">所有作者</Option>
        {authors.map((author) => (
          <Option key={author.id} value={author.id}>
            {author.name}
          </Option>
        ))}
      </Select>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={articles}
        renderItem={article => (
          <List.Item>
            <Card
              title={
                <Link href={getArticleUrl(article)}>
                  {article.title}
                </Link>
              }
            >
              <Paragraph ellipsis={{ rows: 3 }}>
                {getContentPreview(article.content)}
              </Paragraph>
              <p>作者: {authors.find(author => author.id === article.authorId)?.name || '未知'}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
