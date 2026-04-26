import { FaRegBell } from "react-icons/fa6";
import { Badge } from "antd";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import SearchBar from "../../components/SearchBar";

interface UserData {
  name?: string;
  role?: string;
  profileImg?: string;
}

interface AdminProfileResponse {
  data?: UserData;
}

const Header = () => {
  const { data: userData, isLoading } = useFetchAdminProfileQuery() as {
    data?: AdminProfileResponse;
    isLoading: boolean;
  };

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
      <div className="flex-[1.5] flex justify-center">
        <SearchBar />
      </div>

      {/* Right side: Notifications and User Profile */}
      <div className="flex-1 flex items-center justify-end gap-6">
        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-black transition-colors shadow-sm border border-gray-50">
            <Badge dot color="#ef4444">
              <FaRegBell size={20} />
            </Badge>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none mb-1">
              {userData?.data?.name || "Admin"}
            </p>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              {userData?.data?.role || "DIVINE"}
            </p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center text-white font-bold text-lg shadow-md">
            {userData?.data?.name?.charAt(0) || "D"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
