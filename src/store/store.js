import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./auth/auth.slice.jsx";
import productSlice from "./products/product.slice";
import userSlice from "./user/user.slice.js";
import { userApi } from "./user/userApi.js";
import { inventoryApi } from "./inventory/inventory.api.js";
import { orderApi } from "./order/order.api.js";
import { productApi } from "./products/productApi.js";
import { CartApi } from "./Cart/cartApi.js";

export const store = configureStore({
  reducer: {
    auth: authenticationSlice,
    product: productSlice,
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer
  },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(inventoryApi.middleware)
      .concat(orderApi.middleware)
      .concat(productApi.middleware)
      .concat(CartApi.middleware())
});
