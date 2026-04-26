import { Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useLoginMutation } from "@/redux/apiSlices/authSlice";
import logo from "../../assets/logo.png";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [login] = useLoginMutation();

  const onFinish = async (values: LoginFormValues): Promise<void> => {
    try {
      const response = (await login(values).unwrap()) as LoginResponse;
      const { accessToken, refreshToken } = response?.data || {};

      if (rememberMe) {
        localStorage.setItem("authToken", accessToken || "");
        localStorage.setItem("refreshToken", refreshToken || "");
        Cookies.set("refreshToken", refreshToken || "");
      } else {
        sessionStorage.setItem("authToken", accessToken || "");
        sessionStorage.setItem("refreshToken", refreshToken || "");
        Cookies.set("refreshToken", refreshToken || "");
      }

      navigate("/");
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Logo Section */}
      <div className="mb-10 w-full max-w-[320px]">
        <img src={logo} alt="Orienco Logo" className="w-full h-auto object-contain" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-[32px] font-bold text-[#344054] mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-[16px] text-[#475467]">Login to your account</p>
      </div>

      <Form
        onFinish={onFinish}
        layout="vertical"
        className="w-full"
        requiredMark={false}
      >
        {/* Email Field */}
        <Form.Item
          name="email"
          label={<span className="text-[14px] font-semibold text-[#344054]">Email</span>}
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          className="mb-5"
        >
          <Input
            placeholder="Enter your email"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#344054] focus:border-[#344054] transition-all text-[15px] placeholder:text-[#98A2B3]"
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          name="password"
          label={<span className="text-[14px] font-semibold text-[#344054]">Password</span>}
          rules={[{ required: true, message: "Please input your password!" }]}
          className="mb-4"
        >
          <Input.Password
            placeholder="Enter your password"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#344054] focus:border-[#344054] transition-all text-[15px] placeholder:text-[#98A2B3]"
          />
        </Form.Item>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-8">
          <Checkbox 
            onChange={(e) => setRememberMe(e.target.checked)} 
            className="text-[15px] font-medium text-[#344054]"
          >
            Remember Password
          </Checkbox>

          <Link
            to="/auth/forgot-password"
            className="text-[15px] font-semibold text-[#344054] hover:text-black transition-colors underline underline-offset-4 decoration-[#D0D5DD]"
          >
            Forgot Password
          </Link>
        </div>

        {/* Submit Button */}
        <Form.Item className="mb-0">
          <button
            type="submit"
            className="w-full h-[56px] bg-[#111827] text-white rounded-xl text-[18px] font-bold hover:bg-[#374151] transition-all shadow-xl shadow-black/20"
          >
            Sign In
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
