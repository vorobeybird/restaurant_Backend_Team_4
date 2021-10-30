import axios, { AxiosResponse } from "axios"
import { Response } from "../features/menu/menu.types"

export const getItems = async () => {
  const response = await axios.get('http://18.192.61.153:5000/api/dish') as AxiosResponse<Response>
  return response.data
}