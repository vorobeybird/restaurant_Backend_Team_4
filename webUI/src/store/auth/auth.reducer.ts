export type AuthStateType = {
    username: string
    password: string
    confirmCode: string
    formType: "signUp" | "signIn" | "confirmSignUp" | "signedIn" | "signOut"
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
            return {...state, user: action.payload, formType: "signedIn"};
        case "SIGN_OUT":
            return {...state, user: null, formType: "signUp"};
        case "TOGGLE":
            if (state.formType === "signUp") {
                return {...state, formType: "signIn"};
            } else {
                return {...state, formType: "signUp"};
            }
        case "CHECK_USER":
            return {...state, user: action.payload, formType: "signedIn"};
        case "UPDATE_STATE" :
            return {...state, [action.payload.name]: action.payload.value}
        default:
            return state;
    }
}