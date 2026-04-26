import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import AddFaqModal from "../../components/ui/FAQ/AddFaqModal";

const mockFaqs = [
  {
    id: 1,
    question: "What services does Orienco Inc Group offer?",
    answer: "We offer luxury car rentals and premium delivery services.",
  },
  {
    id: 2,
    question: "What services does Orienco Inc Group offer?",
    answer: "We provide comprehensive white-glove concierge services.",
  },
];

const Faq = () => {
  const [activeTab, setActiveTab] = useState("Car Rental Web");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Top Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-50/50 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("Car Rental Web")}
            className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "Car Rental Web"
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Car Rental Web
          </button>
          <button
            onClick={() => setActiveTab("Parent Web")}
            className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "Parent Web"
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Parent Web
          </button>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-gray-800">FAQ</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <GoPlus size={18} />
          Add FAQ
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 space-y-4">
        {mockFaqs.map((faq) => (
          <div
            key={faq.id}
            className="flex items-center justify-between bg-white rounded-xl p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <GoPlus size={24} className="text-black shrink-0" />
              <span className="text-[15px] font-medium text-[#344054]">
                {faq.question}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:border-gray-300 transition-colors">
                <FaRegEdit size={14} />
              </button>
              <button className="p-2 border border-red-100 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                <FaRegTrashAlt size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddFaqModal
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSubmit={(values) => {
          console.log(values);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};

export default Faq;
