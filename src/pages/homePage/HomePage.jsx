import Categories from "../../components/categories/Categories";
import Header from "../../components/header/Header";
import banner from "../../../public/images/Blog.png";
import styles from "./HomePage.module.css";
import BlogsList from "../../components/blogsList/BlogsList";
import LoginBox from "../../components/loginBox/LoginBox";

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
    <>
      <Header />
      <Banner />
      <Categories />
      <BlogsList />
      <LoginBox />
    </>
  );
}

export default HomePage;
