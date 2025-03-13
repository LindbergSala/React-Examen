import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const placeOrder = createAsyncThunk("order/placeOrder", async (_, { getState }) => {
  const cart = getState().cart.items;

  const requestBody = JSON.stringify({
    items: cart.map(item => item.id)
  });

  console.log("Sending order to API:", requestBody);

  try {
    const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/oj40/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": "yum-tBCC15CdlDcqTJ4b",
      },
      body: requestBody,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data); 
      throw new Error(`API Error: ${data.message || "Unknown error"}`);
    }

    console.log("API Order Response:", data); 
    return data.order; 

  } catch (error) {
    console.error("Fetch Error:", error.message);
    return { id: "Error", eta: null }; 
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: { orderId: null, eta: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        console.log("Order Saved:", action.payload);

        state.orderId = action.payload.id || "Error";

        // Omvandla ETA från ISO-tid till minuter
        if (action.payload.eta) {
          const etaTime = new Date(action.payload.eta);
          const currentTime = new Date();
          const etaMinutes = Math.round((etaTime - currentTime) / 60000); // Konvertera ms till minuter
          state.eta = etaMinutes > 0 ? etaMinutes : 1;
        } else {
          state.eta = Math.floor(Math.random() * 30) + 10;
        }

        state.status = "success";
      });
  },
});

export default orderSlice.reducer;
