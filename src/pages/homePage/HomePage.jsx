import Categories from "../../components/categories/Categories";
import Header from "../../components/header/Header";
import banner from "../../../public/images/Blog.png";
import styles from "./HomePage.module.css";
import BlogsList from "../../components/blogs/blogsList/BlogsList";

function Banner() {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>ბლოგი</h1>
      <img src={banner} />
    </div>
  );
}
function HomePage() {
  return (
    <div className={styles.home_page}>
      <Banner />
      <Categories />
      <BlogsList />
    </div>
  );
}

export default HomePage;
