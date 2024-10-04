import { configureStore } from "@reduxjs/toolkit";
import { CryptoApi } from "../CryptoApi/Api";

export const store = configureStore({
  reducer: {
    [CryptoApi.reducerPath]: CryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CryptoApi.middleware), // Existing middleware
});
