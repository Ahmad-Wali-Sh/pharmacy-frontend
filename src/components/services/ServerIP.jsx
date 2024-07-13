import { useState, useEffect } from 'react';
import { fetchServerIP } from './serverUtil';

const useServerIP = () => {
  const [serverIP, setServerIP] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ip = await fetchServerIP();
        setServerIP(ip);
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