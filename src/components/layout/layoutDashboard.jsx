import Sidebar from "@/components/sidebar";
import { Bell, Search, User } from "lucide-react";

export default function LayoutDashboard({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 flex items-center justify-end px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 ml-6">
            <button className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell size={20} className="text-slate-600" />date 
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-800">
                  Admin User
                </p>
                <p className="text-xs text-slate-500">umair@phonestore.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[calc(100vh-8rem)] backdrop-blur-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
