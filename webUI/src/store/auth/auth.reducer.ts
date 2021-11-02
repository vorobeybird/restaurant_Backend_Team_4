export type AuthStateType = {
    username: string
    password: string
    confirmCode: string
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
    password: "",
    confirmCode: "",
    formType: "signUp",
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
            return {...state, user: null, username: "", password: "", confirmCode: "", formType: "signUp"};
        case "TOGGLE_SIGN_IN_SIGN_UP":
            if (state.formType === "signUp") {
                return {...state, formType: "signIn"};
            } else {
                return {...state, formType: "signUp"};
            }
        case "TOGGLE_PASSWORD":
            return {...state, formType: "togglePassword"}
        case "FORGOT_PASSWORD":
            return {...state, formType: "confirmForgotPassword", username: action.payload}
        case "CONFIRM_FORGOT_PASSWORD":
            return {...state, formType: "signIn", username: "", password: "", confirmCode: ""}
        case "CHECK_USER":
            return {...state, user: action.payload, formType: "signedIn"};
        case "UPDATE_STATE" :
            return {...state, [action.payload.name]: action.payload.value}
        default:
            return state;
    }
}