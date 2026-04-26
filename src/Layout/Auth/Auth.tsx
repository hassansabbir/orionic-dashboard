import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#FDFDFD]">
      {/* Auth Container */}
      <div className="w-full max-w-[550px] p-6 sm:p-10 relative z-10 mx-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
