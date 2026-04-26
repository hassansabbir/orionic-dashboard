import React from "react";
import { Modal, Input } from "antd";
import { IoCloseOutline } from "react-icons/io5";

interface AddFaqModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const AddFaqModal: React.FC<AddFaqModalProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
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
            Add FAQ
          </h2>
        </div>

        <div className="space-y-6">
          {/* Question */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Question
            </label>
            <Input
              placeholder="e.g., Tesla Model 3"
              className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
          </div>

          {/* Answer */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-[#344054]">
              Answer
            </label>
            <Input
              placeholder="e.g., Tesla Model 3"
              className="h-[40px] rounded-[6px] border-[#D0D5DD] bg-white placeholder:text-[#98A2B3] text-[14px] hover:border-[#98A2B3] focus:border-[#98A2B3] focus:shadow-none transition-colors"
            />
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
              Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddFaqModal;
