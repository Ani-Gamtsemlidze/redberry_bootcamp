import axios from "axios";
import { useEffect, useState } from "react";

const useDataFetcherPost = (initialUrl, initialData) => {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(initialUrl, {
          email: initialData,
        });
        console.log(response);
        setResponseData(response);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
        console.error("Axios error:", err);
      }
    };

    fetchData();
  }, [initialUrl, initialData]);

  return { responseData, isLoading, error };
};

export default useDataFetcherPost;
