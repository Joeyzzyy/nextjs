import React from 'react';
import { Form, Button, Spin, Select, message, Empty, Card } from 'antd';
const { Option } = Select;
import useDomains from '../hooks/useDomains';
import { useAuthorDomain } from '../contexts/AuthorDomainContext';

export default function DomainSetting() {
  const { domains, authors, selectedAuthor, selectedDomain, setSelectedAuthor, setSelectedDomain, handleAssociate, authorDomainMap, isLoading, error } = useDomains();
  const { setAuthorDomainMap } = useAuthorDomain();
  const handleAssociateClick = () => {
    if (selectedAuthor && selectedDomain) {
      handleAssociate(selectedAuthor, selectedDomain);
      setAuthorDomainMap(prevMap => ({
        ...prevMap,
        [selectedAuthor]: selectedDomain
      }));
      message.success('作者和域名关联成功');
    }
  };

  if (isLoading) {
    return <Spin tip="正在加载数据..." />;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  const hasDomains = domains && domains.length > 0;
  const hasAuthors = authors && authors.length > 0;      
  console.log('domainsResponse is: ', domains);
  console.log('authorsResponse is: ', authors);

  if (!hasDomains || !hasAuthors) {
    return <Empty description="暂无数据，请稍后再试" />;
  }

  return (
    <div>
      <Card title="作者域名关联设置" style={{ marginBottom: 20 }}>
        <Form layout="vertical">
          <Form.Item label="选择作者" required>
            <Select
              value={selectedAuthor}
              onChange={setSelectedAuthor}
              placeholder="请选择作者"
            >
              {authors.map(author => (
                <Option key={author.id} value={author.id}>{author.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="选择域名" required>
            <Select
              value={selectedDomain}
              onChange={setSelectedDomain}
              placeholder="请选择域名"
            >
              {domains.map(domain => (
                <Option key={domain.name} value={domain.name}>{domain.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              onClick={handleAssociateClick}
              disabled={!selectedAuthor || !selectedDomain}
            >
              关联作者和域名
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="当前作者域名关联">
        {authorDomainMap && Object.keys(authorDomainMap).length > 0 ? (
          <ul>
            {Object.entries(authorDomainMap).map(([authorId, domain]) => (
              <li key={authorId}>
                作者: {authors.find(a => a.id === parseInt(authorId))?.name || authorId} - 
                关联域名: {domain}
              </li>
            ))}
          </ul>
        ) : (
          <Empty description="暂无作者域名关联。请使用上方的表单进行关联操作。" />
        )}
      </Card>
    </div>
  );
}
