import {
  useForgotPasswordMutation,
  useOtpVerifyMutation,
} from "@/redux/apiSlices/authSlice";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  data?: string;
  message?: string;
}

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string>("");
  const email = new URLSearchParams(location.search).get("email");

  const [otpVerify] = useOtpVerifyMutation();
  const [resendOtp] = useForgotPasswordMutation();

  const onFinish = async (): Promise<void> => {
    try {
      const response = (await otpVerify({
        email: email || "",
        oneTimeCode: otp,
      }).unwrap()) as ApiResponse;

      if (response?.success) {
        localStorage.setItem("Authorization", response.data || "");
        navigate(`/auth/reset-password?email=${email}`);
      } else {
        toast.error(response?.message || "OTP verification failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  const handleResendEmail = async (): Promise<void> => {
    try {
      const response = (await resendOtp({
        email: email || "",
      }).unwrap()) as ApiResponse;

      if (response?.success) {
        toast.success("OTP resent successfully");
      } else {
        toast.error("Failed to resend OTP");
      }
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
        <h1 className="text-[32px] font-bold text-[#344054] mb-2 tracking-tight">Verify Reset Password</h1>
        <p className="text-[16px] text-[#475467] max-w-[360px] mx-auto">
          Enter the code sent to your email to reset your password.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish} className="w-full">
        <div className="flex items-center justify-center mb-10">
          <OTPInput
            value={otp}
            onChange={(otp: string) => setOtp(otp)}
            numInputs={5}
            renderInput={(props) => <input {...props} />}
            containerStyle="flex justify-between w-full gap-4"
            inputStyle={{
              height: "70px",
              width: "70px",
              borderRadius: "12px",
              fontSize: "24px",
              fontWeight: "bold",
              border: "1px solid #D0D5DD",
              backgroundColor: "white",
              color: "#111827",
              outline: "none",
              transition: "all 0.2s",
            }}
          />
        </div>

        <Form.Item className="mb-4">
          <button
            type="submit"
            className="w-full h-[56px] bg-[#111827] text-white rounded-xl text-[18px] font-bold hover:bg-[#374151] transition-all shadow-xl shadow-black/20"
          >
            Verify Code
          </button>
        </Form.Item>

        <Link
          to="/auth/login"
          className="w-full h-[56px] flex items-center justify-center border border-[#D0D5DD] text-[#344054] rounded-xl text-[18px] font-bold hover:bg-gray-50 transition-all mb-6"
        >
          Back to Sign In
        </Link>

        <div className="text-center">
          <p className="text-[16px] text-[#475467]">
            Resend code in <span className="font-bold text-[#344054]">00 : 56</span>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default VerifyOtp;
