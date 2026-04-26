import { useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import AddAboutModal from "../AboutUs/AddAboutModal";

const AboutUs = () => {
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
        <h1 className="text-2xl font-medium text-gray-800">About Us</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <GoPlus size={18} />
          Add About Us
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === "Parent Web" ? (
          <div className="w-full h-full flex flex-col">
            {/* Brand Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white">
                <FaRegBuilding size={24} />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1">
                  BRAND 01
                </p>
                <h2 className="text-4xl font-bold italic text-gray-900 tracking-tight">
                  Orienco Rapid Delivery
                </h2>
              </div>
            </div>

            {/* Split Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Section */}
              <div className="relative rounded-[24px] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1551326844-4df70f78d0e9?q=80&w=2000&auto=format&fit=crop"
                  alt="Delivery Courier"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-500 hover:text-black transition-colors shadow-sm">
                    <FaRegEdit size={14} />
                  </button>
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-500 hover:text-red-600 transition-colors shadow-sm">
                    <FaRegTrashAlt size={14} />
                  </button>
                </div>
              </div>

              {/* Text Section */}
              <div className="flex flex-col justify-center py-4">
                <p className="text-[17px] leading-[1.8] text-[#667085]">
                  Our flagship delivery service combines speed and reliability
                  to ensure every package reaches its destination on time.
                  Whether it's same-day delivery, scheduled shipments, or
                  express logistics, Rapid Delivery is built to meet urgent
                  needs without compromising care. We offer same-day delivery
                  across major cities, ensuring your important packages arrive
                  within hours when needed. With real-time GPS tracking and
                  instant notifications, you can always stay updated on your
                  shipment's status. Every item is handled with the utmost care
                  from pickup to delivery, maintaining security throughout the
                  process. Additionally, flexible scheduling options allow you
                  to choose delivery windows that suit your convenience,
                  including evenings and weekends.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col pt-4">
            {/* Split Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Section */}
              <div className="relative rounded-[24px] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2000&auto=format&fit=crop"
                  alt="Vintage Porsche"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-500 hover:text-black transition-colors shadow-sm">
                    <FaRegEdit size={14} />
                  </button>
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-500 hover:text-red-600 transition-colors shadow-sm">
                    <FaRegTrashAlt size={14} />
                  </button>
                </div>
              </div>

              {/* Text Section */}
              <div className="flex flex-col justify-center py-4">
                <p className="text-[12px] font-bold text-[#FACC15] tracking-[0.2em] uppercase mb-3">
                  HERITAGE
                </p>
                <h2 className="text-[42px] leading-[1.1] font-bold italic text-gray-800 tracking-tight mb-8">
                  A Legacy of Automotive
                  <br />
                  Excellence
                </h2>

                <div className="space-y-6 text-[15px] leading-[1.8] text-[#667085]">
                  <p>
                    It started with a simple vision: to make the world's most
                    extraordinary vehicles accessible to those who appreciate
                    true automotive craftsmanship. In 2012, our founders opened
                    a boutique showroom in Los Angeles with just five exotic
                    cars.
                  </p>
                  <p>
                    We quickly realized that our clients weren't just renting a
                    car—they were renting an experience. From the scent of
                    hand-stitched leather to the roar of a V12 engine, every
                    detail mattered. This realization transformed our business
                    from a simple rental agency into a full-service concierge
                    experience.
                  </p>
                  <p>
                    Today, Orienco boasts a curated fleet of over 120 pristine
                    vehicles, serving elite clientele worldwide. We remain
                    dedicated to our original promise: delivering uncompromised
                    luxury, performance, and white-glove service with every
                    reservation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddAboutModal
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

export default AboutUs;
