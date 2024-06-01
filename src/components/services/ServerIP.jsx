import { useState, useEffect } from 'react';
import axios from 'axios';

const useServerIP = () => {
  const [serverIP, setServerIP] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/endpoint.json');
        console.log(response);
        setServerIP(response.data.endpoint);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { serverIP, loading, error };
};

export default useServerIP;