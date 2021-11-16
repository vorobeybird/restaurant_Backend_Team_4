export type AuthStateType = {
    username: string
    name: string
    family_name: string
    phone_number: string
    email: string
    password: string
    confirmCode: string
    card_number: string
    formType: "signUp" | "signIn" | "confirmSignUp" | "signedIn" | "signOut" | "togglePassword" | "confirmForgotPassword"
    user: null | any
    //как определить тайп юзера
}

type actionType = {
    type: string
    payload?: any
}
const initialState: AuthStateType = {
    username: "",
    name: "",
    family_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmCode: "",
    formType: "signIn",
    card_number: "",
    user: null
}

export function authReducer(state: AuthStateType = initialState, action: actionType): AuthStateType {
    switch (action.type) {
        case "SIGN_UP":
            return {...state, formType: "confirmSignUp"};
        // case "CONFIRM_SIGN_UP":
        //      return {...state, formType: "signIn"};
        case "SIGN_IN":
            return {...state, user: action.payload, username: "", confirmCode: "", password: "", formType: "signedIn"};
        case "SIGN_OUT":
            return {...state, user: null, username: "", password: "", confirmCode: "", formType: "signIn"};
        case "TOGGLE_SIGN_UP":
            return {...state, formType: "signUp"};
        case "TOGGLE_SIGN_IN":
            return {...state, formType: "signIn"};
        case "TOGGLE_PASSWORD":
            return {...state, formType: "togglePassword"};
        case "FORGOT_PASSWORD":
            return {...state, formType: "confirmForgotPassword", username: action.payload};
        case "CONFIRM_FORGOT_PASSWORD":
            return {...state, formType: "signIn", username: "", password: "", confirmCode: ""}
        case "CHECK_USER":
            return {...state, user: action.payload, formType: "signedIn"};
        case "UPDATE_STATE" :
            return {...state, [action.payload.name]: action.payload.value};
        case "UPDATE_USER_ATTR" :
            return {...state, user: action.payload};
        default:
            return state;
    }
}