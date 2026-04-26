import { api } from "../api/baseApi";

export const carSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query<any, void>({
      query: () => ({
        url: "/car",
        method: "GET",
      }),
      providesTags: ["Cars"],
    }),
    addCar: builder.mutation<any, any>({
      query: (data) => ({
        url: "/car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cars"],
    }),
    updateCar: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/car/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Cars"],
    }),
    deleteCar: builder.mutation<any, string>({
      query: (id) => ({
        url: `/car/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carSlice;
