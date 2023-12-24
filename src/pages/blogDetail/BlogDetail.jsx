// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import BlogCard from "../../components/blogs/blogCard/BlogCard";
import InnerBlog from "../../components/blogs/innerBlog/InnerBlog";
import Slider from "../../components/slider/Slider";
// import Header from "../../components/header/Header";
// import LoginBox from "../../components/loginBox/LoginBox";
// import Slider from "../../components/slider/Slider";
// import { useLogin } from "../../context/LoginContextProvider";
import DataFetcherGet from "../../utilis/DataFetcherGet";
import styles from "./BlogDetail.module.css";

function BlogDetail() {
  const params = useParams();
  const { blogData } = DataFetcherGet(
    `https://api.blog.redberryinternship.ge/api/blogs/${params.id}`,
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1"
  );
  // console.log(blogData.categories);
  return (
    <div className={styles.blogDetail_page}>
      <InnerBlog blogDetails={blogData} />
      <Slider categoryId={blogData.categories} />
    </div>
  );
}

export default BlogDetail;
