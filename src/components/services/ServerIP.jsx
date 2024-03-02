import { useState, useEffect } from 'react';
import axios from 'axios';

const useServerIP = () => {
  const [serverIP, setServerIP] = useState("http://127.0.0.1:8000/");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const EndpointsURL = "http://127.0.0.1:4000/api/endpoints";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(EndpointsURL);
        setServerIP(response.data.server_ip);
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