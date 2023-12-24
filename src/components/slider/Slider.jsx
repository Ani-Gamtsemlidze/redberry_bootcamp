import { useEffect, useState } from "react";
import { useBlogs } from "../../context/BlogContextProvider";
import BlogCard from "../blogs/blogCard/BlogCard";

function Slider({ categoryId }) {
  const [sliderData, setSliderData] = useState([]);
  const { blogsList } = useBlogs();
  //   console.log(categoryId);

  useEffect(() => {
    // console.log(blogsList);
    const filteredBlogs = blogsList?.filter((blog) => {
      return categoryId.some((categoryIdItem) => {
        console.log(categoryIdItem.id);
        return blog.categories.some(
          (blogCategory) => blogCategory.id === categoryIdItem.id
        );
      });
    });
    setSliderData(filteredBlogs);
  }, [blogsList]);

  console.log(sliderData);
  return (
    <div>
      {sliderData?.map((blog, index) => (
        // <p>{blog.title}</p>
        <BlogCard key={index} blogCard={blog} />
      ))}
      {/* {sliderData.title} */}
      {/* <BlogCard blogCard={sliderData} /> */}
    </div>
  );
}

export default Slider;
