import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {stat} from "fs";

interface BasketItem {
    id: number;
    price: number;
    quantity: number;
    filename: string;
    title: string;
}

export interface Device {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    brand: string;
    filename: string;
}

const initialState: BasketItem[] = [];

const basketSlice = createSlice({

    name: "basket",
    initialState,
    reducers: {
        setInitialState: (state) => initialState,
        addDeviceToBasket: (state, action: PayloadAction<Device>) => {
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (!existingItem) {
                const newItem: BasketItem = {
                    id: action.payload.id,
                    price: action.payload.price,
                    quantity: 1,
                    filename: action.payload.filename,
                    title: action.payload.title
                }
                state.push(newItem);
            }

        },
        addItemToBasket: (state, action: PayloadAction<BasketItem>) => {
            state.push(action.payload);
        },
        deleteItemFromBasket: (state, action: PayloadAction<number>) =>
            state.filter((item) => item.id !== action.payload)

        ,
        increaseItemQuantity: (state, action: PayloadAction<{ id: number }>) => {
            const item = state.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1
            }
        },
        decreaseItemQuantity: (state, action: PayloadAction<{ id: number }>) => {
            const item = state.find((item) => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1
            }
        }

    },

});

export const {
    addDeviceToBasket,
    decreaseItemQuantity,
    increaseItemQuantity,
    setInitialState,
    addItemToBasket,
    deleteItemFromBasket
} = basketSlice.actions;
export default basketSlice.reducer;