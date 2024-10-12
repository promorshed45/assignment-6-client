import { baseApi } from "../../Api/baseApi";

export const verifyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyAccout: builder.mutation({
      query: (data) => ({
        url: "/verifyAccount",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["verify"],
    }),
    
    getAllVerifyInFo: builder.query({
      query: () => ({
        url: "/verifyAccount/all-payment",
        method: "GET",
        
      }),
      providesTags: ["verify"],
    }),
  }),
});

export const { useVerifyAccoutMutation ,useGetAllVerifyInFoQuery} = verifyApi;
