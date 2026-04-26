import React, { useState } from "react";
import { Modal, Input, Upload } from "antd";
import { LuUpload } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";

const { TextArea } = Input;

interface AddReviewModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

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
          overflow: "hidden",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        body: {
          padding: "0"
        }
      }}
    >
      <div className="flex flex-col">
        {/* Modal Title */}
        <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Add New Review
          </h2>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Name
            </label>
            <Input
              placeholder="e.g., Tesla Model 3"
              className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
          </div>

          {/* Designation */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Designation
            </label>
            <Input
              placeholder="e.g., Tesla Model 3"
              className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
          </div>

          {/* Review */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Review
            </label>
            <TextArea
              rows={4}
              placeholder="Describe the review"
              className="rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] p-3 resize-none hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
          </div>

          {/* Rating */}
          <div className="space-y-1.5 flex flex-col items-center pt-2">
            <label className="block text-[12px] font-medium text-[#344054] w-full text-left mb-2">
              Rating
            </label>
            <div className="flex items-center justify-center gap-4 py-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill={index < rating ? "#111827" : "transparent"} 
                    stroke={index < rating ? "#111827" : "#667085"} 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-colors duration-200"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Person Picture Upload */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-[12px] font-medium text-[#344054]">
              Person Picture
            </label>
            <Upload className="w-full block" maxCount={50} multiple beforeUpload={() => false}>
              <div className="w-full flex flex-col items-center justify-center rounded-[6px] border border-dashed border-[#D0D5DD] bg-white py-10 hover:border-[#98A2B3] hover:bg-gray-50 transition-colors cursor-pointer">
                <LuUpload className="text-[#667085] mb-2" size={28} />
                <p className="text-[14px] font-semibold text-[#344054]">Click to upload images</p>
                <p className="text-[12px] text-[#98A2B3] mt-1">0 / 50 images uploaded</p>
              </div>
            </Upload>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
            <button
              onClick={onCancel}
              className="px-8 py-2.5 rounded-[6px] text-[14px] font-medium text-[#344054] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit({})}
              className="px-8 py-2.5 rounded-[6px] text-[14px] font-medium text-white bg-[#111827] hover:bg-[#374151] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddReviewModal;
