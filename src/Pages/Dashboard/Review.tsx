import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import AddReviewModal from "../../components/ui/Review/AddReviewModal";

const mockReviews = [
  {
    id: 1,
    rating: 5.0,
    reviewText:
      "Exceptional service and genuine care throughout the entire rental. The team made everything effortless from pickup to return.",
    authorName: "Marcus Weber",
    authorRole: "Doctor",
    authorImage: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    id: 2,
    rating: 4.8,
    reviewText:
      "A refined experience from start to finish. Reliable service, clean luxury cars, and excellent support made it outstanding.",
    authorName: "Marcus Weber",
    authorRole: "Doctor",
    authorImage: "https://i.pravatar.cc/150?u=marcus2",
  },
  {
    id: 3,
    rating: 5.0,
    reviewText:
      "Exceptional service and genuine care throughout the entire rental. The team made everything effortless from pickup to return.",
    authorName: "Marcus Weber",
    authorRole: "Doctor",
    authorImage: "https://i.pravatar.cc/150?u=marcus3",
  },
  {
    id: 4,
    rating: 4.8,
    reviewText:
      "A refined experience from start to finish. Reliable service, clean luxury cars, and excellent support made it outstanding.",
    authorName: "Marcus Weber",
    authorRole: "Doctor",
    authorImage: "https://i.pravatar.cc/150?u=marcus4",
  },
];

const Review = () => {
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
        <h1 className="text-2xl font-medium text-gray-800">Manage Review</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <GoPlus size={18} />
          Add New Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {mockReviews.map((review) => (
          <div
            key={review.id}
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
                  {review.rating.toFixed(1)}
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

            {/* Review Text */}
            <p className="text-[#667085] italic text-[15px] leading-relaxed flex-grow mb-8">
              "{review.reviewText}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 mt-auto">
              <img
                src={review.authorImage}
                alt={review.authorName}
                className="w-12 h-12 rounded-full object-cover bg-gray-100"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-[15px]">
                  {review.authorName}
                </h4>
                <p className="text-gray-500 text-sm">{review.authorRole}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddReviewModal
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

export default Review;
