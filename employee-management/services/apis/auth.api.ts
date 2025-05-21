import { createApi } from "@reduxjs/toolkit/query";
import { baseQueryWithReAuth } from "@services/apis/base.query";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "@services/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: "/Auth/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: (body) => ({
        url: "/Auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});
