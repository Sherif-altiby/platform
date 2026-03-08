"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay"
import TestmonialsCard from './TestmonialsCard';
import Heading from './Heading';


const Tesmonils = () => {

    const data = [
        {
             text: "لو بتدور على مكان تتعلم فيه صح وتطور مهاراتك، العبقري التعليمية هي الاختيار الصح، لأن الدعم اللي بيوفره الفريق والشرح الممتاز بيخلوك تكمل وتنجح من غير تعب.",
             name: "محمود السيد"
        },
        {
             text: "أنا بحب في منصة العبقري إنها بتقدم محتوى تعليمي متنوع ومش ممل خالص، وكل موضوع متقسم بطريقة تخليك تركز وتفهم من أول مرة من غير تعقيد.",
             name: "عبد الله ابراهيم"
        },
        {
             text: "بصراحة منصة العبقري التعليمية غيرتلي نظرتي للتعلم أونلاين، الدروس فيها بسيطة وسلسة، والشرح واضح جدًا، حسيت إني بدرس مع مدرسين بيهتموا فعلاً بيا وبفهمي.",
             name: "احمد المرغني"
        },
        {
             text: "المنصة دي مش بس بتعلمك، دي بتديك حافز تحب تتعلم أكتر وتطور من نفسك، وبجد حسيت إن التعليم معاهم بقى رحلة ممتعة مش عبء.",
             name: "السيد ابراهيم"
        },
        {
             text: "حبيت التصميم السهل والبسيط بتاع العبقري، بتقدر تلاقي اللي عايزه بسرعة ومش بتتوه، وكمان المواد التعليمية متجددة وبتغطي كل اللي أنا محتاجه.",
             name: "محمد حاتم"
        },
        {
             text: "العبقري التعليمية بالنسبة لي مش بس منصة، دي شريك نجاح في تطوير مهاراتي، سواء كنت مبتدئ أو عايز أرفع مستوايا، هتلاقي فيها كل الدعم والمحتوى اللي محتاجه",
             name: "عبد الله صلاح"
        },
        
    ]

    
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

                    {data.map((d) => (

                    <SwiperSlide className='p-2' key={d.text} >
                        <TestmonialsCard name={d.name} text={d.text} />
                    </SwiperSlide>
                    ))}

                    
                </Swiper>
        </div>
    </div>
     </div>
  )
}

export default Tesmonils