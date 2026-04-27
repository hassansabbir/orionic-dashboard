import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://10.10.7.94:5004/api/v1",
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const refreshToken = Cookies.get("refreshToken");

  let result = await baseQuery(args, api, extraOptions);

  console.log("API request result:", result);

  if (result.error) {
    if (result.error.status === 401) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions,
      );

      console.log("Refresh token API result:", refreshResult);

      if (
        refreshResult?.data &&
        typeof refreshResult.data === "object" &&
        "data" in refreshResult.data
      ) {
        localStorage.removeItem("authToken");
        localStorage.setItem(
          "authToken",
          (refreshResult.data as any).data.accessToken,
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Refresh token invalid or expired. Logging out...");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("refreshToken");
        toast("Access token has expired, Please login again.");
        window.location.replace("/auth/login");
      }
    } else if (result.error.status === 400) {
      console.error("Bad request error:", result.error);
    } else if (result.error.status === "PARSING_ERROR") {
      console.error(
        "Parsing error - received HTML instead of JSON:",
        result.error,
      );
    } else {
      console.error("Unexpected error:", result.error);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Banner", "AdminData", "Cars", "Reviews", "AboutUs", "Contact", "Members", "FAQ"],
  endpoints: () => ({}),
});

export const imageUrl = "http://10.10.7.94:5004";
