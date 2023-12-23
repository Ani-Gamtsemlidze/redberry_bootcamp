import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import ViewBlog from "../../components/viewBlog/ViewBlog";
import DataFetcherGet from "../../utilis/DataFetcherGet";
import styles from "./BlogDetail.module.css";

function BlogDetail() {
  const params = useParams();
  const { blogData } = DataFetcherGet(
    `https://api.blog.redberryinternship.ge/api/blogs/${params.id}`,
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1",
    "GET"
  );
  return (
    <div className={styles.blogDetail_page}>
      <Header />
      <ViewBlog blogDetails={blogData} />
    </div>
  );
}

export default BlogDetail;
