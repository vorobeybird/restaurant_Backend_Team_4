import { Button } from "../../components/common/button/Button";
import { MenuItem } from "../../features/menu/menu.types";
import "./menu.scss";
import "@brainhubeu/react-carousel/lib/style.css";
import { addToCart } from "../../store/cart/cart.actions";
import { useAppDispatch } from "../../store/hooks";

const MenuItemComponent = (item: MenuItem) => {
  const dispatch = useAppDispatch();

  const onOrder = (item: MenuItem) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="item_container">
      <div className="item_photos">
        <img src={item.photos[0].photo_url} alt="dish-main-photo" />
      </div>
      <div className="item_info">
        <div className="dish-info">
          <div className="dish-title">{item.title}</div>
          <div className="dish-price-weight">
            <div className="dish-price">
              <span className="price">{item.price}</span>
              <span className="currency"> BYN</span>
            </div>
            <div className="dish-weight">
              <span className="weight">{item.weight}</span>
              <span className="measure"> г.</span>
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
          <Button type="button" onClick={() => onOrder(item)}>
            Заказать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemComponent;
