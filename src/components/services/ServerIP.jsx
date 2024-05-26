import { useState, useEffect } from 'react';
import axios from 'axios';

const useServerIP = () => {
  const [serverIP, setServerIP] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const EndpointsURL = "http://127.0.0.1:4000/api/endpoints";
  const EnvAPI = 'http://192.168.88.113:8000/'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(EndpointsURL);
        setServerIP(EnvAPI);
      } catch (error) {
        setError(error);
        setServerIP(EnvAPI);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { serverIP, loading, error };
};

export default useServerIP;