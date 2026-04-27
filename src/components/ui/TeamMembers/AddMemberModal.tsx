import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Form, Button } from "antd";
import { LuUpload } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import type { UploadFile } from "antd/es/upload/interface";
import getImageUrl from "@/components/ui/getImageUrl";

interface AddMemberModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
  mode: "add" | "edit";
  initialValues?: any;
  loading?: boolean;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  open,
  onCancel,
  onSubmit,
  mode,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialValues) {
        form.setFieldsValue({
          name: initialValues.name,
          designation: initialValues.designation,
        });

        if (initialValues.image) {
          setFileList([
            {
              uid: "-1",
              name: "image",
              status: "done",
              url: getImageUrl(initialValues.image),
            },
          ]);
        }
      } else {
        form.resetFields();
        setFileList([]);
      }
    }
  }, [open, mode, initialValues, form]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));

    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    onSubmit(formData);
  };

  const labelStyle = "block text-[12px] font-medium text-[#344054] mb-1.5";
  const inputStyle =
    "h-[40px] rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors";

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={900}
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
            {mode === "add" ? "Add New Member" : "Edit Member"}
          </h2>
        </div>

        <div className="space-y-6">
          <Form.Item
            name="name"
            label={<span className={labelStyle}>Name</span>}
            className="mb-0"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Member Name" className={inputStyle} />
          </Form.Item>

          <Form.Item
            name="designation"
            label={<span className={labelStyle}>Designation</span>}
            className="mb-0"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="e.g., Founder & CEO" className={inputStyle} />
          </Form.Item>

          <div className="space-y-1.5 pt-2">
            <label className={labelStyle}>Person Picture</label>
            <Upload
              maxCount={1}
              listType="picture"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              className="w-full block"
            >
              {fileList.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center rounded-[6px] border border-dashed border-[#D0D5DD] bg-white py-10 hover:border-[#98A2B3] hover:bg-gray-50 transition-colors cursor-pointer">
                  <LuUpload className="text-[#667085] mb-2" size={28} />
                  <p className="text-[14px] font-semibold text-[#344054]">
                    Click to upload image
                  </p>
                </div>
              )}
            </Upload>
          </div>

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

export default AddMemberModal;
