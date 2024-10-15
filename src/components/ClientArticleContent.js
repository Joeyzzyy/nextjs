// components/ClientArticleContent.js

"use client"; // 声明该组件是客户端组件

import { useEffect } from 'react';
import Image from 'next/image';

// 客户端组件用于处理需要 useEffect 的逻辑
export default function ClientArticleContent({ imageUrl, content }) {
  useEffect(() => {
    const header = document.querySelector('.header');
    const main = document.querySelector('main');
    if (header && main) {
      main.style.paddingTop = `${header.offsetHeight}px`;
    }
  }, []);

  return (
    <div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Article Image"
          width={800}
          height={400}
          layout="responsive"
          priority
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}