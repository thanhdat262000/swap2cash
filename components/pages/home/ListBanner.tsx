import { useApplicationContext } from 'contexts/ApplicationContext';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
function ListBanner() {
  const { appConfig } = useApplicationContext();
  const { listBanner } = appConfig || [];
  const banner = (listBanner || []).map((item: any) => item.bannerUrl);
  // const banner = [
  //   'http://api.tech-store.click/images/post-image/5283882-1687961427551.jpg',
  //   'http://api.tech-store.click/images/post-image/19168732-1687961433630.jpg',
  // ];

  return (
    <div className="list-banner">
      <Swiper
        // spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={true}
        modules={[Navigation]}
      >
        {banner.map((item: any) => (
          <SwiperSlide key={item}>
            <img src={item} className="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ListBanner;
