import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "../../context/BlogContextProvider";
import BlogCard from "../blogs/blogCard/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";

import prevArrow from "../../../public/images/slider-arrow-prev.png";
import nextArrow from "../../../public/images/slider-arrow-next.png";

// Import Swiper styles
import "swiper/css";

function Slider({ categoryId }) {
  const [nextSlide, setNextSlide] = useState(true);
  const [prevSlide, setPrevSlide] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const { blogsList } = useBlogs();
  const params = useParams();

  const sliderRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const swiperInstance = sliderRef.current.swiper;

    swiperInstance.on("reachEnd", () => {
      setNextSlide(false);
      setPrevSlide(true);
    });

    swiperInstance.on("reachBeginning", () => {
      setPrevSlide(false);
      setNextSlide(true);
    });

    return () => {
      swiperInstance.off("reachEnd");
      swiperInstance.off("reachBeginning");
    };
  }, [sliderData]);

  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  };

  useEffect(() => {
    const filterData = blogsList?.find((blog) => blog.id === Number(params.id));

    if (filterData) {
      const filteredBlogs = blogsList?.filter((blog) => {
        return categoryId?.some((categoryIdItem) => {
          return blog.categories?.some(
            (blogCategory) => blogCategory.id === categoryIdItem.id
          );
        });
      });
      const filteredSliderData = filteredBlogs?.filter(
        (blog) => blog.id !== filterData.id
      );

      setSliderData(filteredSliderData);
    }
  }, [blogsList, params.id, categoryId]);

  return (
    <div className="common_container">
      <div className="slider_header">
        <span>მსგავსი სტატიები</span>

        <div className="slider_navigation">
          <div className="prev-arrow" onClick={handlePrev}>
            <img
              style={{
                backgroundColor: prevSlide ? "#5d37f3" : "#E4E3EB",
              }}
              className="arrow"
              src={prevArrow}
            />
          </div>
          <div className="next-arrow" onClick={handleNext}>
            <img
              style={{
                backgroundColor:
                  nextSlide && sliderData.length > 3 ? "#5d37f3" : "#E4E3EB",
              }}
              className="arrow"
              src={nextArrow}
            />
          </div>
        </div>
      </div>
      <Swiper
        ref={sliderRef}
        slidesPerView={3}
        cssMode={true}
        mousewheel={true}
        keyboard={true}
        className="mySwiper"
      >
        {sliderData?.map((blog, index) => (
          <SwiperSlide key={index}>
            <BlogCard blogCard={blog} slider />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
