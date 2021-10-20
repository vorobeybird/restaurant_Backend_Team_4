import axios, { AxiosResponse } from "axios"
import { Response } from "../features/menu/menu.types"

export const getItems = async () => {
  const response = await axios.get('http://ec2-18-185-80-4.eu-central-1.compute.amazonaws.com:5000/api/dish') as AxiosResponse<Response>
  return response.data
}