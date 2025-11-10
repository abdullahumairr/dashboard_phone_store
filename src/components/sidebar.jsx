import { useNavigate, useLocation } from "react-router-dom";
import { Users, Package, Home, LogOut, ChevronRight } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Users",
      path: "/dashboard/user",
      icon: Users,
    },
    {
      name: "Products",
      path: "/dashboard/product",
      icon: Package,
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      navigate("/");
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl">
      {/* logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold">PS</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Phone Store</h1>
            <p className="text-xs text-slate-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* navigation mmeunu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1"
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium flex-1 text-left">{item.name}</span>
              {active && <ChevronRight size={16} />}
            </button>
          );
        })}
      </nav>

      {/* logout button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
