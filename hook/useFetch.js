import { useState, useEffect } from "react";
import axios from 'axios';
// const cheerio = require('cheerio');
// const RNFS = require('react-native-fs');

const useFetch = (query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    // try {
      const url = `https://www.rozee.pk/job/jsearch/q/web%20developer`;
      const response = await axios.get(url);
      const html = response.data;
      alert(html);
      const alljobtitles = html.matchAll(/title_ns/gi);
      for (const match of alljobtitles) {
        const matchIndex = match.index;
        const matchValue = matchIndex+1;
        alert(`Found "title_ns" at index ${matchIndex}, ${html[matchValue]}`);
      }

      


    //   setData(extractedData);
    //   setIsLoading(false);
    // } catch (error) {
    //   setError(error);
    //   alert('Error fetching data. Please try again later.');
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
