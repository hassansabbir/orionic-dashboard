import React, { useState } from "react";
import { Table, Dropdown, MenuProps } from "antd";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { FiPhone, FiMail, FiSearch } from "react-icons/fi";
import MessageDetailsModal from "../../components/ui/ContactMessages/MessageDetailsModal";

const mockMessages = [
  {
    id: 1,
    name: "Metro Mart",
    message: "I am writing to inquire about the possibility of long-term rental for our corporate fleet. We require 5 luxury SUVs for our executive team for a minimum of 6 months. Please provide a detailed quote and available models.",
    phone: "+16546565656",
    email: "john@metromart.com",
    subject: "Corporate Fleet Inquiry",
    date: "Apr 26, 2024"
  },
  {
    id: 2,
    name: "Fresh Farms LLC",
    message: "Hello, we are interested in your exotic car collection for an upcoming brand photoshoot in Beverly Hills. Do you provide insurance coverage for commercial use during the rental period?",
    phone: "+16546565656",
    email: "sarah@freshfarms.com",
    subject: "Photoshoot Inquiry",
    date: "Apr 25, 2024"
  },
  {
    id: 3,
    name: "City Grocers",
    message: "Would it be possible to arrange a pickup from the airport? Our guest is arriving tomorrow at 3 PM and we would like to have a car ready for them. Let me know the additional charges.",
    phone: "+16546565656",
    email: "mike@citygrocers.com",
    subject: "Airport Pickup Request",
    date: "Apr 25, 2024"
  },
  {
    id: 4,
    name: "Grain Masters",
    message: "Just wanted to say the service was excellent last weekend. The Tesla Model 3 was in pristine condition and the pickup process was very smooth. Will definitely rent from you again!",
    phone: "+16546565656",
    email: "alan@grainmasters.com",
    subject: "Feedback: Great Experience",
    date: "Apr 24, 2024"
  }
];

const ContactMessages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const handleViewDetails = (record: any) => {
    setSelectedMessage(record);
    setIsModalOpen(true);
  };

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
      width: "35%",
      render: (text: string) => (
        <span className="text-[14px] font-medium text-[#475467] line-clamp-1 italic">
          {text}
        </span>
      ),
    },
    {
      title: "CONTACT",
      key: "contact",
      render: (_: any, record: any) => (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-gray-400 group cursor-default">
            <FiPhone size={14} className="group-hover:text-black transition-colors" />
            <span className="text-[13px] font-medium text-[#475467]">{record.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 group cursor-default">
            <FiMail size={14} className="group-hover:text-black transition-colors" />
            <span className="text-[13px] font-medium text-[#475467]">{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      align: "right" as const,
      render: (_: any, record: any) => {
        const items: MenuProps['items'] = [
          {
            key: '1',
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
            key: '2',
            label: (
              <div className="flex items-center gap-2 px-1 py-1 text-red-500 font-medium">
                <IoTrashOutline size={16} />
                <span>Remove Message</span>
              </div>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayClassName="action-dropdown">
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
        <h1 className="text-2xl font-medium text-[#111827]">Contact Us</h1>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {/* Search Header */}
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-[14px] border-none focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="p-4">
          <Table 
            columns={columns} 
            dataSource={mockMessages} 
            pagination={false}
            rowKey="id"
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
