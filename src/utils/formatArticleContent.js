// utils/formatArticleContent.js

/**
 * 格式化从 Strapi 获取到的文章数据，将其转化为可渲染的内容
 * @param {Object} article 从 Strapi 获取的文章数据
 * @returns {Object} 格式化后的文章数据，包括 title、content、author、category 等
 */
export function formatArticleContent(article) {
  if (!article) {
    throw new Error('No article data provided');
  }

  // 解析标题、作者、分类等信息
  const title = article.title || '无标题';
  const author = article.author ? article.author.name : '匿名';
  const category = article.category ? article.category.name : '未分类';
  const description = article.description || '无描述';
  
  // 处理 blocks 数组，生成 content HTML 字符串
  let content = '';
  if (article.blocks && Array.isArray(article.blocks)) {
    article.blocks.forEach((block) => {
      // 假设这里只有 `shared.rich-text` 组件，直接处理 body 内容
      if (block.__component === 'shared.rich-text' && block.body) {
        content += `<p>${block.body}</p>`; // 使用段落标签包裹
      }
      // 根据需要处理其他组件类型...
    });
  }

  return {
    title,
    author,
    category,
    description,
    content,  // 渲染时通过 dangerouslySetInnerHTML 使用
  };
}
