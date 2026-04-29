import {
  useForgotPasswordMutation,
  useOtpVerifyMutation,
} from "@/redux/apiSlices/authSlice";
import { Form } from "antd";
import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  data?: {
    token: string;
  };
  message?: string;
}

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string>("");
  const email = new URLSearchParams(location.search).get("email");

  // Dual timers
  const [resendTimer, setResendTimer] = useState(180); // 3 minutes for resend
  const [_, setTotalTimer] = useState(300); // 5 minutes for total timeout
  const [isExpired, setIsExpired] = useState(false);

  const [otpVerify] = useOtpVerifyMutation();
  const [resendOtp] = useForgotPasswordMutation();

  useEffect(() => {
    const interval = setInterval(() => {
      // Resend timer countdown
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));

      // Total timeout countdown
      setTotalTimer((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")} : ${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const onFinish = async (): Promise<void> => {
    if (isExpired) return;
    try {
      const response = (await otpVerify({
        email: email || "",
        oneTimeCode: otp,
      }).unwrap()) as ApiResponse;

      if (response?.success) {
        const token = response.data?.token;
        toast.success(response.message || "OTP verified successfully");
        navigate(`/auth/reset-password?token=${token}`);
      } else {
        toast.error(response?.message || "OTP verification failed!");
      }
    } catch (error: any) {
      // Robust error message extraction
      const errorMsg =
        typeof error === "string"
          ? error
          : error?.data?.message || "An error occurred";
      toast.error(errorMsg);
    }
  };

  const handleResendEmail = async (): Promise<void> => {
    try {
      const response = (await resendOtp({
        email: email || "",
      }).unwrap()) as ApiResponse;

      if (response?.success) {
        toast.success("OTP resent successfully");
        setResendTimer(180); // Reset resend timer
        setTotalTimer(300); // Reset total timeout
        setIsExpired(false);
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
        <img
          src={logo}
          alt="Orienco Logo"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-[32px] font-bold text-[#344054] mb-2 tracking-tight">
          Verify Reset Password
        </h1>
        <p className="text-[16px] text-[#475467] max-w-[360px] mx-auto">
          Enter the code sent to your email to reset your password.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish} className="w-full">
        <div className="flex items-center justify-center mb-10">
          <OTPInput
            value={otp}
            onChange={(otp: string) => setOtp(otp)}
            numInputs={6}
            renderInput={(props) => <input {...props} disabled={isExpired} />}
            containerStyle="flex justify-between w-full gap-2"
            shouldAutoFocus
            inputStyle={{
              height: "64px",
              width: "56px",
              borderRadius: "12px",
              fontSize: "24px",
              fontWeight: "bold",
              border: "1px solid #D0D5DD",
              backgroundColor: isExpired ? "#F9FAFB" : "white",
              color: "#111827",
              outline: "none",
              transition: "all 0.2s",
            }}
          />
        </div>

        <Form.Item className="mb-4">
          <button
            type="submit"
            disabled={isExpired}
            className={`w-full h-[56px] rounded-xl text-[18px] font-bold transition-all shadow-xl ${
              isExpired
                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                : "bg-[#111827] text-white hover:bg-[#374151] shadow-black/20"
            }`}
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
          {isExpired ? (
            <p className="text-[16px] text-red-500 font-medium">
              OTP timeout, try again later.
            </p>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-[16px] text-[#475467]">
                Resend code in{" "}
                <span className="font-bold text-[#344054]">
                  {formatTime(resendTimer)}
                </span>
              </p>
              {resendTimer === 0 && (
                <button
                  type="button"
                  onClick={handleResendEmail}
                  className="text-[#344054] font-bold underline underline-offset-4 hover:text-black"
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default VerifyOtp;
