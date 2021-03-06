import axios, { AxiosResponse } from 'axios';
import { Order, OrderConstants } from "../store/order/order.types";
import Api from "../store/Api";

const BASE_URL: string = process.env.REACT_APP_GET_DISHES as string;

const instance = axios.create({
  baseURL: BASE_URL as string
});

export const orderAPI = {
  getOrders(customer_id: string) {
    return Api.get(`${BASE_URL}/api/orderByCustomer/${customer_id}`)
      .then(response => {
        return response.data;
      })
  },
  changeOrderStatus(orderId: number, newStatus: string) {
    return Api.put(`${BASE_URL}/api/order/${orderId}`, {status: newStatus})
    .then(response => response);
  }
}