import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ICartItem } from "../../store/cart/cart.types";
import { setSelectedDish } from "../../store/dishPage/dishPage.actions";
import { useAppSelector } from "../../store/hooks";
import { fetchDishes } from "../../store/menu/menu.actions";
import { MenuItem } from "../../store/menu/menu.types";
import "./search.scss";

export const Search = () => {
  const [searchString, setSearchString] = useState<string>('');
  const dispatch = useDispatch();
  const items = useAppSelector((state) => state.menu.items);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [searchString]);

  const handleChange = (e: any) => {
    setSearchString(e.target.value);
  }

  const makeSearch = () => {
    const filtredDishes = items.filter(el =>
      el.title.toLowerCase().includes(searchString.toLowerCase())
    )
    return filtredDishes;
  }

  const handleDishClick = (item: ICartItem | MenuItem) => {
    dispatch(setSelectedDish(item));
  }

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__input-container">
          <input
            className="search-input"
            placeholder="Начните поиск..."
            onChange={handleChange}
          >
          </input>
        </div>
        <div className={!searchString.length ? "search__result" : "search__result_active"}>
          {!searchString.length
            ? <div className="search__message">Вы пока ничего не искали...</div>
            : <div className="search__done">
              {!makeSearch().length
                ? <div className="search__empty">По вашему запросу ничего не найдено.</div>
                : makeSearch().map((el, index) => (
                  <Link to="/dishPage" onClick={() => handleDishClick(el)}>
                    {
                      el.photo.length > 0
                        ? <img src={el.photo[0].photo_url} alt="dish-main-photo"></img>
                        : null
                    }
                    <div className="search__dish-title">{el.title}</div>
                    <div className="search__dish-price"><span>{el.price}</span>&#8194;BYN</div>
                  </Link>
                ))}
            </div>}
        </div>
      </div>
    </div>
  )
}