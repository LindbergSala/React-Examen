import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // ✅ Lägg till vara i varukorgen
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },

    // ✅ Ta bort en instans av en vara från varukorgen
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },

    // ✅ Rensa hela varukorgen
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// ✅ Exportera actions för att kunna användas i komponenter
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// ✅ Exportera reducer för att användas i store
export default cartSlice.reducer;
