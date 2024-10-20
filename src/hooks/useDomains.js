import { useState, useEffect, useCallback } from 'react';
import { getVercelDomains, getAuthors } from '../lib/api';

export default function useDomains() {
  const [domains, setDomains] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [authorDomainMap, setAuthorDomainMap] = useState({});

  const fetchData = useCallback(async () => {
    setIsLoading(true);    
    try {
      const [domainsResponse, authorsResponse] = await Promise.all([
        getVercelDomains(),
        getAuthors()
      ]);

      setDomains(Array.isArray(domainsResponse) ? domainsResponse : []);
      setAuthors(Array.isArray(authorsResponse) ? authorsResponse : []);

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

  const handleAssociate = (authorId, domain) => {
    setAuthorDomainMap(prev => ({...prev, [authorId]: domain}));
  };

  return {
    domains,
    authors,
    isLoading,
    error,
    selectedAuthor,
    setSelectedAuthor,
    selectedDomain,
    setSelectedDomain,
    handleAssociate,
    authorDomainMap
  };
}
