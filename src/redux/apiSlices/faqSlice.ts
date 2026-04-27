import { api } from "../api/baseApi";

export const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFAQs: builder.query<any, { platform: string }>({
      query: (params) => ({
        url: "/faq",
        params,
      }),
      providesTags: ["FAQ"],
    }),

    addFAQ: builder.mutation<any, any>({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    updateFAQ: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    deleteFAQ: builder.mutation<any, string>({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),
  }),
});

export const {
  useGetFAQsQuery,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;
