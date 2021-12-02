import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../store";
import { AuthStateType } from "../../../store/auth/auth.reducer";
import "./profileOrders.scss";
import { useEffect, useState } from "react";
import { orderAPI } from "../../../api/api";
import { useAppSelector } from "../../../store/hooks";
import { Link } from "react-router-dom";
import moment from 'moment';
import Delete from "../../../assets/delete.png";
import toast, { Toaster } from "react-hot-toast";

export interface Order {
  delivery_method: string;
  payment_method: number;
  customer_id: string;
  total_price: number;
  delivery_date: Date;
  comment: string;
  OrderDishes: DishSettingsInfo[];
  adress: string;
  contact_name: string;
  contact_phone: string;
  num_of_persons: number;
  status: string;
  id: number
}

export interface DishSettingsInfo {
  dish_id: number;
  excluded_ingredients: string;
  quantity: number;
  Dish: DishShortInfo;
}

export interface DishShortInfo {
  title: string;
  calories: number;
  id: number;
  price: number;
  weight: number;
}

const paymentMethod = ["Наличными", "Картой онлайн", "Картой на месте"];

export const ProfileOrders = () => {
  const user = useSelector<AppStateType, AuthStateType>(state => state.auth.user);
  const userId = useAppSelector((state) => state.auth?.user?.attributes?.sub);
  const [ordersCurrent, setOrdersCurrent] = useState([] as Order[]);
  const [ordersHistory, setOrdersHistory] = useState([] as Order[]);
  const [ordersType, setOrdersType] = useState('current');
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [resStatus, setResStatus] = useState<boolean>(false);
  const ordersPerPage: number = 3;
  
  const tableData: Order[] = ordersType === "current" ? ordersCurrent : ordersHistory;
  const pages: number = Math.ceil(tableData.length / ordersPerPage);
  const currentPage = Math.min(pages, selectedPage);

  const userComparer = (a: any, b: any) => {
    if(a.delivery_date > b.delivery_date) return 1;
    if(a.delivery_date < b.delivery_date) return -1;
    return 0;
  }

  useEffect(() => {
    orderAPI.getOrders(userId)
      .then(async (orders: any) => {
        setOrdersCurrent(await orders.filter((order: Order) => ["Принят в работу", "Готовится", "Изменен", "Отправлен"].includes(order.status)).sort(userComparer).reverse());
        setOrdersHistory(await orders.filter((order: Order) => ["Готов", "Отменен"].includes(order.status)).sort(userComparer).reverse());
      })
  }, [resStatus]);

  const onCurrentClicked = () => {
    setOrdersType('current');
    setSelectedPage(1);
    setResStatus(!resStatus);
  }

  const onHistoryClicked = () => {
    setOrdersType('history');
    setSelectedPage(1);
    setResStatus(!resStatus);
  }

  const renderColumn = (colName: string) => {
    return (
      <th>
        <div className="table-head" >
          <div className="table-head__description">{colName}</div>
        </div>
      </th>
    )
  }

  const cancelReservation = async (orderId: number) => {
    const orderStatus = "Отменен";
    await orderAPI.changeOrderStatus(orderId, orderStatus)
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Бронирование стола отменено`);
          console.log(`Отменен заказ на бронирование стола с id = ${orderId}`);
          setResStatus(!resStatus);
        } else toast.error(`Не удалось отменить!`);
      })
  }

  const renderRows = () => {
    let tableRows: any = [];
    if (tableData.length) {
      let startOrder = ordersPerPage * currentPage - ordersPerPage;
      for (let i = startOrder; i < Math.min(ordersPerPage * currentPage, tableData.length); i++) {
        tableRows.push(
          <tr className="table-row">
            <td>{
              tableData[i].OrderDishes.map(el => {
                return (<div>{el.Dish.title}</div>)
              })
            }</td>
            <td>{tableData[i].delivery_method === "takeaway" ? "Навынос" :
              tableData[i].delivery_method === "bookTable" ? "Бронирование стола" :
                tableData[i].delivery_method === "delivery" ? "Доставка" : null
            }</td>
            <td>{moment(tableData[i].delivery_date).format("DD.MM.YYYY HH.mm")}</td>
            <td>
              <div className={
                tableData[i].status === "Готовится" ? "status-wrapper status-in-progress" :
                  tableData[i].status === "Готов" ? "status-wrapper status-done" :
                    tableData[i].status === "Отменен" ? "status-wrapper status-canceled" :
                      tableData[i].status === "Изменен" ? "status-wrapper status-shanged" :
                        tableData[i].status === "Принят в работу" ? "status-wrapper status-in-progress" :
                          undefined
              }>
                &#8226;{tableData[i].status}
              </div>
            </td>
            <td>
              <span className="td-total-price">
                {tableData[i].total_price}
              </span>
              &#8194;BYN
            </td>
            <td>{paymentMethod[tableData[i].payment_method]}</td>
            <td>
              {tableData[i].delivery_method === "bookTable" && tableData[i].total_price === 0 && tableData[i].OrderDishes.length === 0 && ordersType === "current"
                ? <div className="td-cancellation">
                  <button className="td__btn" onClick={() => cancelReservation(tableData[i].id)}>
                    <img src={Delete}></img>
                  </button>
                </div>
                : null}
            </td>
          </tr>
        );
      }
    }
    return tableRows;
  }

  const renderTable = () => {
    const selectNextPage = () => {
      if (pages > 0) {
        if (currentPage < pages) {
          setSelectedPage(currentPage + 1);
        }
      }
    }

    const selectPrevioustPage = () => {
      if (pages > 0) {
        if (currentPage > 1) {
          setSelectedPage(currentPage - 1)
        }
      }
    }

    return (
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
              {renderColumn(ordersType === "current" ? "Отмена" : "")}
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
        <div className="orders-table__pages-list-container">
          <div className="pages-list-container__info">{currentPage} из {pages}</div>
          <button className="pages-list-container__btn" onClick={selectPrevioustPage}>
            &#60;
          </button>
          <button className="pages-list-container__btn" onClick={selectNextPage}>
            &#62;
          </button>
        </div>
      </div>
    );
  }

  if (user === null) {
    return <Redirect to="/login" />
  }
  return (
    <div className="orders-container">
      <div className="orders-switcher">
        <button
          className={ordersType === "current" ? "orders-switcher__btn active" : "orders-switcher__btn"}
          onClick={onCurrentClicked}>Текущие
        </button>
        <button
          className={ordersType === "history" ? "orders-switcher__btn active" : "orders-switcher__btn"}
          onClick={onHistoryClicked}>История
        </button>
      </div>
      {ordersType === "current" && ordersCurrent.length === 0 || ordersType === "history" && ordersHistory.length === 0
        ?
        (<div className="orders__empty">
          <div className="orders__message">
            {ordersType === "current"
              ? ("У вас нет текуших заказов")
              : ('Ваша история заказов пуста')
            }
          </div>
          <Link to="/menu" className="orders__menu-link">
            Перейти в меню
          </Link>
        </div>)
        : renderTable()}
    </div>
  )
}

export default ProfileOrders;