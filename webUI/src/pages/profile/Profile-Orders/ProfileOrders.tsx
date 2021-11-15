import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../store";
import { AuthStateType } from "../../../store/auth/auth.reducer";
import "./profileOrders.scss";
import { useCallback, useEffect, useState } from "react";
import { orderAPI } from "../../../api/api";
import { useAppSelector } from "../../../store/hooks";
import { Order } from "../../../store/order/order.types";


export const ProfileOrders = () => {
	const user = useSelector<AppStateType, AuthStateType>(state => state.auth.user);
	const userId = useAppSelector((state) => state.auth?.user?.attributes?.sub);
	const [orders, setOrders] = useState([]);
	useState(orderAPI.getOrders());
	const ordersByUserId = useCallback(() => {
		const filtredOrders = () =>  orders.map((order: Order, index: number) => {
			order.customer_id === userId;
		});
		return filtredOrders();
	}, [orders],);


	if (user === null) {
		return <Redirect to="/login" />
	}
	return (
		<div className="orders-container">
			<div className="orders-switcher">

			</div>
		</div>
	)
}

export default ProfileOrders;