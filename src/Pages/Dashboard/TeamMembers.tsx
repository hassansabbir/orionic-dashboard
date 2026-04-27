import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import AddMemberModal from "../../components/ui/TeamMembers/AddMemberModal";
import {
  useGetMembersQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} from "@/redux/apiSlices/memberSlice";
import getImageUrl from "@/components/ui/getImageUrl";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";

const TeamMembers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const { data: memberData, isLoading } = useGetMembersQuery();
  const [addMember, { isLoading: isAdding }] = useAddMemberMutation();
  const [updateMember, { isLoading: isUpdating }] = useUpdateMemberMutation();
  const [deleteMember] = useDeleteMemberMutation();

  const handleAddMember = () => {
    setModalMode("add");
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: any) => {
    setModalMode("edit");
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (id: string) => {
    try {
      await deleteMember(id).unwrap();
      toast.success("Member deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete member");
    }
  };

  const handleModalSubmit = async (formData: FormData) => {
    try {
      if (modalMode === "add") {
        await addMember(formData).unwrap();
        toast.success("Member added successfully");
      } else {
        await updateMember({ id: selectedMember._id, data: formData }).unwrap();
        toast.success("Member updated successfully");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${modalMode} member`);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">Team Members</h1>
        <button
          onClick={handleAddMember}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          <GoPlus size={18} />
          Add Member
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberData?.data?.map((member: any) => (
              <div
                key={member._id}
                className="relative w-full h-[450px] rounded-[24px] overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
              >
                {/* Background Image */}
                <img
                  src={getImageUrl(member.image)}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-500 hover:text-black transition-colors shadow-sm"
                  >
                    <FaRegEdit size={14} />
                  </button>
                  <Popconfirm
                    title="Delete this member?"
                    onConfirm={() => handleDeleteMember(member._id)}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ className: "bg-black" }}
                  >
                    <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-500 hover:text-red-600 transition-colors shadow-sm">
                      <FaRegTrashAlt size={14} />
                    </button>
                  </Popconfirm>
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

            {memberData?.data?.length === 0 && (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">No members found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <AddMemberModal
        open={isModalOpen}
        mode={modalMode}
        initialValues={selectedMember}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={isAdding || isUpdating}
      />
    </div>
  );
};

export default TeamMembers;
