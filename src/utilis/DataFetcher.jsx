import axios from "axios";
import { useEffect, useState } from "react";

const DataFetcher = (url, token) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => setData(res.data))
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, [url, token]);

  return { data };
};
export default DataFetcher;
