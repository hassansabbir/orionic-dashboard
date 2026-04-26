import React, { useEffect, useState } from "react";
import { Modal, Input, InputNumber, Upload, Form, Button } from "antd";
import { LuUpload } from "react-icons/lu";
import type { UploadFile } from "antd/es/upload/interface";
import getImageUrl from "@/components/ui/getImageUrl";

const { TextArea } = Input;

interface CarModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
  mode: "add" | "edit";
  initialValues?: any;
  loading?: boolean;
}

const CarModal: React.FC<CarModalProps> = ({
  open,
  onCancel,
  onSubmit,
  mode,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [videoFile, setVideoFile] = useState<UploadFile | null>(null);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialValues) {
        form.setFieldsValue({
          ...initialValues,
          features: initialValues.features?.join("\n"),
        });
        
        // Populate existing images
        if (initialValues.images && Array.isArray(initialValues.images)) {
          const formattedImages: UploadFile[] = initialValues.images.map((img: string, index: number) => ({
            uid: `-${index}`,
            name: `image-${index}`,
            status: "done",
            url: getImageUrl(img),
          }));
          setFileList(formattedImages);
        }

        // Populate existing video
        if (initialValues.video) {
          setVideoFile({
            uid: "-video-1",
            name: "Existing Video",
            status: "done",
            url: getImageUrl(initialValues.video),
          });
        }
      } else {
        form.resetFields();
        setFileList([]);
        setVideoFile(null);
      }
    }
  }, [open, mode, initialValues, form]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    
    const data = {
      ...values,
      features: values.features?.split("\n").filter((f: string) => f.trim() !== ""),
      perHour: Number(values.perHour),
      perDay: Number(values.perDay),
      perMonth: Number(values.perMonth),
      seats: Number(values.seats),
    };

    formData.append("data", JSON.stringify(data));

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    if (videoFile?.originFileObj) {
      formData.append("video", videoFile.originFileObj);
    }

    onSubmit(formData);
  };

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
      className="car-modal"
      styles={{
        content: {
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
        {/* Modal Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            {mode === "add" ? "Add New Car" : "Edit Car Details"}
          </h2>
        </div>

        <div className="space-y-6">
          {/* Brand Name */}
          <Form.Item name="brand" label={<span className={labelStyle}>Brand Name *</span>} className="mb-0">
            <Input placeholder="e.g.. Tesla Model 3" className={inputStyle} />
          </Form.Item>

          {/* Car Name */}
          <Form.Item name="name" label={<span className={labelStyle}>Car Name *</span>} className="mb-0">
            <Input placeholder="e.g.. Tesla Model 3" className={inputStyle} />
          </Form.Item>

          {/* Description */}
          <Form.Item name="description" label={<span className={labelStyle}>Description *</span>} className="mb-0">
            <TextArea rows={4} placeholder="Describe the car features and benefits..." className="rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] p-3 resize-none hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors" />
          </Form.Item>

          {/* Features */}
          <Form.Item name="features" label={<span className={labelStyle}>Features*</span>} className="mb-0">
            <TextArea rows={4} placeholder="Describe the car features and benefits..." className="rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] p-3 resize-none hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors" />
          </Form.Item>

          {/* Car Video Upload */}
          <div className="space-y-1.5">
            <label className={labelStyle}>Car Video (Max 1)</label>
            <Upload
              maxCount={1}
              fileList={videoFile ? [videoFile] : []}
              onChange={({ fileList }) => setVideoFile(fileList[0] || null)}
              beforeUpload={() => false}
              className="w-full block"
              listType="picture"
            >
              {!videoFile && (
                <div className="w-full flex flex-col items-center justify-center rounded-[6px] border border-dashed border-[#D0D5DD] bg-white py-8 hover:border-[#98A2B3] hover:bg-gray-50 transition-colors cursor-pointer">
                  <LuUpload className="text-[#667085] mb-2" size={24} />
                  <p className="text-[14px] font-semibold text-[#344054]">Click to upload Video</p>
                  <p className="text-[12px] text-[#98A2B3] mt-1">0 / 1 video uploaded</p>
                </div>
              )}
            </Upload>
          </div>

          {/* Car Images Upload */}
          <div className="space-y-1.5">
            <label className={labelStyle}>Car Images (Max 6)</label>
            <Upload
              multiple
              maxCount={6}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              className="w-full block"
              listType="picture"
            >
              {fileList.length < 6 && (
                <div className="w-full flex flex-col items-center justify-center rounded-[6px] border border-dashed border-[#D0D5DD] bg-white py-8 hover:border-[#98A2B3] hover:bg-gray-50 transition-colors cursor-pointer">
                  <LuUpload className="text-[#667085] mb-2" size={24} />
                  <p className="text-[14px] font-semibold text-[#344054]">Click to upload images</p>
                  <p className="text-[12px] text-[#98A2B3] mt-1">{fileList.length} / 6 images uploaded</p>
                </div>
              )}
            </Upload>
          </div>

          {/* Pricing Section */}
          <div className="pt-2">
            <h3 className="text-[12px] font-medium text-[#344054] mb-3">Pricing *</h3>
            <div className="grid grid-cols-3 gap-4">
              <Form.Item name="perHour" label={<span className="block text-[11px] text-[#667085] mb-1">Per Hour ($)</span>} className="mb-0">
                <InputNumber prefix={<span className="text-[#667085] mr-1">$</span>} controls={false} className="w-full h-[40px] rounded-[6px] border-[#D0D5DD] flex items-center bg-white text-[14px]" />
              </Form.Item>
              <Form.Item name="perDay" label={<span className="block text-[11px] text-[#667085] mb-1">Per Day ($)</span>} className="mb-0">
                <InputNumber prefix={<span className="text-[#667085] mr-1">$</span>} controls={false} className="w-full h-[40px] rounded-[6px] border-[#D0D5DD] flex items-center bg-white text-[14px]" />
              </Form.Item>
              <Form.Item name="perMonth" label={<span className="block text-[11px] text-[#667085] mb-1">Per Month ($)</span>} className="mb-0">
                <InputNumber prefix={<span className="text-[#667085] mr-1">$</span>} controls={false} className="w-full h-[40px] rounded-[6px] border-[#D0D5DD] flex items-center bg-white text-[14px]" />
              </Form.Item>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="pt-2">
            <h3 className="text-[12px] font-medium text-[#344054] mb-3">Specifications *</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <Form.Item name="engineSize" label={<span className="block text-[11px] text-[#667085] mb-1">Engine</span>} className="mb-0">
                <Input placeholder="e.g. 1.8L" className={inputStyle} />
              </Form.Item>
              <Form.Item name="horsepower" label={<span className="block text-[11px] text-[#667085] mb-1">Horsepower</span>} className="mb-0">
                <Input placeholder="e.g. 139 HP" className={inputStyle} />
              </Form.Item>
              <Form.Item name="acceleration" label={<span className="block text-[11px] text-[#667085] mb-1">Acceleration</span>} className="mb-0">
                <Input placeholder="e.g. 0-100 km/h in 10.5s" className={inputStyle} />
              </Form.Item>
              <Form.Item name="topSpeed" label={<span className="block text-[11px] text-[#667085] mb-1">Top Speed</span>} className="mb-0">
                <Input placeholder="e.g. 180 km/h" className={inputStyle} />
              </Form.Item>
              <Form.Item name="transmission" label={<span className="block text-[11px] text-[#667085] mb-1">Transmission</span>} className="mb-0">
                <Input placeholder="e.g. Automatic" className={inputStyle} />
              </Form.Item>
              <Form.Item name="drivetrain" label={<span className="block text-[11px] text-[#667085] mb-1">Drivetrain</span>} className="mb-0">
                <Input placeholder="e.g. FWD" className={inputStyle} />
              </Form.Item>
              <Form.Item name="seats" label={<span className="block text-[11px] text-[#667085] mb-1">Seating Capacity</span>} className="mb-0">
                <InputNumber className="w-full h-[40px] rounded-[6px] border-[#D0D5DD] flex items-center" controls={false} />
              </Form.Item>
              <Form.Item name="fuelType" label={<span className="block text-[11px] text-[#667085] mb-1">Fuel Type</span>} className="mb-0">
                <Input placeholder="e.g. Petrol" className={inputStyle} />
              </Form.Item>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
            <Button
              onClick={onCancel}
              className="px-6 py-2 h-auto rounded-[6px] text-[14px] font-medium text-[#344054] bg-[#F3F4F6] border-none hover:bg-[#E5E7EB] transition-colors shadow-none"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-6 py-2 h-auto rounded-[6px] text-[14px] font-medium text-white bg-black border-none hover:bg-gray-800 transition-colors shadow-none"
            >
              {mode === "add" ? "Add Car" : "Update Car"}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CarModal;
