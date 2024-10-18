import axios from 'axios';

let cachedServerIP = null;

const fetchServerIP = async () => {
  if (cachedServerIP) {
    return cachedServerIP;
  }

  try {
    const response = await axios.get('/endpoint.json');
    const endpoints = response.data.endpoints;

    const endpointPromises = endpoints.map(endpoint =>
      axios.get(endpoint + 'api/')
        .then(() => endpoint)
        .catch(error => {
          console.log(`Failed to fetch from ${endpoint}`, error);
          return null;
        })
    );

    const results = await Promise.allSettled(endpointPromises);
    const successfulEndpoint = results.find(result => result.status === 'fulfilled' && result.value);

    if (successfulEndpoint) {
      cachedServerIP = successfulEndpoint.value;
      return cachedServerIP;
    } else {
    }
  } catch (error) {
    console.error("Error fetching endpoint.json:", error);

  }
};

export default fetchServerIP;