import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CoinHeaders = {
  "x-rapidapi-key": `${import.meta.env.VITE_APP_RAPIDAPI_KEY}`,
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
};

const Url = {
  baseUrl: "https://coinranking1.p.rapidapi.com",
};

const createRequest = (url) => ({ url, headers: CoinHeaders });
export const CryptoApi = createApi({
  reducerPath: "CryptoApi",
  baseQuery: fetchBaseQuery(Url),
  endpoints: (builder) => ({
    getCrypto: builder.query({
      query: () => createRequest(`/coins`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
    getCryptoOhlcData: builder.query({
      query: ({ coinId, interval }) =>
        createRequest(`coin/${coinId}/ohlc?interval=${interval}`),
    }),
  }),
});
export const {
  useGetCryptoQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoOhlcDataQuery,
} = CryptoApi;
