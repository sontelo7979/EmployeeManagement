import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "@services/apis/base.query";
import {
  ILoginRequest,
  ILoginResponse,
  IResponse,
  IUser,
} from "@services/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponse>, ILoginRequest>({
      query: (body) => ({
        url: "/Auth/login",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/Auth/logout",
        method: "POST",
      }),
    }),

    getCurrent: builder.query<IResponse<IUser>, void>({
      query: () => ({
        url: "/Auth/current",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyGetCurrentQuery, useLogoutMutation } =
  authApi;
