import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { HiPlus } from "react-icons/hi";
import CarModal from "./CarModal";

const CarManagementSection = () => {
  const [activeTab, setActiveTab] = useState("Car Rental Web");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Tesla Model 3",
      description: "Experience the future of driving with this premium electric sedan.",
      seats: 5,
      transmission: "Automatic",
      fuel: "Electric",
      year: 2024,
      range: "358 miles",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Tesla Model 3",
      description: "Experience the future of driving with this premium electric sedan.",
      seats: 5,
      transmission: "Automatic",
      fuel: "Electric",
      year: 2024,
      range: "358 miles",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Tesla Model 3",
      description: "Experience the future of driving with this premium electric sedan.",
      seats: 5,
      transmission: "Automatic",
      fuel: "Electric",
      year: 2024,
      range: "358 miles",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400",
    },
  ]);

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

  const handleDeleteCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const handleModalSubmit = (values: any) => {
    console.log("Form values:", values);
    setIsModalOpen(false);
    // Implementation for add/edit logic would go here
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100/50 p-1 rounded-xl flex gap-1">
          {["Car Rental Web", "Parent Web"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Car Description</h1>
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
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white p-6 rounded-2xl flex gap-8 items-center shadow-sm border border-gray-50 hover:shadow-md transition-shadow duration-200 group"
          >
            {/* Car Image */}
            <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Car Details */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditCar(car)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <CiEdit size={24} />
                  </button>
                  <button 
                    onClick={() => handleDeleteCar(car.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <CiTrash size={24} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 max-w-2xl">{car.description}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-gray-400">
                <p>Seats: <span className="text-gray-700 font-semibold">{car.seats}</span></p>
                <p>Transmission: <span className="text-gray-700 font-semibold">{car.transmission}</span></p>
                <p>Fuel: <span className="text-gray-700 font-semibold">{car.fuel}</span></p>
                <p>Year: <span className="text-gray-700 font-semibold">{car.year}</span></p>
                <p>Range: <span className="text-gray-700 font-semibold">{car.range}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Car Modal */}
      <CarModal
        open={isModalOpen}
        mode={modalMode}
        initialValues={selectedCar}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default CarManagementSection;
