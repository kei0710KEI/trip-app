import Carousel from "react-multi-carousel";
import { destinationData } from "@/lib/data";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Destination = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="w-[90%] sm:w-[80%] mx-auto">
        <h1 className="text-2xl sm:text-3xl text-blue-950 font-bold text-center mb-4">
          Popular Destinations in Japan
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Discover Japan's most beloved travel spots
        </p>
      </div>
      <div className="mt-8 sm:mt-14 w-[90%] sm:w-[80%] mx-auto">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          removeArrowOnDeviceType={["mobile"]}
          className="pb-8"
        >
          {destinationData.map((data) => {
            return (
              <div key={data.id} className="m-3 group cursor-pointer">
                {/* image div */}
                <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-lg">
                  {/* overlay */}
                  <div className="absolute inset-0 bg-black opacity-25 group-hover:opacity-20 transition-opacity rounded-lg"></div>
                  {/* image */}
                  <a href={data.url} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={data.image}
                      alt={data.city}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </a>
                  {/* text content */}
                </div>
                <div className="mt-4 text-center">
                  <h1 className="text-lg sm:text-xl font-semibold">
                    {data.city}
                  </h1>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Destination;
