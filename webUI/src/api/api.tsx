import axios, { AxiosResponse } from 'axios';
import { Order, OrderConstants } from "../store/order/order.types";
const BASE_URL: string = process.env.REACT_APP_GET_DISHES as string;

const instance = axios.create({
  baseURL: BASE_URL as string
});

export const orderAPI = {
  getOrders() {
    axios.get(`${BASE_URL}/api/order`)
      .then((response) => {
        return response;
      })
  }
}