import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {stat} from "fs";

interface BasketItem {
    id: number;
    price: number;
    quantity: number;
    filename: string;
    title: string;
}


const initialState: BasketItem[] = [];

const basketSlice = createSlice({

    name: "basket",
    initialState,
    reducers: {
        setItems: (state, action:PayloadAction<BasketItem[]>) => {
            state = action.payload;
        },
        addItemToBasket: (state, action:PayloadAction<BasketItem>) => {
            state.push(action.payload);
        },
        deleteItemFromBasket: (state, action:PayloadAction<number>) => {
            state.filter((item) => item.id !== action.payload);
        },
        increaseItemQuantity: (state, action: PayloadAction<number>) => {
            state[action.payload].quantity += 1;
        },
        decreaseItemQuantity: (state, action: PayloadAction<number>) => {
            state[action.payload].quantity -= 1;
        }
    },

});

export const {decreaseItemQuantity, increaseItemQuantity, setItems, addItemToBasket, deleteItemFromBasket} = basketSlice.actions;
export default basketSlice.reducer;