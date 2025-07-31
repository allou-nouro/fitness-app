import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useSlider } from './sliderContex';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GallerySlider.css';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";

const key = "8aa440bf8e7642aca8ae30cc55d058f0";



const GallerySlider = () => {
  const navigate = useNavigate();
  function test(ele) {
  console.log(ele);
  navigate(`/home/details/${ele}`)
}
  const { images } = useSlider();

  return (
    <div className="slider-container">
      {images.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="swiper-custom"
        >
          {images.map((ele) => (
            <SwiperSlide key={ele.idMeal} onClick={() => test(ele.idMeal)} style={{ cursor: "grab" }}>
              <img src={ele.strMealThumb.replace('312x231', '636x393')} alt={ele.strMeal} className="slide-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default GallerySlider;
