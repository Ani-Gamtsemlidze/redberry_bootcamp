import Categories from "../../components/categories/Categories";
import Header from "../../components/header/Header";
import banner from "../../../public/images/Blog.png";
import styles from "./HomePage.module.css";
import BlogsList from "../../components/blogsList/BlogsList";
import LoginBox from "../../components/loginBox/LoginBox";
import { useBlogs } from "../../context/BlogContextProvider";

function Banner() {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>ბლოგი</h1>
      <img src={banner} />
    </div>
  );
}
function HomePage() {
  const { isPopUp } = useBlogs();
  return (
    <div style={{ backgroundColor: "#E4E3EB", position: "relative" }}>
      <Header />
      {isPopUp ? <LoginBox /> : null}
      {/* <div style={{ position: "relative" }}> */}
      <Banner />
      {/* </div> */}
      <Categories />
      <BlogsList />
    </div>
  );
}

export default HomePage;
