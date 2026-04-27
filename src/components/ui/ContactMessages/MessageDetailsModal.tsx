import React from "react";
import { Modal } from "antd";
import { IoCloseOutline } from "react-icons/io5";
import dayjs from "dayjs";

interface MessageDetailsModalProps {
  open: boolean;
  onCancel: () => void;
  data: any;
}

const MessageDetailsModal: React.FC<MessageDetailsModalProps> = ({
  open,
  onCancel,
  data,
}) => {
  if (!data) return null;

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
        <div className="mb-8 flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            Message Details
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">
                User Name
              </p>
              <p className="text-[15px] font-semibold text-[#111827]">
                {data.name}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">
                Date
              </p>
              <p className="text-[15px] font-medium text-[#344054]">
                {data.createdAt
                  ? dayjs(data.createdAt).format("MMM DD, YYYY")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">
              Email Address
            </p>
            <p className="text-[15px] font-medium text-[#344054]">
              {data.email}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">
              Phone Number
            </p>
            <p className="text-[15px] font-medium text-[#344054]">
              {data.phone}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">
              Message
            </p>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <p className="text-[15px] text-[#475467] leading-relaxed whitespace-pre-wrap italic">
                "{data.message}"
              </p>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex justify-end pt-6">
            <button
              onClick={onCancel}
              className="px-8 py-2.5 rounded-[10px] text-[14px] font-semibold text-white bg-[#111827] hover:bg-[#374151] transition-all shadow-lg shadow-black/10"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MessageDetailsModal;
