import { apiSlice } from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // we login and get a token with and expiration connection time and number of connection
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: {
          ...credentials,
        },
      }),
    }),
    // to stop the connection we need to ask the clearing of token allowed.
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }), //this action hels us clean/reset the state of the app
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("data from the fulfilled logout", data);
          dispatch(logout);
          setTimeout(() => dispatch(apiSlice.util.resetApiState()), 1000);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // to get a new token from the server since the previous has expired
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useSendLogoutMutation } =
  authApiSlice;
