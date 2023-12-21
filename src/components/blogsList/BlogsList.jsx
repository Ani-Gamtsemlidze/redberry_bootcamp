import DataFetcher from "../../utilis/DataFetcher";
import styles from "./BlogsList.module.css";
import BlogCard from "../blogCard/BlogCard";
import { useContext, useEffect, useState } from "react";
import { BlogTheme } from "../../context/BlogContext";

function BlogsList() {
  const ctxBlog = useContext(BlogTheme);
  console.log(ctxBlog.blogsList);
  return (
    <div className={styles.blog_box}>
      {ctxBlog.blogsList.data?.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </div>
  );
}

export default BlogsList;
