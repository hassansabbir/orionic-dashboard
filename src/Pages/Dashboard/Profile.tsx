import { useState, useEffect } from "react";
import { Form, Input, Button, Tabs } from "antd";
import { FiCamera } from "react-icons/fi";
import {
  useProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import getImageUrl from "@/components/ui/getImageUrl";

const PersonalInfo = ({
  userData,
  imageFile,
}: {
  userData: any;
  imageFile: File | null;
}) => {
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
        address: userData.address || "",
      });
    }
  }, [userData, form]);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();

      // Constructing the data object for the stringified 'data' field
      const profileData = {
        name: values.name,
        phone: values.phone,
        address: values.address,
      };

      formData.append("data", JSON.stringify(profileData));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await updateProfile(formData).unwrap();
      if (response.success) {
        toast.success(response.message || "Profile updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label={
            <span className="text-[#344054] font-semibold text-[15px]">
              Name
            </span>
          }
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            placeholder="Enter your name"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#111827] focus:border-[#111827] transition-all"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={
            <span className="text-[#344054] font-semibold text-[15px]">
              Email
            </span>
          }
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input
            disabled
            className="h-[52px] rounded-xl border-[#D0D5DD] bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label={
            <span className="text-[#344054] font-semibold text-[15px]">
              Phone Number
            </span>
          }
        >
          <Input
            placeholder="Enter your phone number"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#111827] focus:border-[#111827] transition-all"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label={
            <span className="text-[#344054] font-semibold text-[15px]">
              Address
            </span>
          }
        >
          <Input
            placeholder="Enter your address"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#111827] focus:border-[#111827] transition-all"
          />
        </Form.Item>

        <div className="md:col-span-2 mt-6">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="h-[52px] px-10 bg-[#111827] hover:bg-[#374151] !important rounded-xl text-[16px] font-bold border-none shadow-lg shadow-black/10"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values: any) => {
    try {
      const response = await changePassword(values).unwrap();
      if (response.success) {
        toast.success(response.message || "Password changed successfully");
        form.resetFields();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-xl">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          name="current_password"
          label={
            <span className="text-[#344054] font-semibold text-[15px]">
              Current Password
            </span>
          }
          rules={[
            { required: true, message: "Please input current password!" },
          ]}
          className="mb-6"
        >
          <Input.Password
            placeholder="Enter current password"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#111827] focus:border-[#111827] transition-all"
          />
        </Form.Item>

        <Form.Item
          name="new_password"
          label={
            <span className="text-[#344054] font-semibold text-[15px]">
              New Password
            </span>
          }
          rules={[
            { required: true, message: "Please input new password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
          className="mb-6"
        >
          <Input.Password
            placeholder="Enter new password"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#111827] focus:border-[#111827] transition-all"
          />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label={
            <span className="text-[#344054] font-semibold text-[15px]">
              Confirm Password
            </span>
          }
          dependencies={["new_password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
          className="mb-10"
        >
          <Input.Password
            placeholder="Confirm new password"
            className="h-[52px] rounded-xl border-[#D0D5DD] hover:border-[#111827] focus:border-[#111827] transition-all"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className="w-full h-[56px] bg-[#111827] hover:bg-[#374151] !important rounded-xl text-[18px] font-bold border-none shadow-lg shadow-black/10"
        >
          Update Password
        </Button>
      </Form>
    </div>
  );
};

const Profile = () => {
  const { data: userData, isLoading } = useProfileQuery();
  const [activeTab, setActiveTab] = useState("1");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.image) {
      setImagePreview(userData.image);
    }
  }, [userData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-gray-500 font-medium">Loading profile...</div>
    );
  }

  const items = [
    {
      key: "1",
      label: "Personal Information",
      children: <PersonalInfo userData={userData} imageFile={imageFile} />,
    },
    {
      key: "2",
      label: "Change Password",
      children: <ChangePassword />,
    },
  ];

  return (
    <div className="p-6 pb-12">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden mb-8">
        {/* Profile Info Overlay */}
        <div className="px-8 py-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[32px] border border-gray-100 bg-gray-50 shadow-sm overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={getImageUrl(imagePreview)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center text-white text-4xl font-bold">
                  {userData?.name?.charAt(0) || "S"}
                </div>
              )}
            </div>
            <label
              htmlFor="profile-image"
              className="absolute bottom-1 right-1 p-2 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-black transition-all transform hover:scale-105 cursor-pointer"
            >
              <FiCamera size={18} />
              <input
                type="file"
                id="profile-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center justify-center md:justify-start gap-3">
              {userData?.name || "Super Admin"}
              <span className="px-3 py-1 bg-gray-900 text-white text-[10px] rounded-full uppercase tracking-widest font-bold">
                {userData?.role || "ADMIN"}
              </span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">{userData?.email}</p>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-8">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          className="custom-tabs"
        />
      </div>

      <style>{`
        .custom-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid #F2F4F7 !important;
        }
        .custom-tabs .ant-tabs-tab {
          padding: 12px 0 20px 0 !important;
          margin-right: 40px !important;
        }
        .custom-tabs .ant-tabs-tab-btn {
          color: #667085 !important;
          font-size: 16px !important;
          font-weight: 600 !important;
        }
        .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #111827 !important;
        }
        .custom-tabs .ant-tabs-ink-bar {
          background: #111827 !important;
          height: 3px !important;
          border-radius: 3px 3px 0 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Profile;
