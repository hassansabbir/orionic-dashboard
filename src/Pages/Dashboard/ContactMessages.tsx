import { useState } from "react";
import { Table, Dropdown, MenuProps, Popconfirm } from "antd";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { FiMail, FiPhone, FiSearch } from "react-icons/fi";
import MessageDetailsModal from "../../components/ui/ContactMessages/MessageDetailsModal";
import {
  useGetContactMessagesQuery,
  useDeleteContactMessageMutation,
} from "@/redux/apiSlices/contactSlice";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const ContactMessages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: messagesData, isLoading } = useGetContactMessagesQuery({
    platform: "parent",
    page: currentPage,
    limit: 10,
  });
  const [deleteMessage] = useDeleteContactMessageMutation();

  const handleViewDetails = (record: any) => {
    setSelectedMessage(record);
    setIsModalOpen(true);
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete message");
    }
  };

  const filteredMessages = messagesData?.data?.filter(
    (msg: any) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.phone?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    {
      title: "USER",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="text-[15px] font-bold text-[#111827]">{text}</span>
      ),
    },
    {
      title: "MESSAGES",
      dataIndex: "message",
      key: "message",
      width: "40%",
      render: (text: string) => (
        <span className="text-[14px] font-medium text-[#475467] line-clamp-1 italic">
          {text}
        </span>
      ),
    },
    {
      title: "CONTACT INFO",
      dataIndex: "email",
      key: "email",
      render: (text: string, record: any) => (
        <div className="flex flex-col items-start gap-2 text-gray-400 group cursor-default">
          <div className="flex items-center gap-2">
            <FiMail
              size={14}
              className="group-hover:text-black transition-colors"
            />
            <span className="text-[13px] font-medium text-[#475467]">
              {text}
            </span>
          </div>
          {record?.phone && (
            <div className="flex items-center gap-2">
              <FiPhone
                size={14}
                className="group-hover:text-black transition-colors"
              />
              <span className="text-[13px] font-medium text-[#475467]">
                {record?.phone}
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "date",
      render: (date: string) => (
        <span className="text-[13px] font-medium text-[#475467]">
          {dayjs(date).format("MMM DD, YYYY")}
        </span>
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      align: "right" as const,
      render: (_: any, record: any) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <div
                className="flex items-center gap-2 px-1 py-1 text-gray-600 font-medium"
                onClick={() => handleViewDetails(record)}
              >
                <IoEyeOutline size={16} />
                <span>View Message</span>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <Popconfirm
                title="Delete this message?"
                onConfirm={() => handleDeleteMessage(record._id)}
                okText="Yes"
                cancelText="No"
                okButtonProps={{ className: "bg-black" }}
              >
                <div className="flex items-center gap-2 px-1 py-1 text-red-500 font-medium">
                  <IoTrashOutline size={16} />
                  <span>Remove Message</span>
                </div>
              </Popconfirm>
            ),
          },
        ];

        return (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="action-dropdown"
          >
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <HiOutlineDotsHorizontal size={20} className="text-gray-400" />
            </button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-[#F9FAFB]">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#111827]">
          Contact Messages (Parent Web)
        </h1>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {/* Search Header */}
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-[14px] border-none focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="p-4">
          <Table
            columns={columns}
            dataSource={filteredMessages}
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: 10,
              total: messagesData?.meta?.total || 0,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
            }}
            rowKey="_id"
            className="custom-table"
          />
        </div>
      </div>

      <MessageDetailsModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        data={selectedMessage}
      />
    </div>
  );
};

export default ContactMessages;
