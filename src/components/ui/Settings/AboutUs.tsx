import { useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { Popconfirm } from "antd";
import AddAboutModal from "../AboutUs/AddAboutModal";
import {
  useGetAboutUsQuery,
  useAddAboutUsMutation,
  useUpdateAboutUsMutation,
  useDeleteAboutUsMutation,
} from "@/redux/apiSlices/aboutUsSlice";
import getImageUrl from "@/components/ui/getImageUrl";
import toast from "react-hot-toast";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState<"carRental" | "parent">("carRental");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedAbout, setSelectedAbout] = useState<any>(null);

  const { data: aboutData, isLoading } = useGetAboutUsQuery({
    platform: activeTab,
  });
  const [addAbout, { isLoading: isAdding }] = useAddAboutUsMutation();
  const [updateAbout, { isLoading: isUpdating }] = useUpdateAboutUsMutation();
  const [deleteAbout] = useDeleteAboutUsMutation();

  const handleAddAbout = () => {
    setModalMode("add");
    setSelectedAbout(null);
    setIsModalOpen(true);
  };

  const handleEditAbout = (about: any) => {
    setModalMode("edit");
    setSelectedAbout(about);
    setIsModalOpen(true);
  };

  const handleDeleteAbout = async (id: string) => {
    try {
      await deleteAbout(id).unwrap();
      toast.success("Content deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete content");
    }
  };

  const handleModalSubmit = async (formData: FormData) => {
    try {
      const dataStr = formData.get("data") as string;
      const dataObj = JSON.parse(dataStr);
      dataObj.platform = activeTab;
      formData.set("data", JSON.stringify(dataObj));

      if (modalMode === "add") {
        await addAbout(formData).unwrap();
        toast.success("Content added successfully");
      } else {
        await updateAbout({ id: selectedAbout._id, data: formData }).unwrap();
        toast.success("Content updated successfully");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${modalMode} content`);
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
        <h1 className="text-2xl font-medium text-gray-800">About Us</h1>
        <button
          onClick={handleAddAbout}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <GoPlus size={18} />
          Add About Us
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="space-y-16">
            {aboutData?.data?.map((about: any, index: number) => (
              <div key={about._id} className="w-full flex flex-col">
                {/* Optional Brand Header for Parent Web or specific index */}
                {activeTab === "parent" && (
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white">
                      <FaRegBuilding size={24} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1">
                        BRAND {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="text-4xl font-bold italic text-gray-900 tracking-tight">
                        {about.title}
                      </h2>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Image Section */}
                  <div className="relative rounded-[24px] overflow-hidden group">
                    <img
                      src={getImageUrl(about.image)}
                      alt={about.title}
                      className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <button
                        onClick={() => handleEditAbout(about)}
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-500 hover:text-black transition-colors shadow-sm"
                      >
                        <FaRegEdit size={14} />
                      </button>
                      <Popconfirm
                        title="Delete this content?"
                        onConfirm={() => handleDeleteAbout(about._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "bg-black" }}
                      >
                        <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-500 hover:text-red-600 transition-colors shadow-sm">
                          <FaRegTrashAlt size={14} />
                        </button>
                      </Popconfirm>
                    </div>
                  </div>

                  {/* Text Section */}
                  <div className="flex flex-col justify-center py-4">
                    {activeTab === "carRental" && (
                      <>
                        <p className="text-[12px] font-bold text-[#FACC15] tracking-[0.2em] uppercase mb-3">
                          HERITAGE
                        </p>
                        <h2 className="text-[42px] leading-[1.1] font-bold italic text-gray-800 tracking-tight mb-8">
                          {about.title}
                        </h2>
                      </>
                    )}

                    <div className="space-y-6 text-[15px] leading-[1.8] text-[#667085] whitespace-pre-wrap">
                      {about.bodyText}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {aboutData?.data?.length === 0 && (
              <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">No content found for this platform.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <AddAboutModal
        open={isModalOpen}
        mode={modalMode}
        initialValues={selectedAbout}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={isAdding || isUpdating}
      />
    </div>
  );
};

export default AboutUs;
