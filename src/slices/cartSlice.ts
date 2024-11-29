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
      console.log("cart items", state.cart);
      const existingItem = state.cart.find(
        (cartItem) => cartItem.productID === item.productID
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        // Use the spread operator to add the new item to the cart array immutably
        state.cart = [...state.cart, item];
      }
    },
    
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
