import React, { createContext, useState, useContext } from 'react';

const AuthorDomainContext = createContext();

export function AuthorDomainProvider({ children }) {
  const [authorDomainMap, setAuthorDomainMap] = useState({});

  return (
    <AuthorDomainContext.Provider value={{ authorDomainMap, setAuthorDomainMap }}>
      {children}
    </AuthorDomainContext.Provider>
  );
}

export function useAuthorDomain() {
  return useContext(AuthorDomainContext);
}