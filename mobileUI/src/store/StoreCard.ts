import { createSlice } from "@reduxjs/toolkit";
interface CounterState {
    dishes: Dish[];
    cardTotalQuantity:number;
    cardTotalAmount:number;
    orderType:string;
    date:any;
    paymentType:string;
    email:string;
    password:string;
    isSignedIn:boolean;
    adress:Adress[];
    card:Card[]; 
}
interface Card {
    num:number;
    live:number;
    cvv:number;
    name:number;
    id:number;
    type:string;
}
interface Adress {
    adress:string;
    id: string;
}
interface Dish {
    id: string;
    title:string;
    photos:any[];
    price:number;
    cardQuantity:number;

    

}

export const initialState:CounterState = {
    dishes: [],
    cardTotalQuantity: 0,
    cardTotalAmount: 0,
    orderType: "",
    date: "",
    paymentType: "",
    email:"",
    password:"",
    isSignedIn:false,
    adress:[],
    card:[],
}
export const dishSlice = createSlice({
    name:"dishSlice",
    initialState,
    reducers: {
        reset: state => initialState,
        addToCard(state,action) {

            const itemIndex = state.dishes.findIndex( item => item.id === action.payload.id)
            if (itemIndex>= 0){
                state.dishes[itemIndex].cardQuantity +=1
            } else {
                const tempProd = {... action.payload, cardQuantity:1}
                state.dishes.push(tempProd)
            }
            
        },
        delFromCard(state,action) {
            const nextItems = state.dishes.filter(
                dishes => dishes.id !== action.payload.id
            )
            
            state.dishes = nextItems
        },
        decreaseCartQuant(state,action) {
            const itemIndex = state.dishes.findIndex(
                dishes => dishes.id === action.payload.id
            ) 
            if(state.dishes[itemIndex].cardQuantity > 1){
                state.dishes[itemIndex].cardQuantity -= 1
            } else if(state.dishes[itemIndex].cardQuantity === 1){
                const nextItems = state.dishes.filter(
                    dishes => dishes.id !== action.payload.id
                )
                state.dishes = nextItems
            }
        },
        getTotals(state, action) {
            let { total, quantity } = state.dishes.reduce(
              (cartTotal, cartItem) => {
                const { price, cardQuantity } = cartItem;
                const itemTotal = price * cardQuantity;
      
                cartTotal.total += itemTotal;
                cartTotal.quantity += cardQuantity;
      
                return cartTotal;
              },
              {
                total: 0,
                quantity: 0,
              }
            );
            total = parseFloat(total.toFixed(2));
            state.cardTotalQuantity = quantity;
            state.cardTotalAmount = total;
        },
        clearCart(state){
            state.dishes = []
        },
        addOrderType(state, action) {
            state.orderType = action.payload
            console.log(state.orderType)
        },
        addDate(state, action) {
            state.date = action.payload
            console.log(state.date)
        },
        addPaymentType(state,action) {
            state.paymentType = action.payload
            console.log(state.paymentType)
        },
        addEmail(state, action) {
            state.email = action.payload
            console.log(state.email)
        },
        addPassword(state, action) {
            state.password = action.payload
            console.log(state.password)
        },
        addSignInStat(state,action) {
            state.isSignedIn = action.payload
            console.log(state.isSignedIn)
        },
        addAddress(state,action) {
            const tempProd = {... action.payload}
            let index = Math.floor(Math.random()* 10000000)
            console.log(index)
            tempProd.id = state.adress.length+index
            state.adress.push(tempProd)
        },
        delAdress(state,action) {
            const nextItems = state.adress.filter(
                adress => adress.id !== action.payload.id
            )
            state.adress = nextItems
        },
        addCard(state,action) {
            const tempProd = {... action.payload}
            let index = Math.floor(Math.random()* 10000000)
            
            tempProd.id = state.card.length+index
            const re = new RegExp("^4");
            if (tempProd.num.match(re) != null){
                tempProd.type = 'visa'
            } else {
                tempProd.type = 'master'
            }
                state.card.push(tempProd)
        },
        delCard(state,action) {
            const nextItems = state.card.filter(
                card => card.id !== action.payload.id
            )
            state.card = nextItems
        }

        
    }
})
export default dishSlice.reducer;
export const {reset,addToCard,delFromCard, decreaseCartQuant, getTotals, clearCart, addOrderType, addDate, addPaymentType, addEmail, addSignInStat, addPassword, addAddress, delAdress, addCard, delCard} = dishSlice.actions;