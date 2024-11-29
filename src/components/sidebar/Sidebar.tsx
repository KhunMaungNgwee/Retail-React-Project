import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { sidebarData } from "./sideBarData";
import useAuth from "@/hooks/useAuth"; // Import your custom hook for user authentication and role
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = () => {
  const { userRole } = useAuth(); // Fetch user role using your custom hook

  // Dynamically filter sidebar data based on user role
  const filteredSidebarData = useMemo(() => {
    return sidebarData.filter((item) => {
      // Exclude "/admin" and "/register" routes if the user is not an admin
      if (
        (item.routerNames.includes("/admin") && userRole !== "admin") ||
        (item.routerNames.includes("/register") && userRole !== "admin")
      ) {
        return false;
      }
      return true;
    });
  }, [userRole]);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { userLogout } = useAuth();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    setIsOpen(false);
    userLogout();
    navigate("/auth/login");
  };

  return (
    <aside className="w-3/12 bg-[#211636] shadow-lg h-screen fixed top-0 left-0 min-w-[270px] py-6 px-4 font-[sans-serif] flex flex-col justify-between overflow-hidden hidden lg:block">
      {/* Top Section: User Info */}
      <div>
        <div className="flex flex-wrap items-center cursor-pointer">
          <div className="relative">
            <img
              src="/src/assets/imges/copy.jpg"
              className="w-12 h-12 p-1 rounded-full border-2 border-gray-300"
              alt="User Avatar"
            />
          </div>
          <div className="ml-6">
            <p className="text-xs text-gray-300">Hello Welcome!</p>
            <h6 className="text-sm text-white mt-0.5">Khun Maung Ngwe</h6>
          </div>
        </div>
        <hr className="border-gray-500 my-8" />
        {/* Sidebar Links */}
        <ul className="px-3">
          {filteredSidebarData.map((item) => (
            <NavLink
              to={item.routerNames[0]}
              key={item.name}
              className={({ isActive }) =>
                `text-sm flex items-center rounded-full px-4 py-2.5 transition-all ${
                  isActive
                    ? "text-white bg-[#077bff]"
                    : "text-gray-300 hover:text-white hover:bg-[#077bff]"
                }`
              }
            >
              <li className="flex items-center gap-3">
                {item.icon && <item.icon className="w-4 h-4" />}
                <p className="text-[13px]">{item.name}</p>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Bottom Section: Logout Button */}
      <div className="px-3">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          {/* Trigger Button */}
          <AlertDialogTrigger asChild>
            <button
              className="text-sm flex items-center rounded-full px-4 py-2.5 transition-all text-gray-300 bg-transparent hover:text-white hover:bg-[#077bff] w-full gap-3"
            >
              <AiOutlineLogout className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </AlertDialogTrigger>

          {/* Dialog Content */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-bold">
                Confirm Logout
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600">
                Are you sure you want to logout? This will end your current session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* Cancel Button */}
              <Button
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              {/* Confirm Logout Button */}
              <Button
                className="px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 focus:ring-2 focus:ring-red-300"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );
};

export default Sidebar;
