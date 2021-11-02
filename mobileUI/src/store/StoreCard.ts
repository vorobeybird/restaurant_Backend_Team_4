import { createSlice } from "@reduxjs/toolkit";
interface CounterState {
    dishes: Dish[];
  }
interface Dish {
    id: string;
    title:string;
    photos:any[];
    price:number;
    cardQuantity:number;
}

const initialState:CounterState = {
    dishes:[]
}
const dishSlice = createSlice({
    name:"dishSlice",
    initialState,
    reducers: {
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
        
    }
})
export default dishSlice.reducer;
export const {addToCard,delFromCard, decreaseCartQuant, } = dishSlice.actions;