import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let baseUrl;
if (process.env.NODE_ENV === "development") {
  baseUrl = "https://spanish-app322-ef32a65d357f.herokuapp.com";
} else {
  baseUrl = "";
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const token = getState().auth.token;
      if (token) {
        headers = new Headers({
          ...headers,
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        });
      }
      console.log(headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
