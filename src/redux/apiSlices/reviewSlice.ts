import { api } from "../api/baseApi";

export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<any, { platform: string }>({
      query: ({ platform }) => ({
        url: `/review`,
        params: { platform },
      }),
      providesTags: ["Reviews"],
    }),

    addReview: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    updateReview: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation<any, string>({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
