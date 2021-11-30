import axios, {AxiosResponse, Method}  from 'axios';
import {Auth} from "aws-amplify";

/* interface IIngredientData {
    inputValue?: string;
    title: string;
    id?: number;
  }
 */

async function getToken() {
  const sessionInfo = await Auth.currentSession();
  const cognitoToken = await sessionInfo.getAccessToken();
  return await cognitoToken.getJwtToken();
}

const apiFetch = async ( type: Method, url: string, data?: any | null, id?: number) => {
    const queryUrl = id ? `${url}/${id}`: url;
    const api = axios.create({
      headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
      },
  });
  
  api.interceptors.request.use(
      async (inputConfig) => {
          const config = inputConfig;
          // Check for and add the stored Auth Token to the header request
          let token = null;
          try {
              token =  await getToken();
              console.log("TOKEN ", token);
          } catch (error) {
              /* Nothing */
          }
          if (token && config.headers) {
              config.headers.Authorization = `Bearer ${token}`;
          }
  
          return config;
      },
      (error) => {
          throw error;
      },
  );

  return await api.request<AxiosResponse | any>({
        method: type,
        url: queryUrl,
        data: data,
        headers: {
          "Content-type": "application/json"
         }
      })
    }

    export default apiFetch;