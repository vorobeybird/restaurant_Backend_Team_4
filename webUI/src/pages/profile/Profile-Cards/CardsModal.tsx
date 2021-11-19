import "./CardsModal.scss";
import {Button} from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import {ChangeEvent, FormEvent, useState} from "react";
import {Redirect} from "react-router-dom";
import {Auth} from "aws-amplify";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";

type CardsModalType = {
    onHideModal: () => void
}

function CardsModal(props: CardsModalType) {
    //добавить валидацию инпутов
    const user = useAppSelector(state => state.auth.user);
    let cardData: any;
    try {
        cardData = JSON.parse(user.attributes["custom:card_number"]);
    } catch (err) {
        cardData = {};
    }

    const dispatch = useAppDispatch();

    const [cardName, setCardName] = useState<string>("");
    const [cardValidity, setCardValidity] = useState<string>("");
    const [cardCVV, setCardCVV] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");

    const cardNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCardName(e.target.value);
    }
    const cardValidityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCardValidity(e.target.value);
    }
    const cardCVVChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCardCVV(e.target.value);
    }
    const cardNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCardNumber(e.target.value);
    }

    if (user === null) {
        return <Redirect to="/login"/>
    }

    async function updateUserAttributesHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // const cardData = user.attributes["custom:card_number"] ? JSON.parse(user.attributes["custom:card_number"]) : {};
        cardData[cardNumber] = {cardNumber, cardCVV, cardValidity, cardName};
        try {
            if (user && cardNumber.trim() && cardCVV.trim() && cardValidity.trim() && cardName.trim()) {
                await Auth.updateUserAttributes(user, {["custom:card_number"]: JSON.stringify(cardData)});
                const updatedUser = await Auth.currentAuthenticatedUser();
                dispatch(
                    {
                        type: "UPDATE_USER_ATTR",
                        payload: updatedUser,
                    }
                )
                setCardName("");
                setCardValidity("");
                setCardCVV("");
                setCardNumber("");
                props.onHideModal();
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <>
        <div className="backdrop" onClick={props.onHideModal}></div>
        <div className="cardsModal">
            <header className="cardsModal-header">
                <button className="cardsModal-header__button" onClick={props.onHideModal}>&times;</button>
            </header>
            <div className="cardsModal-content">
                <h2 className="cardsModal-content__title">Добавить карту</h2>
                <form className="cardsModal-form" action="#" onSubmit={updateUserAttributesHandler}>
                    <div className="cardsModal-form__control">
                        <label htmlFor="cardName">Имя владельца карты</label>
                        <Input name="cardName"
                               id="cardName"
                               type="text"
                               placeholder="IVAN IVANOV"
                               value={cardName}
                               onChange={cardNameChangeHandler}
                        />
                    </div>
                    <div className="cardsModal-form__control_half">
                        <label htmlFor="cardValidity">Срок действия</label>
                        <Input name="cardValidity"
                               id="cardValidity"
                               type="text"
                               placeholder="MM/YY"
                               value={cardValidity}
                               onChange={cardValidityChangeHandler}
                        />
                    </div>
                    <div className="cardsModal-form__control_half">
                        <label htmlFor="cvc">CVC/CVV</label>
                        <Input name="cvc"
                               id="cvc"
                               type="password"
                               placeholder="###"
                               value={cardCVV}
                               onChange={cardCVVChangeHandler}
                        />
                    </div>
                    <div className="cardsModal-form__control">
                        <label htmlFor="cardNumber">Номер карты</label>
                        <Input name="cardNumber"
                               id="cardNumber"
                               type="text"
                               placeholder="1234 1234 1234 1234"
                               value={cardNumber}
                               onChange={cardNumberChangeHandler}
                        />
                    </div>
                    <Button type="submit">Готово</Button>
                </form>
            </div>
        </div>
    </>

}

export default CardsModal;