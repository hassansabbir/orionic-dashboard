import { api } from "../api/baseApi";

interface LoginData {
  email: string;
  password: string;
}

interface OtpVerifyData {
  email: string;
  oneTimeCode: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    otpVerify: builder.mutation<any, OtpVerifyData>({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/verify-account",
          body: data,
        };
      },
    }),
    login: builder.mutation<any, LoginData>({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/admin-login",
          body: data,
        };
      },
      transformResponse: (data: any) => {
        return data;
      },
      transformErrorResponse: (baseQueryReturnValue: any) => {
        const { data } = baseQueryReturnValue;
        const { message } = data || {};
        return message || "An error occurred";
      },
    }),
    forgotPassword: builder.mutation<any, ForgotPasswordData>({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/forget-password",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation<
      any,
      { token: string; data: ResetPasswordData }
    >({
      query: ({ token, data }) => {
        return {
          method: "POST",
          url: `/auth/reset-password?token=${token}`,
          body: data,
        };
      },
    }),

    changePassword: builder.mutation<any, ChangePasswordData>({
      query: (value) => {
        return {
          method: "POST",
          url: "/auth/change-password",
          body: value,
        };
      },
      invalidatesTags: ["AdminData"],
    }),

    profile: builder.query<any, void>({
      query: () => {
        return {
          method: "GET",
          url: "/user/me",
        };
      },
      providesTags: ["AdminData"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/user/profile",
          body: data,
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    fetchAdminProfile: builder.query<any, void>({
      query: () => {
        return {
          method: "GET",
          url: "/admin/profile",
        };
      },
    }),
  }),
});

export const {
  useOtpVerifyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useProfileQuery,
  useFetchAdminProfileQuery,
} = authSlice;
