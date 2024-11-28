import { NavLink } from "react-router-dom";
import { sidebarData } from "./sideBarData";

const Sidebar = () => {
  return (
    <>
      <aside className="w-3/12 bg-[#211636] shadow-lg h-screen fixed top-0 left-0 min-w-[270px] py-6 px-4 font-[sans-serif] flex flex-col overflow-hidden hidden lg:block">
        <div className="flex flex-wrap items-center cursor-pointer">
          <div className="relative">
            <img
              src="/src/assets/imges/copy.jpg"
              className="w-12 h-12 p-1 rounded-full border-2 border-gray-300"
              alt=""
            />
          </div>
          <div className="ml-6">
            <p className="text-xs text-gray-300">Hello Welcome!</p>
            <h6 className="text-sm text-white mt-0.5">Khun Maung Ngwe</h6>
          </div>
        </div>
        <hr className="border-gray-500 my-8" />
        <ul className="px-3">
          {sidebarData.map((item) => (
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
      </aside>
    </>
  );
};

export default Sidebar;
