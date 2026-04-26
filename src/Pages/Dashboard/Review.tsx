import { useState } from "react";
import { Popconfirm } from "antd";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import AddReviewModal from "../../components/ui/Review/AddReviewModal";
import {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/redux/apiSlices/reviewSlice";
import getImageUrl from "@/components/ui/getImageUrl";
import toast from "react-hot-toast";

const Review = () => {
  const [activeTab, setActiveTab] = useState<"carRental" | "parent">("carRental");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const { data: reviewData, isLoading } = useGetAllReviewsQuery({
    platform: activeTab,
  });
  const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const handleAddReview = () => {
    setModalMode("add");
    setSelectedReview(null);
    setIsModalOpen(true);
  };

  const handleEditReview = (review: any) => {
    setModalMode("edit");
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete review");
    }
  };

  const handleModalSubmit = async (formData: FormData) => {
    try {
      // Ensure platform is set in the data
      const dataStr = formData.get("data") as string;
      const dataObj = JSON.parse(dataStr);
      dataObj.platform = activeTab;
      formData.set("data", JSON.stringify(dataObj));

      if (modalMode === "add") {
        await addReview(formData).unwrap();
        toast.success("Review added successfully");
      } else {
        await updateReview({ id: selectedReview._id, data: formData }).unwrap();
        toast.success("Review updated successfully");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${modalMode} review`);
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
        <h1 className="text-2xl font-medium text-gray-800">Manage Review</h1>
        <button
          onClick={handleAddReview}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <GoPlus size={18} />
          Add New Review
        </button>
      </div>

      {/* Reviews Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {reviewData?.data?.map((review: any) => (
            <div
              key={review._id}
              className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50/50 flex flex-col h-full"
            >
              {/* Card Header: Rating & Actions */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#FACC15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="font-bold text-sm text-gray-900">
                    {Number(review.rating).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:border-gray-300 transition-colors"
                  >
                    <FaRegEdit size={14} />
                  </button>
                  <Popconfirm
                    title="Delete the review"
                    description="Are you sure to delete this review?"
                    onConfirm={() => handleDeleteReview(review._id)}
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

              {/* Review Text */}
              <p className="text-[#667085] italic text-[15px] leading-relaxed flex-grow mb-8">
                "{review.review}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={getImageUrl(review.image)}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover bg-gray-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">
                    {review.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{review.designation}</p>
                </div>
              </div>
            </div>
          ))}

          {reviewData?.data?.length === 0 && (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400">No reviews found for this platform.</p>
            </div>
          )}
        </div>
      )}

      <AddReviewModal
        open={isModalOpen}
        mode={modalMode}
        initialValues={selectedReview}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={isAdding || isUpdating}
      />
    </div>
  );
};

export default Review;
