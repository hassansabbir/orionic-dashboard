import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline,
} from "react-icons/io5";
import EditContactCarRentalModal from "../../components/ui/ContactUs/EditContactCarRentalModal";
import EditContactParentModal from "../../components/ui/ContactUs/EditContactParentModal";
import {
  useGetContactInfoQuery,
  useUpdateContactInfoMutation,
} from "@/redux/apiSlices/contactSlice";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [activeTab, setActiveTab] = useState<"carRental" | "parent">("carRental");
  const [isCarRentalModalOpen, setIsCarRentalModalOpen] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const { data: contactData, isLoading } = useGetContactInfoQuery({
    platform: activeTab,
  });
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactInfoMutation();

  const handleUpdateContact = async (values: any) => {
    try {
      await updateContact({ ...values, platform: activeTab }).unwrap();
      toast.success("Contact information updated successfully");
      setIsCarRentalModalOpen(false);
      setIsParentModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update contact info");
    }
  };

  const contact = contactData?.data || {};

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
        <h1 className="text-2xl font-medium text-gray-800">Contact Us</h1>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {activeTab === "carRental" ? (
              <div className="w-full flex flex-col relative">
                <button
                  onClick={() => setIsCarRentalModalOpen(true)}
                  className="absolute right-0 top-0 p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:border-gray-300 transition-colors bg-white shadow-sm"
                >
                  <FaRegEdit size={14} />
                </button>

                {/* Header */}
                <div className="mb-8 pr-12">
                  <p className="text-[12px] font-bold text-[#EAB308] tracking-[0.2em] uppercase mb-2">
                    REACH OUT
                  </p>
                  <h2 className="text-4xl font-bold italic text-gray-900 tracking-tight mb-4">
                    Contact Information
                  </h2>
                  <p className="text-[15px] text-[#667085] leading-relaxed max-w-4xl">
                    Whether you're looking to book a specific model, arrange an
                    airport delivery, or simply ask a question about our fleet,
                    we're here to provide an immediate response.
                  </p>
                </div>

                {/* Contact Items */}
                <div className="space-y-10 mt-4">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
                      <IoLocationOutline size={24} />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold italic text-gray-900 mb-1">
                        Our Showroom
                      </h3>
                      <p className="text-[#98A2B3] text-[15px]">
                        {contact?.address || "No address provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
                      <IoCallOutline size={24} />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold italic text-gray-900 mb-1">
                        Phone
                      </h3>
                      <p className="text-[#98A2B3] text-[15px] mb-1">
                        {contact?.phoneNumber || "No phone number provided"}
                      </p>
                      <p className="text-[#D0D5DD] text-[10px] font-bold tracking-widest uppercase">
                        AVAILABLE 24/7
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
                      <IoMailOutline size={24} />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold italic text-gray-900 mb-1">
                        Email Inquiry
                      </h3>
                      <p className="text-[#98A2B3] text-[15px]">
                        {contact?.email || "No email provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
                      <IoTimeOutline size={24} />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold italic text-gray-900 mb-1">
                        Showroom Hours
                      </h3>
                      <p className="text-[#98A2B3] text-[15px]">
                        {contact?.openHours || "No hours provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col relative">
                <button
                  onClick={() => setIsParentModalOpen(true)}
                  className="absolute right-0 top-0 p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:border-gray-300 transition-colors bg-white shadow-sm"
                >
                  <FaRegEdit size={14} />
                </button>

                <div className="space-y-10 mt-2">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#344054] mb-3">
                      Address
                    </h3>
                    <p className="text-[#667085] text-[15px] mb-1">
                      {contact?.address || "No address provided"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[18px] font-bold text-[#344054] mb-3">
                      Contact
                    </h3>
                    <p className="text-[#667085] text-[15px] mb-2">
                      Phone: {contact?.phoneNumber || "N/A"}
                    </p>
                    <p className="text-[#667085] text-[15px] mb-2">
                      Email: {contact?.email || "N/A"}
                    </p>
                    <p className="text-[#667085] text-[15px]">
                      Website: {contact?.websiteLink || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[18px] font-bold text-[#344054] mb-3">
                      Open Time
                    </h3>
                    <p className="text-[#667085] text-[15px]">
                      {contact?.openHours || "No hours provided"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <EditContactCarRentalModal
        open={isCarRentalModalOpen}
        onCancel={() => setIsCarRentalModalOpen(false)}
        initialValues={contact}
        onSubmit={handleUpdateContact}
        loading={isUpdating}
      />

      <EditContactParentModal
        open={isParentModalOpen}
        onCancel={() => setIsParentModalOpen(false)}
        initialValues={contact}
        onSubmit={handleUpdateContact}
        loading={isUpdating}
      />
    </div>
  );
};

export default ContactUs;
