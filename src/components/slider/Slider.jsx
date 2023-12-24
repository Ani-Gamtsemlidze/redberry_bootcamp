import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "../../context/BlogContextProvider";
import BlogCard from "../blogs/blogCard/BlogCard";

function Slider({ categoryId }) {
  const [sliderData, setSliderData] = useState([]);
  const { blogsList } = useBlogs();
  const params = useParams();

  useEffect(() => {
    const filterData = blogsList?.find((blog) => blog.id === Number(params.id));

    if (filterData) {
      const filteredBlogs = blogsList?.filter((blog) => {
        return categoryId.some((categoryIdItem) => {
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
    <div>
      {sliderData?.map((blog, index) => (
        <BlogCard key={index} blogCard={blog} />
      ))}
    </div>
  );
}

export default Slider;
