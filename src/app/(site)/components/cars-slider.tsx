"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
import { Car } from "@/types/api/car";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CarItem from "@/components/cars/car-item";
import { useEffect, useState } from "react";
import CarSkeleton from "@/components/ui/car-skeleton";

type Props = {
  cars: Car[];
};
export default function CarsSlider({ cars }: Props) {
  const lg = useMediaQuery("(min-width:1280px)");
  const sm = useMediaQuery("(min-width:648px)");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex gap-4">
          <CarSkeleton />
          <CarSkeleton />
          <CarSkeleton className="hidden sm:block" />
          <CarSkeleton className="hidden lg:block" />
        </div>
      ) : (
        <Swiper
          effect="fade"
          spaceBetween={10}
          slidesPerView={lg ? 4 : sm ? 3 : 2}
          autoplay={{
            pauseOnMouseEnter: true,
          }}
          modules={[FreeMode, Thumbs, Autoplay]}
          className="top-cars-slider"
        >
          {cars.map((car) => (
            <SwiperSlide
              className="my-3 h-fit w-fit overflow-hidden rounded-2xl shadow-md"
              key={car.id}
            >
              <CarItem car={car} key={car.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
