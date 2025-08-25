import { NavLink } from "react-router-dom";
import { FiHome, FiPlusSquare, FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Sidebar({ isOpen, onClose, collapsed = false, onToggleCollapse }) {
  const baseItem =
    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700/60";
  const activeItem = " bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white";
  const labelClass = collapsed ? "hidden" : "block";
  const asideWidth = collapsed ? "w-16 md:w-16" : "w-64 md:w-64";
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ${asideWidth} bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`text-sm font-semibold text-gray-700 dark:text-gray-200 ${labelClass}`}>Menu</div>
        <button
          onClick={onToggleCollapse}
          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <div className="md:hidden mb-3 flex justify-end">
        <button onClick={onClose} className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        </button>
      </div>

      <nav className="space-y-1">
        <NavLink to="/" end className={({ isActive }) => baseItem + (isActive ? activeItem : "")}>
          <FiHome className="w-5 h-5" />
          <span className={labelClass}>Dashboard</span>
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => baseItem + (isActive ? activeItem : "")}>
          <FiPlusSquare className="w-5 h-5" />
          <span className={labelClass}>Add Entry</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => baseItem + (isActive ? activeItem : "")}>
          <FiSettings className="w-5 h-5" />
          <span className={labelClass}>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}