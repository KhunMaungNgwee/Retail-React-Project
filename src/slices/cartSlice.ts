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
        state.cart.push(item);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const productID = action.payload;

      const existingItem = state.cart.find(
        (item) => item.productID === productID
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item.productID !== productID
          );
        }
      }
    },
    RemoveItem(state, action: PayloadAction<string>) {
      const productID = action.payload;
      state.cart = state.cart.filter((item) => item.productID !== productID);
    },
    clearCart(state) {
      state.cart = []; // Clear all items in the cart
    },
    
  },
});

export const { addToCart, removeFromCart, RemoveItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
