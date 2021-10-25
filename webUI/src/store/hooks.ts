import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch } from ".";
import { AppStateType } from ".";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppStateType  > = useSelector