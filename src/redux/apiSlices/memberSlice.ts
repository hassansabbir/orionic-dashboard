import { api } from "../api/baseApi";

export const memberApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<any, void>({
      query: () => ({
        url: "/member",
      }),
      providesTags: ["Members"],
    }),

    addMember: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Members"],
    }),

    updateMember: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/member/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Members"],
    }),

    deleteMember: builder.mutation<any, string>({
      query: (id) => ({
        url: `/member/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Members"],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = memberApi;
