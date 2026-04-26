import React from "react";
import { Modal, Input, InputNumber, Upload } from "antd";
import { LuUpload } from "react-icons/lu";

const { TextArea } = Input;

interface CarModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  mode: "add" | "edit";
  initialValues?: any;
}

const CarModal: React.FC<CarModalProps> = ({
  open,
  onCancel,
  onSubmit,
  mode,
}) => {
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
          overflow: "hidden",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
        body: {
          padding: "0",
        },
      }}
    >
      <div className="flex flex-col">
        {/* Modal Title */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            {mode === "add" ? "Add New Car" : "Edit Car Details"}
          </h2>
        </div>

        <div className="space-y-6">
          {/* Brand Name */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Brand Name *
            </label>
            <Input
              placeholder="e.g.. Tesla Model 3"
              className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
          </div>

          {/* Car Name */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Car Name *
            </label>
            <Input
              placeholder="e.g.. Tesla Model 3"
              className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Description *
            </label>
            <TextArea
              rows={4}
              placeholder="Describe the car features and benefits..."
              className="rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] p-3 resize-none hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
          </div>

          {/* Features */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Features*
            </label>
            <TextArea
              rows={4}
              placeholder="Describe the car features and benefits..."
              className="rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] p-3 resize-none hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
          </div>

          {/* Car Video Upload */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Car Video (Max 1)
            </label>
            <Upload
              className="w-full block"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div className="w-full flex flex-col items-center justify-center rounded-[6px] border border-dashed border-[#D0D5DD] bg-white py-8 hover:border-[#98A2B3] hover:bg-gray-50 transition-colors cursor-pointer">
                <LuUpload className="text-[#667085] mb-2" size={24} />
                <p className="text-[14px] font-semibold text-[#344054]">
                  Click to upload Video
                </p>
                <p className="text-[12px] text-[#98A2B3] mt-1">
                  0 / 1 video uploaded
                </p>
              </div>
            </Upload>
          </div>

          {/* Car Images Upload */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Car Images (Max 6)
            </label>
            <Upload
              className="w-full block"
              maxCount={6}
              multiple
              beforeUpload={() => false}
            >
              <div className="w-full flex flex-col items-center justify-center rounded-[6px] border border-dashed border-[#D0D5DD] bg-white py-8 hover:border-[#98A2B3] hover:bg-gray-50 transition-colors cursor-pointer">
                <LuUpload className="text-[#667085] mb-2" size={24} />
                <p className="text-[14px] font-semibold text-[#344054]">
                  Click to upload images
                </p>
                <p className="text-[12px] text-[#98A2B3] mt-1">
                  0 / 50 images uploaded
                </p>
              </div>
            </Upload>
          </div>

          {/* Pricing Section */}
          <div className="pt-2">
            <h3 className="text-[12px] font-medium text-[#344054] mb-3">
              Pricing *
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Per Hour ($)
                </label>
                <InputNumber
                  prefix={<span className="text-[#667085] mr-1">$</span>}
                  controls={false}
                  className="w-full h-[40px] rounded-[6px] border-[#D0D5DD] flex items-center bg-white text-[14px] hover:border-[#98A2B3] focus-within:border-[#98A2B3] focus-within:shadow-none transition-colors"
                  defaultValue={0}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Per Day ($)
                </label>
                <InputNumber
                  prefix={<span className="text-[#667085] mr-1">$</span>}
                  controls={false}
                  className="w-full h-[40px] rounded-[6px] border-[#D0D5DD] flex items-center bg-white text-[14px] hover:border-[#98A2B3] focus-within:border-[#98A2B3] focus-within:shadow-none transition-colors"
                  defaultValue={0}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Per Month ($)
                </label>
                <InputNumber
                  prefix={<span className="text-[#667085] mr-1">$</span>}
                  controls={false}
                  className="w-full h-[40px] rounded-[6px] border-[#D0D5DD] flex items-center bg-white text-[14px] hover:border-[#98A2B3] focus-within:border-[#98A2B3] focus-within:shadow-none transition-colors"
                  defaultValue={0}
                />
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="pt-2">
            <h3 className="text-[12px] font-medium text-[#344054] mb-3">
              Specifications *
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Engine
                </label>
                <Input
                  className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
                  defaultValue="5"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Horsepower
                </label>
                <Input className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Acceleration
                </label>
                <Input className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Top Speed
                </label>
                <Input
                  className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
                  defaultValue="2026"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Transmission
                </label>
                <Input
                  className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
                  defaultValue="5"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Drivetrain
                </label>
                <Input className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Seating Capacity
                </label>
                <Input className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-[#667085]">
                  Fuel Type
                </label>
                <Input
                  className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
                  defaultValue="2026"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-[6px] text-[14px] font-medium text-[#344054] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit({})}
              className="px-6 py-2 rounded-[6px] text-[14px] font-medium text-white bg-[#111827] hover:bg-[#374151] transition-colors"
            >
              {mode === "add" ? "Add Car" : "Update Car"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CarModal;
