import { useForgotPasswordMutation } from "@/redux/apiSlices/authSlice";
import { Form, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";

interface ForgotPasswordFormValues {
  email: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values: ForgotPasswordFormValues): Promise<void> => {
    try {
      const response = (await forgotPassword({
        email: values.email,
      }).unwrap()) as ApiResponse;

      if (response?.success) {
        toast.success(response?.message || "OTP sent successfully");
        navigate(`/auth/verify-otp?email=${values.email}`);
      } else {
        toast.error(response?.message || "Failed to send reset link");
      }
    } catch (error: any) {
      toast.error(typeof error === 'string' ? error : "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Logo Section */}
      <div className="mb-10 w-full max-w-[320px]">
        <img src={logo} alt="Orienco Logo" className="w-full h-auto object-contain" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-[32px] font-bold text-[#344054] mb-2 tracking-tight">Reset Password</h1>
        <p className="text-[16px] text-[#475467] max-w-[360px] mx-auto">
          Enter the email address associated with your account.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish} className="w-full" requiredMark={false}>
        <Form.Item
          label={<span className="text-[14px] font-semibold text-[#344054]">Email</span>}
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          className="mb-8"
        >
          <Input
            placeholder="Enter your email"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#344054] focus:border-[#344054] transition-all text-[15px] placeholder:text-[#98A2B3]"
          />
        </Form.Item>

        <Form.Item className="mb-4">
          <button
            type="submit"
            className="w-full h-[56px] bg-[#111827] text-white rounded-xl text-[18px] font-bold hover:bg-[#374151] transition-all shadow-xl shadow-black/20"
          >
            Send Reset Link
          </button>
        </Form.Item>

        <Link
          to="/auth/login"
          className="w-full h-[56px] flex items-center justify-center border border-[#D0D5DD] text-[#344054] rounded-xl text-[18px] font-bold hover:bg-gray-50 transition-all"
        >
          Back to Sign In
        </Link>
      </Form>
    </div>
  );
};

export default ForgotPassword;
