"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { Swiper as SwType } from "swiper/types";
import Image from "next/image";
import { Media } from "@/types/api/media";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useToggle, useWindowSize } from "usehooks-ts";
import { cn } from "@/lib/utils";

export default function CarImagesSlider({ images }: { images: Media[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwType | null>(null);
  const [isFullscreen, toggle, setIsFullscreen] = useToggle(false);
  const sm = useMediaQuery("(min-width: 640px)");
  const lg = useMediaQuery("(min-width: 1440px)");
  return (
    <div className="md:space-y-[10px]">
      <div
        className={`fixed left-0 top-0 z-[100] ${
          isFullscreen ? "block" : "hidden"
        }`}
      >
        <div className="fixed left-[10px] top-[10px] z-[150]" onClick={toggle}>
          <IoMdClose size={lg ? 60 : 35} className="text-primary-light" />
        </div>
        <Swiper
          loop={true}
          navigation
          spaceBetween={0}
          modules={[FreeMode, Navigation, Thumbs]}
          className={"car-details-slider-wrapper-big h-screen w-screen"}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="flex h-full w-full items-center justify-center ">
                <div
                  className="fixed left-0 top-0 h-screen w-full bg-black/80"
                  onClick={toggle}
                />
                <Image
                  src={image.attributes.url}
                  alt={
                    image.attributes.alternativeText || image.attributes.name
                  }
                  width={image.attributes.width}
                  height={image.attributes.height}
                  className={cn(
                    "relative  w-fit object-contain md:h-[90vh] md:max-w-[90vw] md:rounded-2xl",
                  )}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        loop={true}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{
          clickable: true,
          enabled: !sm,
        }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className={
          "car-details-slider-wrapper-big h-[200px] xs:h-[300px] sm:h-[400px] md:h-[500px]"
        }
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} onClick={() => setIsFullscreen(true)}>
            <Image
              src={image.attributes.url}
              alt={image.attributes.alternativeText || image.attributes.name}
              width={1920}
              height={1080}
              className="h-full w-full cursor-pointer select-none object-cover md:rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`${sm ? "" : "hidden"}`}>
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={sm ? 4 : 3}
          spaceBetween={10}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
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
                className={
                  "h-full max-h-[90px] w-full select-none  object-cover md:rounded-xl"
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
