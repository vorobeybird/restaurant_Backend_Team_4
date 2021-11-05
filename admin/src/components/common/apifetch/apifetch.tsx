import axios, {AxiosResponse, Method}  from 'axios';

/* interface IIngredientData {
    inputValue?: string;
    title: string;
    id?: number;
  }
 */
const apiFetch = async ( type: Method, url: string, data?: any | null, id?: number) => {

    const queryUrl = id ? `${url}/${id}`: url;
  return await axios.request<AxiosResponse | any>({
        method: type,
        url: queryUrl,
        data: data,
        headers: {
          "Content-type": "application/json"
         }
      })
    }

    export default apiFetch;