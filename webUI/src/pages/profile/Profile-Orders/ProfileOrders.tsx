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
	// const userId = useAppSelector((state) => state.auth?.user?.attributes?.sub);
  const userId = "123132";
	const [orders, setOrders] = useState([] as  Order[]);

  useEffect(() => {
    orderAPI.getOrders(userId).then((orders) => setOrders(orders as Order[]));
  },[userId]);

  console.log(orders);

  const renderColumn = (colName: string) => {
    return (
      <th>
        <div className="table-head" >
          <div className="table-head__description">{colName}</div>
        </div>
      </th>
    )
  }
  
	if (user === null) {
		return <Redirect to="/login" />
	}
	return (
		<div className="orders-container">
			<div className="orders-switcher">
        <button className="orders-switcher__btn active">Текущие</button>
        <button className="orders-switcher__btn">История</button>
			</div>
      <div className="orders-table__container">
        <table>
          <thead>
            <tr>
              {renderColumn("Название блюда")}
              {renderColumn("Тип заказа")}
              {renderColumn("Дата/Время")}
              {renderColumn("Статус")}
              {renderColumn("Итого")}
              {renderColumn("Способ оплаты")}
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
		</div>
	)
}

export default ProfileOrders;