import axios, { AxiosResponse } from 'axios';
import { Order, OrderConstants } from "../store/order/order.types";

const BASE_URL: string = process.env.REACT_APP_GET_DISHES as string;

const instance = axios.create({
  baseURL: BASE_URL as string
});

export const orderAPI = {
  getOrders(customer_id: string) {
    return axios.get(`${BASE_URL}/api/orderByCustomer/${customer_id}`)
      .then(response => {
        return response.data;
      })
  },
  changeOrderStatus(orderId: number, newStatus: string) {
    return axios.put(`${BASE_URL}/api/order/${orderId}`, {status: newStatus})
    .then(response => response);
  }
}