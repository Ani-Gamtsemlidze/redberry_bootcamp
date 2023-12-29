import axios from "axios";
import { useEffect, useState } from "react";

const DataFetcherGet = (url, token) => {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    window.scrollTo(0, 0);
    fetchData();
  }, [url, token]);
  return { blogData, isLoading, error };
};

export default DataFetcherGet;
