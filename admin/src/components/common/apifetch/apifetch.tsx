import axios, {AxiosResponse, Method}  from 'axios';

interface IIngredientData {
    inputValue?: string;
    title: string;
    id?: number;
  }

export const fetchIngredients = ( type: Method, url: string, data?: IIngredientData | null, id?: number) => {

    const queryUrl = id ? `${url}/${id}`: url;
  return axios.request<AxiosResponse>({
        method: type,
        url: queryUrl,
        data: data,
        headers: {
          "Content-type": "application/json"
         }
      })
    }