import React, { ReactElement } from 'react';
import PublicLayout from '@components//Layout/Public';

function BlogDetail({ id, blogDetailData }: any) {
  return (
    <div className="blog-detail">
      <h1 className="blog-detail__title">{blogDetailData.title}</h1>
      <div className="blog-detail__content" dangerouslySetInnerHTML={{ __html: blogDetailData.content }}></div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  let blogDetailData = '';
  try {
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/detail/user/${id}`);
    const data = await res2.json();
    if (data) {
      blogDetailData = data;
    }
    console.log('blogDetailData', blogDetailData);
  } catch (e) {
    console.log('e', e);
  }
  return { props: { id, blogDetailData } };
}

BlogDetail.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default BlogDetail;
