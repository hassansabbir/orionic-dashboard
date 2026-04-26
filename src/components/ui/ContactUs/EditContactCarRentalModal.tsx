import React, { useEffect } from "react";
import { Modal, Input, Form, Button } from "antd";
import { IoCloseOutline } from "react-icons/io5";

interface EditContactCarRentalModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  loading?: boolean;
}

const EditContactCarRentalModal: React.FC<EditContactCarRentalModalProps> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue({
        address: initialValues.address || "",
        phoneNumber: initialValues.phoneNumber || "",
        email: initialValues.email || "",
        openHours: initialValues.openHours || "",
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, initialValues, form]);

  const labelStyle = "block text-[12px] font-medium text-[#344054] mb-1.5";
  const inputStyle = "h-[40px] rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors";

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={900}
      centered
      closeIcon={<IoCloseOutline size={22} className="text-gray-500 hover:text-black transition-colors" />}
      className="car-modal"
      styles={{
        content: {
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        body: { padding: "0" }
      }}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit} requiredMark={false}>
        <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Update Contact Details
          </h2>
        </div>

        <div className="space-y-6">
          <Form.Item name="address" label={<span className={labelStyle}>Showroom Address</span>} className="mb-0">
            <Input placeholder="Enter address" className={inputStyle} />
          </Form.Item>

          <Form.Item name="phoneNumber" label={<span className={labelStyle}>Phone Number</span>} className="mb-0">
            <Input placeholder="Enter phone number" className={inputStyle} />
          </Form.Item>

          <Form.Item name="email" label={<span className={labelStyle}>Email</span>} className="mb-0">
            <Input placeholder="Enter email" className={inputStyle} />
          </Form.Item>

          <Form.Item name="openHours" label={<span className={labelStyle}>Showroom Hours</span>} className="mb-0">
            <Input placeholder="Enter hours" className={inputStyle} />
          </Form.Item>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
            <Button
              onClick={onCancel}
              className="px-8 py-2.5 h-auto rounded-[6px] text-[14px] font-medium text-[#344054] bg-[#F3F4F6] border-none hover:bg-[#E5E7EB] shadow-none"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-8 py-2.5 h-auto rounded-[6px] text-[14px] font-medium text-white bg-[#111827] border-none hover:bg-gray-900 shadow-none"
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default EditContactCarRentalModal;
