import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  CiGrid32, 
  CiStar, 
  CiUser, 
  CiPhone, 
  CiMail, 
  CiCircleQuestion,
  CiLogout 
} from "react-icons/ci";
import { PiUsers } from "react-icons/pi";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <CiGrid32 size={24} />,
      label: "Overview",
    },
    {
      key: "/review",
      icon: <CiStar size={24} />,
      label: "Review",
    },
    {
      key: "/about-us",
      icon: <CiUser size={24} />,
      label: "About Us",
    },
    {
      key: "/contact-us",
      icon: <CiPhone size={24} />,
      label: "Contact Us",
    },
    {
      key: "/team-members",
      icon: <PiUsers size={24} />,
      label: "Team Members",
    },
    {
      key: "/contact-messages",
      icon: <CiMail size={24} />,
      label: "Contact Us Messages",
    },
    {
      key: "/f-a-q",
      icon: <CiCircleQuestion size={24} />,
      label: "FAQ",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Logo */}
      <div className="p-8 flex justify-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
        </Link>
      </div>

      {/* Main Section Header */}
      <div className="px-8 mb-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          MAIN
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = path === item.key;
          return (
            <Link
              key={item.key}
              to={item.key}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-black text-white shadow-lg shadow-black/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-black"}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-red-50 text-red-500 font-semibold hover:bg-red-100 transition-colors duration-200"
        >
          <span>Logout</span>
          <CiLogout size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
