import { api } from "../api/baseApi";

export const aboutUsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query<any, { platform: string }>({
      query: ({ platform }) => ({
        url: `/about-us`,
        params: { platform },
      }),
      providesTags: ["AboutUs"],
    }),

    addAboutUs: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/about-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    updateAboutUs: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/about-us/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    deleteAboutUs: builder.mutation<any, string>({
      query: (id) => ({
        url: `/about-us/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AboutUs"],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useAddAboutUsMutation,
  useUpdateAboutUsMutation,
  useDeleteAboutUsMutation,
} = aboutUsApi;
