import { useState, useEffect, useCallback, useMemo } from 'react';
import { getArticles, getAuthors } from '../lib/api';

export default function useArticles() {
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [articleData, authorData] = await Promise.all([
        getArticles(),
        // getAuthors()
      ]);
      
      setArticles(Array.isArray(articleData) ? articleData : []);
      setAuthors(Array.isArray(authorData) ? authorData : []);
      setError(null);
    } catch (err) {
      setError('获取数据失败: ' + err.message);
      console.error('获取数据时出错:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAuthorChange = useCallback((value) => {
    console.log('选择的作者ID:', value);
    setSelectedAuthor(value);
  }, []);

  const filteredArticles = useMemo(() => {
    if (!selectedAuthor) {
      return articles;
    }
    return articles.filter(article => article.author.id === selectedAuthor);
  }, [articles, selectedAuthor]);

  return {
    articles: filteredArticles,
    authors,
    selectedAuthor,
    setSelectedAuthor: handleAuthorChange,
    isLoading,
    error,
    refetch: fetchData
  };
}
