import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; // 确保在环境变量中正确配置

// 创建 axios 实例，带有默认的头信息（包括认证）
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// 获取所有文章
export async function getArticles() {
  try {
    const response = await apiClient.get('/api/articles', {
      params: {
        populate: 'author', // 使用 populate 来获取关联的 author 数据
      },
    });
    return response.data.data; // 返回文章数据数组
  } catch (error) {
    console.error('Error fetching articles:', error.response?.data || error.message);
    throw error;
  }
}

// 根据 slug 获取单篇文章
export async function getArticleBySlug(slug) {
  try {
    console.log('current slug is: ', slug);
    const response = await apiClient.get('/api/articles', {
      params: {
        'filters[slug][$eq]': slug,
        populate: '*', // 获取关联数据，如作者、封面图等
      },
    });
    return response.data.data[0]; // 返回匹配的文章
  } catch (error) {
    console.error('Error fetching article by slug:', error.response?.data || error.message);
    throw error;
  }
}

// 创建新的文章
export async function createArticle(articleData) {
  try {
    const response = await apiClient.post('/api/articles', {
      data: articleData,
    });
    console.log('Article created successfully:', response.data);
    return response.data; // 返回新创建的文章
  } catch (error) {
    console.error('Error creating article:', error.response?.data || error.message);
    throw error;
  }
}

// 获取所有作者
export async function getAuthors() {
  try {
    const response = await apiClient.get('/api/authors');
    return response.data.data; // 返回作者列表
  } catch (error) {
    console.error('Error fetching authors:', error.response?.data || error.message);
    throw error;
  }
}

// 获取所有分类
export async function getCategories() {
  try {
    const response = await apiClient.get('/api/categories');
    return response.data.data; // 返回分类列表
  } catch (error) {
    console.error('Error fetching categories:', error.response?.data || error.message);
    throw error;
  }
}

// 获取 Strapi 的媒体资源 URL
export function getStrapiMedia(url) {
  if (url.startsWith('/')) {
    return `${API_URL}${url}`; // 拼接完整的媒体 URL
  }
  return url;
}
