import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogItem from './BlogItem';
import { getListBlogAPI } from 'services/blog';

function ListBlog() {
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
    <div className="list-blog">
      <Swiper
        className="list-blog__swiper"
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <BlogItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ListBlog;
