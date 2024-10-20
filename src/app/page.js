"use client"; // 声明这是客户端组件

import { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { FileTextOutlined, GlobalOutlined } from '@ant-design/icons';
import ArticleList from '../components/ArticleList';
import DomainSetting from '../components/DomainSetting';
import useArticles from '../hooks/useArticles';
import useDomains from '../hooks/useDomains';
import { AuthorDomainProvider } from '../contexts/AuthorDomainContext';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('articles');
  const { articles, authors, selectedAuthor, searchText, handleAuthorChange, handleSearchChange } = useArticles();
  const { domains, newDomain, handleAddDomain, handleNewDomainChange } = useDomains();

  const renderContent = () => {
    if (activeMenu === 'articles') {
      return <ArticleList 
        articles={articles} 
        authors={authors} 
        selectedAuthor={selectedAuthor} 
        searchText={searchText}
        onAuthorChange={handleAuthorChange}
        onSearchChange={handleSearchChange}
      />;
    } else if (activeMenu === 'domain') {
      return <DomainSetting 
        domains={domains} 
        newDomain={newDomain} 
        onAddDomain={handleAddDomain}
        onNewDomainChange={handleNewDomainChange}
      />;
    }
  };

  return (
    <AuthorDomainProvider>
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
    </AuthorDomainProvider>
    
  );
}
