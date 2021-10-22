import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch } from ".";
import { RootState } from ".";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector