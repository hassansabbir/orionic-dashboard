import { Link } from "react-router-dom";
import { useProfileQuery } from "../../redux/apiSlices/authSlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import getImageUrl from "@/components/ui/getImageUrl";

const Header = () => {
  const { data: userData, isLoading } = useProfileQuery();

  if (isLoading) {
    return <div className="h-16 flex items-center px-6">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-between w-full h-20 px-6 bg-transparent">
      {/* Left side: Breadcrumbs */}
      <div className="flex-1">
        <Breadcrumbs />
      </div>

      {/* Middle: Search Bar */}
      {/* <div className="flex-[1.5] flex justify-center">
        <SearchBar />
      </div> */}

      {/* Right side: Notifications and User Profile */}
      <div className="flex-1 flex items-center justify-end gap-6">
        {/* Notification Bell */}
        {/* <div className="relative">
          <button className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-black transition-colors shadow-sm border border-gray-50">
            <Badge dot color="#ef4444">
              <FaRegBell size={20} />
            </Badge>
          </button>
        </div> */}

        {/* User Profile */}
        <Link
          to="/personal-information"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none mb-1">
              {userData?.name || "Super Admin"}
            </p>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              {userData?.role || "ADMIN"}
            </p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center overflow-hidden shadow-md">
            {userData?.image ? (
              <img
                src={getImageUrl(userData.image)}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-lg">
                {userData?.name?.charAt(0) || "S"}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
