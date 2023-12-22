import axios from "axios";
import { useEffect, useState } from "react";

const DataFetcher = (url, token) => {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setBlogData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
        console.error("Axios error:", err);
      }
    };
    fetchData();
  }, [url, token]);
  return { blogData, isLoading, error };
};
export default DataFetcher;
