import Link from 'next/link';
import React from 'react';

function BlogItem({ data }: any) {
  const { title, description, id } = data;

  return (
    <div className="blog-item">
      <div className="blog-item__title">{title}</div>
      <div className="blog-item__desc">{description}</div>
      <Link href={`/blog/${id}`}>
        <a className="blog-item__learn-more text-primary hover:text-primary">Learn more</a>
      </Link>
    </div>
  );
}

export default BlogItem;
