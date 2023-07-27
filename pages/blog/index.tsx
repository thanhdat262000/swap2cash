import BlogItem from '@components//pages/home/BlogItem';
import { Row, Col } from 'antd';
import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { getListBlogAPI } from 'services/blog';
import PublicLayout from '@components//Layout/Public';

function AllBlog() {
  const [data, setData] = useState([]);
  const getListBlog = async (paramSearch?: any) => {
    try {
      const res = await getListBlogAPI({ isPublic: true });
      setData(res.data);
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    getListBlog();
  }, []);
  return (
    <PublicLayout>
      <div className="flex justify-center">
        <div className="home-container">
          <div className="title mb-8">Blog</div>
          <Row gutter={[16, 16]} className="all-blog">
            {data.map((item: any) => (
              <Col span={8} xs={24} key={item.id} className="all-blog__item">
                <BlogItem data={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default AllBlog;
