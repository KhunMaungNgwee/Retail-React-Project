import { ProductType } from "@/api/product/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cart: ProductType[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductType>) {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.productID === item.productID
      );
    
      if (existingItem) {
        // Check if adding the new quantity exceeds the stock
        if (existingItem.quantity + item.quantity > item.stock) {
          window.alert(`Cannot add more than available stock. Stock: ${item.stock}`);
          return; // Exit the reducer if adding exceeds stock
        }
        existingItem.quantity += item.quantity;
      } else {
        // Check if the new item can be added without exceeding stock
        if (item.quantity > item.stock) {
          window.alert(`Cannot add item. Stock: ${item.stock}`);
          return; // Exit the reducer if initial quantity exceeds stock
        }
        state.cart = [...state.cart, item];
      }
    }
,    
    
    removeFromCart(state, action: PayloadAction<string>) {
      const productID = action.payload;
    
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productID === productID
      );
    
      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        if (existingItem.quantity > 1) {
          // Decrease the quantity immutably
          state.cart = [
            ...state.cart.slice(0, existingItemIndex),
            { ...existingItem, quantity: existingItem.quantity - 1 },
            ...state.cart.slice(existingItemIndex + 1),
          ];
        } else {
          // Remove the item immutably
          state.cart = [
            ...state.cart.slice(0, existingItemIndex),
            ...state.cart.slice(existingItemIndex + 1),
          ];
        }
      }
    },
    
    RemoveItem(state, action: PayloadAction<string>) {
      const productID = action.payload;
      // Use filter to immutably remove the item
      state.cart = state.cart.filter((item) => item.productID !== productID);
    },
    
    clearCart(state) {
      // Clear all items immutably by resetting to an empty array
      state.cart = [];
    }
    
    
  },
});

export const { addToCart, removeFromCart, RemoveItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
