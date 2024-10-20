import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; // 确保在环境变量中正确配置
const REACT_APP_VERCEL_TOKEN = process.env.NEXT_PUBLIC_REACT_APP_VERCEL_TOKEN;

if (!STRAPI_API_TOKEN) {
  throw new Error('环境变量 NEXT_PUBLIC_STRAPI_API_TOKEN 未定义');
}

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

// 获取所有作者
export async function getAuthors() {
  try {
    const response = await apiClient.get('/api/authors');
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

const VERCEL_API_URL = 'https://api.vercel.com';
const PROJECT_ID = 'intelick-nextjs'; // 替换为您的Vercel项目ID

export async function getVercelDomains() {
  try {
    const response = await fetch(`${VERCEL_API_URL}/v9/projects/${PROJECT_ID}/domains`, {
      headers: {
        'Authorization': `Bearer ` + REACT_APP_VERCEL_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error('获取域名失败');
    }

    const data = await response.json();
    return data.domains.filter(domain => domain.verified);
  } catch (error) {
    console.error('获取Vercel域名时出错:', error);
    throw error;
  }
}

export async function associateDomainWithAuthor(authorId, domainName) {
  try {
    const response = await fetch('/api/associate-domain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorId, domainName }),
    });

    if (!response.ok) {
      throw new Error('关联作者和域名失败');
    }

    return await response.json();
  } catch (error) {
    console.error('关联作者和域名时出错:', error);
    throw error;
  }
}
