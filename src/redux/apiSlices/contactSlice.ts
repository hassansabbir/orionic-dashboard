import { api } from "../api/baseApi";

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContactInfo: builder.query<any, { platform: string }>({
      query: ({ platform }) => ({
        url: `/contact/info`,
        params: { platform },
      }),
      providesTags: ["Contact"],
    }),

    updateContactInfo: builder.mutation<any, any>({
      query: (data) => ({
        url: "/contact/info",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
    getContactMessages: builder.query<any, { platform: string; page?: number; limit?: number }>({
      query: ({ platform, page = 1, limit = 10 }) => ({
        url: "/contact",
        params: { platform, page, limit },
      }),
      providesTags: ["Contact"],
    }),

    deleteContactMessage: builder.mutation<any, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactInfoQuery,
  useUpdateContactInfoMutation,
  useGetContactMessagesQuery,
  useDeleteContactMessageMutation,
} = contactApi;
