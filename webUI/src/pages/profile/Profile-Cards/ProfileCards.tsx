import "./ProfileCards.scss";
import {Button} from "../../../components/common/button/Button";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Redirect} from "react-router-dom";
import {Auth} from "aws-amplify";
import CardsModal from "./CardsModal";
import visaImg from '../../../assets/ProfileCards/VISA.png';
import mastercardImg from '../../../assets/ProfileCards/mastercard.png';

type cardType = {
    cardName: string,
    cardValidity: string,
    cardCVV: string,
    cardNumber: string,
}

function ProfileCards() {
    //добавить сокрытие номера карты
    // добавить логотипы карты (VISA/MASTER)
    const user = useAppSelector(state => state.auth.user);
    let cardData: any;
    try {
        cardData = JSON.parse(user.attributes["custom:card_number"]);
    } catch (err) {
        cardData = {};
    }
    const cardDataArray: Array<cardType> = Object.values(cardData);
    console.log(cardData);
    console.log(Object.values({}))
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false)

    if (!user) {
        return <Redirect to="/login"/>
    }

    const onToggleHandler = () => {
        if (editMode) {
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    }
    const showModalHandler = () => {
        setShowModal(true);
    }
    const hideModalHandler = () => {
        setShowModal(false);
    }

    const deleteCardHandler = async (cardNumber: any) => {
        delete cardData[cardNumber];
        try {
            if (user) {
                await Auth.updateUserAttributes(user, {["custom:card_number"]: JSON.stringify(cardData)});
                const updatedUser = await Auth.currentAuthenticatedUser();
                dispatch(
                    {
                        type: "UPDATE_USER_ATTR",
                        payload: updatedUser,
                    }
                )
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <>
        <>
            {showModal && <CardsModal onHideModal={hideModalHandler}/>}
            <div className={"profileCards"}>
                {cardDataArray.length ?
                    <ul className={"profileCards__list"}>
                        {cardDataArray.map(card => {
                            return <li className={"profileCards__item"} key={card.cardNumber}>
                                {editMode && <div className={"profileCards__image"}>
                                    <img src={+card.cardNumber[0] < 5 ? visaImg : mastercardImg}
                                         alt={+card.cardNumber[0] < 5 ? "VISA" : "MASTERCARD"}/>
                                </div>}
                                <div className="profileCards__info">
                                    <div>**** **** **** {card.cardNumber.slice(-4)}</div>
                                    <div>{card.cardValidity}</div>
                                    <div>{card.cardName}</div>
                                </div>
                                {editMode && <button className="profileCards__deleteBtn" type="button" onClick={() => {
                                    deleteCardHandler(card.cardNumber)
                                }}>Удалить</button>}
                            </li>;
                        })}
                    </ul> :
                    <p className="profileCards__text">Хотите добавить банковскую карту для онлайн оплаты в Ocean
                        Bar?</p>
                }
                <div className="profileCards__controls">
                    <Button type={"button"} onClick={onToggleHandler}>{editMode ? "Готово" : "Изменить"}</Button>
                    {editMode && <Button type="button" onClick={showModalHandler}>Добавить карту</Button>}
                </div>
            </div>
        </>
    </>
}

export default ProfileCards;