import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles from the modules
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

export default function CardSlider() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper w-[240px] h-[320px]"
      >
        <SwiperSlide className="flex justify-center items-center rounded-xl text-white font-bold text-xl">
          <div className="bg-vault-gradient flex justify-center items-center h-full rounded-xl font-outfit">
            RookVault Notes
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center rounded-xl text-white font-bold text-xl">
          <div className="bg-gradient-to-br from-rose-600 to-rose-800 flex justify-center items-center h-full rounded-xl font-outfit">
            More Faster
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center rounded-xl text-white font-bold text-xl">
          <div className="bg-gradient-to-br from-surface-800 to-surface-950 flex justify-center items-center h-full rounded-xl border border-white/[0.1] font-outfit">
            Faster Impression
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center rounded-xl text-white font-bold text-xl">
          <div className="bg-gradient-to-br from-purple-700 to-purple-900 flex justify-center items-center h-full rounded-xl font-outfit">
            Higher lead Quality
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center rounded-xl text-white font-bold text-xl">
          <div className="bg-gradient-to-br from-vault-600 to-vault-800 flex justify-center items-center h-full text-center rounded-xl font-outfit">
            Higher Conversion Rate
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
