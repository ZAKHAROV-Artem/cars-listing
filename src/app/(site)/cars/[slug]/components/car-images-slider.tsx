"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { Swiper as SwType } from "swiper/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Media } from "@/types/api/media";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CarImagesSlider({ images }: { images: Media[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwType | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const sm = useMediaQuery("(min-width: 640px)");
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-[10px]">
      {isFullscreen && (
        <div className="fixed left-0 top-0 z-[100] bg-black/70">
          <div
            className="fixed left-[10px] top-[10px] z-[150]"
            onClick={() => setIsFullscreen(false)}
          >
            <IoMdClose size={35} className="text-primary-light" />
          </div>
          <Swiper
            effect="fade"
            loop={true}
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className={
              "car-details-slider-wrapper-big flex h-screen w-screen items-center justify-center"
            }
          >
            <div ref={ref}>
              {images.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className=" flex h-full w-full items-center justify-center">
                    <div
                      className="absolute left-0 top-0 z-0 h-screen w-screen"
                      onClick={() => setIsFullscreen(false)}
                    />
                    <Image
                      src={image.attributes.url}
                      alt={
                        image.attributes.alternativeText ||
                        image.attributes.name
                      }
                      width={720}
                      height={420}
                      className="z-2  relative h-fit max-h-[90vh] w-full max-w-[80vw]  select-none rounded-2xl object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      )}
      <Swiper
        effect="fade"
        loop={true}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        pagination={!sm}
        modules={
          sm
            ? [FreeMode, Navigation, Thumbs]
            : [FreeMode, Navigation, Thumbs, Pagination]
        }
        className={
          "car-details-slider-wrapper-big h-[200px] xs:h-[300px] sm:h-[400px] md:h-[500px]"
        }
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} onClick={() => setIsFullscreen(true)}>
            <Image
              src={image.attributes.url}
              alt={image.attributes.alternativeText || image.attributes.name}
              width={720}
              height={420}
              className="h-full w-full cursor-pointer select-none object-contain sm:object-cover md:rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {sm && (
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={sm ? 4 : 3}
          spaceBetween={10}
          watchSlidesProgress={true}
          modules={[ Navigation, Thumbs]}
        >
          {images.map((image) => (
            <SwiperSlide
              className={`car-details-slider-slide-small`}
              key={image.id}
            >
              <Image
                src={image.attributes.url}
                alt={image.attributes.alternativeText || image.attributes.name}
                width={160}
                height={90}
                className={cn(
                  " h-full max-h-[90px] w-full select-none  object-cover md:rounded-xl",
                  {},
                )}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
