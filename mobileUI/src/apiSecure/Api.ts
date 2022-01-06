import axios from 'axios';
import {Auth} from 'aws-amplify';

async function getToken() {
  const sessionInfo = await Auth.currentSession();
  const cognitoToken = await sessionInfo.getAccessToken();
  return await cognitoToken.getJwtToken();
}

const Api = axios.create({
  // "http://192.168.1.21:5000" || "http://localhost:5000", || Config.API_BASE_URL;
  baseURL: process.env.REACT_APP_GET_DISHES,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

Api.interceptors.request.use(
  async inputConfig => {
    const config = inputConfig;
    // Check for and add the stored AuthenticationScreen Token to the header request
    let token = null;
    try {
      token = await getToken();
      console.log('TOKEN ', token);
    } catch (error) {
      /* Nothing */
    }
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    throw error;
  },
);

export default Api;
