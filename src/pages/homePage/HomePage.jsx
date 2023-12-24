import Categories from "../../components/categories/Categories";
import Header from "../../components/header/Header";
import banner from "../../../public/images/Blog.png";
import styles from "./HomePage.module.css";
import LoginBox from "../../components/loginBox/LoginBox";
import BlogsList from "../../components/blogs/blogsList/BlogsList";
import { useLogin } from "../../context/LoginContextProvider";

function Banner() {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>ბლოგი</h1>
      <img src={banner} />
    </div>
  );
}
function HomePage() {
  const { isPopUp } = useLogin();
  return (
    <div className={styles.home_page}>
      <Header />
      <Banner />
      <Categories />
      <BlogsList />
    </div>
  );
}

export default HomePage;
