"use client"; // 声明这是客户端组件

import { useState, useEffect } from 'react';
import { getArticles, getAuthors } from '../lib/api';
import Link from 'next/link';
import { Select, Typography, Layout, Menu, Table, Space, Input, Button, Form } from 'antd';
import { SearchOutlined, FileTextOutlined, GlobalOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [searchText, setSearchText] = useState('');
  const [activeMenu, setActiveMenu] = useState('articles');

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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '66%',
      render: (text, record) => (
        <Link href={`/articles/${record.slug}`}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Author',
      dataIndex: ['author', 'name'],
      key: 'author',
      width: '34%',
    },
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderContent = () => {
    if (activeMenu === 'articles') {
      return (
        <>
          <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
            <Space>
              <Select
                placeholder="Select author"
                value={selectedAuthor}
                onChange={handleAuthorChange}
                style={{ width: 200 }}
              >
                <Option value="">All Authors</Option>
                {authors.map((author) => (
                  <Option key={author.id} value={author.id}>
                    {author.name}
                  </Option>
                ))}
              </Select>
              <Input
                placeholder="Search articles"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 200 }}
              />
            </Space>
            <Button type="primary">Publish</Button>
          </Space>
          <Table
            columns={columns}
            dataSource={filteredArticles}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </>
      );
    } else if (activeMenu === 'domain') {
      return (
        <Form layout="vertical" style={{ maxWidth: 600 }}>
          <Form.Item
            name="domain"
            label="Custom Domain"
            rules={[{ required: true, message: 'Please input your custom domain!' }]}
          >
            <Input placeholder="Enter your custom domain (e.g., myblog.com)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Bind Domain</Button>
          </Form.Item>
        </Form>
      );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={['articles']}
          style={{ height: '100%', borderRight: 0 }}
          onSelect={({ key }) => setActiveMenu(key)}
        >
          <Menu.Item key="articles" icon={<FileTextOutlined />}>
            Articles
          </Menu.Item>
          <Menu.Item key="domain" icon={<GlobalOutlined />}>
            Domain Setting
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Title level={3} style={{ margin: '16px 24px' }}>
            Article Publish System
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
