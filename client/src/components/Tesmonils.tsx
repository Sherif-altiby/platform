"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay"
import TestmonialsCard from './TestmonialsCard';
import Heading from './Heading';


const Tesmonils = () => {

    
  return (
     <div className='sectionbg pb-[50px] pt-[10px] bg-primary5' >
            <div className='container mt-[50px]' >
        <Heading title='اراء الطلاب' />
        <div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={3}
                    autoplay={{
                        delay: 3000,  
                        disableOnInteraction: false,  
                    }}
                    loop={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        },
                    }}
                >
                    <SwiperSlide className='p-2' >
                        <TestmonialsCard />
                    </SwiperSlide>
                    
                    <SwiperSlide className='p-2' >
                        <TestmonialsCard />
                    </SwiperSlide>
                    
                    <SwiperSlide className='p-2' >
                        <TestmonialsCard />
                    </SwiperSlide>
                    
                    <SwiperSlide className='p-2' >
                        <TestmonialsCard />
                    </SwiperSlide>
                    
                    <SwiperSlide className='p-2' >
                        <TestmonialsCard />
                    </SwiperSlide>
                    
                </Swiper>
        </div>
    </div>
     </div>
  )
}

export default Tesmonils