import { useParams } from "react-router-dom";
import InnerBlog from "../../components/blogs/innerBlog/InnerBlog";
import Slider from "../../components/slider/Slider";
import DataFetcherGet from "../../utilis/DataFetcherGet";
import styles from "./BlogDetail.module.css";

function BlogDetail() {
  // fetch each blog by id
  const params = useParams();
  const { blogData } = DataFetcherGet(
    `https://api.blog.redberryinternship.ge/api/blogs/${params.id}`,
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1"
  );
  return (
    <div className={styles.blogDetail_page}>
      <InnerBlog blogDetails={blogData} />
      <Slider categoryId={blogData.categories} />
    </div>
  );
}

export default BlogDetail;
