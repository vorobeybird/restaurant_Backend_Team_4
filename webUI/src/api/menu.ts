import axios, { AxiosResponse } from "axios"
import { Response } from "../features/menu/menu.types"

export const getItems = async () => {
  const response = await axios.get('') as AxiosResponse<Response>
  return response.data
}