import { useResetPasswordMutation } from "@/redux/apiSlices/authSlice";
import { Form, Input } from "antd";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const ResetPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const onFinish = async (values: ResetPasswordFormValues): Promise<void> => {
    try {
      const response = (await resetPassword({
        token: token || "",
        data: values,
      }).unwrap()) as ApiResponse;
      
      if (response?.success) {
        setShowSuccess(true);
      } else {
        toast.error(response?.message || "Failed to update password.");
      }
    } catch (error: any) {
      toast.error(typeof error === 'string' ? error : "An error occurred.");
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center text-center">
        {/* Success Icon with Confetti Effect */}
        <div className="relative mb-10 mt-10">
          <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center relative z-10 shadow-2xl shadow-black/20">
            <FiCheck size={80} className="text-white" />
          </div>
          {/* Mock Confetti Elements */}
          <div className="absolute top-0 left-0 w-full h-full -z-0">
            <div className="absolute -top-10 -left-10 w-4 h-8 bg-red-400 rotate-45 rounded-full" />
            <div className="absolute -top-10 right-0 w-6 h-3 bg-orange-400 -rotate-12 rounded-full" />
            <div className="absolute top-20 -right-12 w-4 h-4 bg-red-400 rotate-12 rounded-sm" />
            <div className="absolute bottom-0 -left-12 w-3 h-6 bg-green-400 -rotate-45 rounded-full" />
            <div className="absolute -bottom-10 right-20 w-8 h-4 bg-blue-400 rotate-12 rounded-full" />
            <div className="absolute top-10 -right-5 w-2 h-5 bg-orange-500 rotate-45 rounded-full" />
          </div>
        </div>

        <h1 className="text-[32px] font-bold text-[#111827] mb-4 tracking-tight">
          Password Changed!
        </h1>
        <p className="text-[16px] text-[#475467] max-w-[400px] mb-10 leading-relaxed">
          Your password has been updated successfully. You can now sign in
          securely.
        </p>

        <button
          onClick={() => navigate("/auth/login")}
          className="w-full h-[56px] bg-[#111827] text-white rounded-xl text-[18px] font-bold hover:bg-[#374151] transition-all shadow-xl shadow-black/20"
        >
          Get Started
        </button>
      </div>
    );
  }

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
          Set New Password
        </h1>
        <p className="text-[16px] text-[#475467] max-w-[360px] mx-auto">
          Create a new password for your account.
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        className="w-full"
        requiredMark={false}
      >
        <Form.Item
          name="newPassword"
          label={
            <span className="text-[14px] font-semibold text-[#344054]">
              Password
            </span>
          }
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
          className="mb-6"
        >
          <Input.Password
            placeholder="Enter your password"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#344054] focus:border-[#344054] transition-all text-[15px] placeholder:text-[#98A2B3]"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={
            <span className="text-[14px] font-semibold text-[#344054]">
              Confirm Password
            </span>
          }
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
          className="mb-10"
        >
          <Input.Password
            placeholder="Re-enter your password"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#344054] focus:border-[#344054] transition-all text-[15px] placeholder:text-[#98A2B3]"
          />
        </Form.Item>

        <Form.Item className="mb-4">
          <button
            type="submit"
            className="w-full h-[56px] bg-[#111827] text-white rounded-xl text-[18px] font-bold hover:bg-[#374151] transition-all shadow-xl shadow-black/20"
          >
            Confirm
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

export default ResetPassword;
