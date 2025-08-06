import React, { createContext, useContext, useState } from 'react';
import { searchMusic } from '@/apis';

// 创建搜索结果上下文
const SearchContext = createContext(null);

// 搜索结果提供者组件
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 执行搜索的方法
  const executeSearch = async (keywords, limit = 20, offset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchMusic(keywords, limit, offset);
      if (result.data.code === 200) {
        setSearchResults(result.data.result || {});
      } else {
        setError(`搜索失败: ${result.data.message || '未知错误'}`);
        setSearchResults({});
      }
    } catch (err) {
      setError(`搜索发生异常: ${err.message || '网络错误'}`);
      setSearchResults({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{ searchResults, loading, error, executeSearch, setSearchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// 自定义Hook，用于获取搜索结果上下文
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};