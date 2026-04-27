import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { Popconfirm } from "antd";
import AddFaqModal from "../../components/ui/FAQ/AddFaqModal";
import {
  useGetFAQsQuery,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} from "@/redux/apiSlices/faqSlice";
import toast from "react-hot-toast";

const Faq = () => {
  const [activeTab, setActiveTab] = useState<"carRental" | "parent">(
    "carRental",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedFaq, setSelectedFaq] = useState<any>(null);

  const { data: faqData, isLoading } = useGetFAQsQuery({
    platform: activeTab,
  });

  const [addFAQ, { isLoading: isAdding }] = useAddFAQMutation();
  const [updateFAQ, { isLoading: isUpdating }] = useUpdateFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation();

  const handleAddFaq = () => {
    setModalMode("add");
    setSelectedFaq(null);
    setIsModalOpen(true);
  };

  const handleEditFaq = (faq: any) => {
    setModalMode("edit");
    setSelectedFaq(faq);
    setIsModalOpen(true);
  };

  const handleDeleteFaq = async (id: string) => {
    try {
      await deleteFAQ(id).unwrap();
      toast.success("FAQ deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete FAQ");
    }
  };

  const handleModalSubmit = async (values: any) => {
    try {
      if (modalMode === "add") {
        await addFAQ({ ...values, platform: activeTab }).unwrap();
        toast.success("FAQ added successfully");
      } else {
        await updateFAQ({ id: selectedFaq._id, data: values }).unwrap();
        toast.success("FAQ updated successfully");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${modalMode} FAQ`);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Top Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-50/50 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("carRental")}
            className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "carRental"
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Car Rental Web
          </button>
          <button
            onClick={() => setActiveTab("parent")}
            className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "parent"
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
          onClick={handleAddFaq}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <GoPlus size={18} />
          Add FAQ
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {faqData?.data?.map((faq: any) => (
              <div
                key={faq._id}
                className="flex items-center justify-between bg-white rounded-xl p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100"
              >
                <div className="flex items-center gap-4 flex-1">
                  <GoPlus size={24} className="text-black shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-[#111827]">
                      {faq.question}
                    </span>
                    <p className="text-[14px] text-gray-500 mt-1">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditFaq(faq)}
                    className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:border-gray-300 transition-colors"
                  >
                    <FaRegEdit size={14} />
                  </button>
                  <Popconfirm
                    title="Delete this FAQ?"
                    onConfirm={() => handleDeleteFaq(faq._id)}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ className: "bg-black" }}
                  >
                    <button className="p-2 border border-red-100 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <FaRegTrashAlt size={14} />
                    </button>
                  </Popconfirm>
                </div>
              </div>
            ))}

            {faqData?.data?.length === 0 && (
              <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">No FAQs found for this platform.</p>
              </div>
            )}
          </>
        )}
      </div>

      <AddFaqModal
        open={isModalOpen}
        mode={modalMode}
        initialValues={selectedFaq}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={isAdding || isUpdating}
      />
    </div>
  );
};

export default Faq;
