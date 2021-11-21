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
    const user = useAppSelector(state => state.auth.user);
    let cardData: any;
    try {
        cardData = JSON.parse(user.attributes["custom:card_number"]);
    } catch (err) {
        cardData = {};
    }

    const dispatch = useAppDispatch();

    const [cardName, setCardName] = useState<string>("");
    const [cardNameError, setCardNameError] = useState<string>("");
    const [cardValidity, setCardValidity] = useState<string>("");
    const [cardValidityError, setCardValidityError] = useState<string>("");
    const [cardCVV, setCardCVV] = useState<string>("");
    const [cardCvvError, setCardCvvError] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardNumberError, setCardNumberError] = useState<string>("");

    let formIsInvalid: boolean;

    if (cardNameError.trim() || cardValidityError.trim() || cardCvvError.trim() || cardNumberError.trim()) {
        formIsInvalid = true;
    } else {
        formIsInvalid = false;
    }

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

    const cardNameRegEx = new RegExp("^((?:[A-Z]+ ?){2})$");
    const cardValidityRegEx = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
    const cardCvvRegEx = new RegExp(/\d{3}$/);
    const cardNumberRegEx = new RegExp(/(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})/);

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
                               error={cardNameError}
                               errorMessage="Недопустимое имя владельца карты"
                               validationSchema={cardNameRegEx}
                               onError={setCardNameError}
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
                               error={cardValidityError}
                               errorMessage="Недопустимое значения срока действия карты (MM/YY)"
                               validationSchema={cardValidityRegEx}
                               onError={setCardValidityError}
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
                               error={cardCvvError}
                               errorMessage="Недопустимое значения CVV-кода банковской карты (###)"
                               validationSchema={cardCvvRegEx}
                               onError={setCardCvvError}
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
                               error={cardNumberError}
                               errorMessage="Недопустимое значения номера банковской карты"
                               validationSchema={cardNumberRegEx}
                               onError={setCardNumberError}
                               onChange={cardNumberChangeHandler}
                        />
                    </div>
                    <Button disabled={formIsInvalid} type="submit">Готово</Button>
                </form>
            </div>
        </div>
    </>

}

export default CardsModal;