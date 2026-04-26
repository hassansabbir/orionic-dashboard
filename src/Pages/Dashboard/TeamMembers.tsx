import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import AddMemberModal from "../../components/ui/TeamMembers/AddMemberModal";

const mockMembers = [
  {
    id: 1,
    name: "Micheal Mia",
    designation: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1bfa8ea?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Thomas Keller",
    designation: "Lead Service Advisor",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Flexible Rental Plans", // Keeping the exact text from screenshot 3rd card
    designation: "Sales Director",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
  },
];

const TeamMembers = () => {
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
      <div className="flex justify-end items-center mb-8">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <GoPlus size={18} />
          Add Member
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockMembers.map((member) => (
            <div
              key={member.id}
              className="relative w-full h-[450px] rounded-[24px] overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            >
              {/* Background Image */}
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay for Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-black transition-colors shadow-sm">
                  <FaRegEdit size={14} />
                </button>
                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-500 hover:text-red-600 transition-colors shadow-sm">
                  <FaRegTrashAlt size={14} />
                </button>
              </div>

              {/* Member Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-[22px] font-bold italic text-white mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-[14px] text-gray-300">
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddMemberModal
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

export default TeamMembers;
