import React, { useEffect } from "react";
import { Modal, Input, Form, Button } from "antd";
import { IoCloseOutline } from "react-icons/io5";

interface AddFaqModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  mode: "add" | "edit";
  initialValues?: any;
  loading?: boolean;
}

const AddFaqModal: React.FC<AddFaqModalProps> = ({
  open,
  onCancel,
  onSubmit,
  mode,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialValues) {
        form.setFieldsValue({
          question: initialValues.question,
          answer: initialValues.answer,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, mode, initialValues, form]);

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  const labelStyle = "block text-[12px] font-medium text-[#344054] mb-1.5";
  const inputStyle =
    "rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors";

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
      closeIcon={
        <IoCloseOutline
          size={22}
          className="text-gray-500 hover:text-black transition-colors"
        />
      }
      className="car-modal"
      styles={{
        content: {
          borderRadius: "8px",
          padding: "32px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
        body: { padding: "0" },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            {mode === "add" ? "Add FAQ" : "Edit FAQ"}
          </h2>
        </div>

        <div className="space-y-6">
          <Form.Item
            name="question"
            label={<span className={labelStyle}>Question</span>}
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Enter question" className={`h-[40px] ${inputStyle}`} />
          </Form.Item>

          <Form.Item
            name="answer"
            label={<span className={labelStyle}>Answer</span>}
            rules={[{ required: true, message: "Required" }]}
          >
            <Input.TextArea
              placeholder="Enter answer"
              rows={4}
              className={inputStyle}
            />
          </Form.Item>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
            <Button
              onClick={onCancel}
              className="px-8 py-2.5 h-auto rounded-[6px] text-[14px] font-medium text-[#344054] bg-[#F3F4F6] border-none hover:bg-[#E5E7EB] transition-colors shadow-none"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-8 py-2.5 h-auto rounded-[6px] text-[14px] font-medium text-white bg-[#111827] border-none hover:bg-gray-900 transition-colors shadow-none"
            >
              {mode === "add" ? "Save" : "Update Changes"}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddFaqModal;
