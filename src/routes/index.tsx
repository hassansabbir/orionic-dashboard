import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Faq from "../Pages/Dashboard/Faq";
import AboutUs from "@/components/ui/Settings/AboutUs";
import ContactUs from "../Pages/Dashboard/ContactUs";
import TeamMembers from "../Pages/Dashboard/TeamMembers";
import ContactMessages from "../Pages/Dashboard/ContactMessages";
import Review from "@/Pages/Dashboard/Review";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
      <Main />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/review",
        element: <Review />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/team-members",
        element: <TeamMembers />,
      },
      {
        path: "/contact-messages",
        element: <ContactMessages />,
      },
      {
        path: "/f-a-q",
        element: <Faq />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
