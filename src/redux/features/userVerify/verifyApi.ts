import { baseApi } from "../../Api/baseApi";

export const verifyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyAccout: builder.mutation({
      query: (data) => ({
        url: "/verifyAccount",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "verify"],
    }),
  }),
});

export const { useVerifyAccoutMutation } = verifyApi;
