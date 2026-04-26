import { useState } from "react";
import { Popconfirm } from "antd";
import { CiEdit, CiTrash } from "react-icons/ci";
import { HiPlus } from "react-icons/hi";
import CarModal from "./CarModal";
import {
  useGetAllCarsQuery,
  useDeleteCarMutation,
  useAddCarMutation,
  useUpdateCarMutation,
} from "@/redux/apiSlices/carSlice";
import getImageUrl from "@/components/ui/getImageUrl";
import toast from "react-hot-toast";

const CarManagementSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const { data: carData, isLoading } = useGetAllCarsQuery();
  const [deleteCar] = useDeleteCarMutation();
  const [addCar, { isLoading: isAdding }] = useAddCarMutation();
  const [updateCar, { isLoading: isUpdating }] = useUpdateCarMutation();

  const handleAddCar = () => {
    setModalMode("add");
    setSelectedCar(null);
    setIsModalOpen(true);
  };

  const handleEditCar = (car: any) => {
    setModalMode("edit");
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleDeleteCar = async (id: string) => {
    try {
      await deleteCar(id).unwrap();
      toast.success("Car deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete car");
    }
  };

  const handleModalSubmit = async (formData: FormData) => {
    try {
      if (modalMode === "add") {
        await addCar(formData).unwrap();
        toast.success("Car added successfully");
      } else {
        await updateCar({ id: selectedCar._id, data: formData }).unwrap();
        toast.success("Car updated successfully");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${modalMode} car`);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-500">Loading cars...</div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Car Description
        </h1>
        <button
          onClick={handleAddCar}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
        >
          <HiPlus size={18} />
          <span>Add New Car</span>
        </button>
      </div>

      {/* Car Cards List */}
      <div className="space-y-4">
        {carData?.data?.map((car: any) => (
          <div
            key={car._id}
            className="bg-white p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-center shadow-sm border border-gray-50 hover:shadow-md transition-shadow duration-200 group"
          >
            {/* Car Image */}
            <div className="w-full md:w-64 h-40 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={getImageUrl(car.images?.[0])}
                alt={car.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Car Details */}
            <div className="flex-1 space-y-4 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {car.name}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-full">
                      {car.brand}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-2xl line-clamp-2">
                    {car.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCar(car)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <CiEdit size={24} />
                  </button>
                  <Popconfirm
                    title="Delete the car"
                    description="Are you sure to delete this car?"
                    onConfirm={() => handleDeleteCar(car._id)}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ className: "bg-black" }}
                  >
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <CiTrash size={24} />
                    </button>
                  </Popconfirm>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 border-t border-gray-50 mt-4">
                <div className="space-y-1">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">
                    Seats
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {car.seats}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">
                    Transmission
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {car.transmission}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">
                    Fuel
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {car.fuelType}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">
                    Hourly Rate
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    ${car.perHour}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">
                    Daily Rate
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    ${car.perDay}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {carData?.data?.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400">
              No cars found. Add some to get started!
            </p>
          </div>
        )}
      </div>

      {/* Car Modal */}
      <CarModal
        open={isModalOpen}
        mode={modalMode}
        initialValues={selectedCar}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={isAdding || isUpdating}
      />
    </div>
  );
};

export default CarManagementSection;
