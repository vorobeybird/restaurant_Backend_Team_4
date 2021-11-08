import { MenuConstants } from "./menu.types";
import { AppDispatch } from "../../store";
import axios, { AxiosResponse } from "axios";
import { Response } from "./menu.types";
import { useSelector } from "react-redux";

const GET_CATEGORIES_URL: any = `${process.env.REACT_APP_GET_DISHES}/api/category`;
const GET_DISHES_URL: any = `${process.env.REACT_APP_GET_DISHES}/api/dishes`;

const getCategories = async () => {
  const response = (await axios.get(GET_CATEGORIES_URL)) as AxiosResponse<Response>;
  return response.data;
};

const getDishes = async () => {
  const response = (await axios.get(GET_DISHES_URL)) as AxiosResponse<Response>;
  return response.data;
};

export const fetchCategories = () => async (dispatch: AppDispatch) => {
  const categories = await getCategories();
  dispatch({ type: MenuConstants.GET_CATEGORIES, payload: categories });
};

export const fetchDishes = () => async (dispatch: AppDispatch) => {
  const dishes = await getDishes();
  dispatch({ type: MenuConstants.GET_DISHES, payload: dishes });
};

export const setSelectedCategory = (id: number) => (dispatch: AppDispatch) => {
  dispatch({type: MenuConstants.SET_SELECTED_CATEGORY, payload: id });
}