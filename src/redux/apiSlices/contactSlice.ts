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
  }),
});

export const { useGetContactInfoQuery, useUpdateContactInfoMutation } =
  contactApi;
