import DataTable from "@/components/dataTable";
import { columns } from "@/pages/dashboard/dashboardUser/columnsUser";
import LayoutDashboard from "@/components/layout/layoutDashboard";
import { getUsers } from "@/utils/api/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Users as UsersIcon, RefreshCw } from "lucide-react";

export default function DashboardUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/dashboard/user/add");
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LayoutDashboard>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <UsersIcon className="text-white" size={20} />
              </div>
              User Management
            </h1>
            <p className="text-slate-500 mt-1">Manage and monitor all users</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={fetchUsers} variant="outline" className="gap-2">
              <RefreshCw size={18} />
              Refresh
            </Button>
            <Button
              onClick={handleAddUser}
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <UserPlus size={18} />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-blue-700 mt-1">
                  {users.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <UsersIcon className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">
                  Admin Users
                </p>
                <p className="text-3xl font-bold text-purple-700 mt-1">
                  {users.filter((u) => u.role === "admin").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">
                  Regular Users
                </p>
                <p className="text-3xl font-bold text-green-700 mt-1">
                  {users.filter((u) => u.role === "user").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="animate-spin text-blue-600" size={32} />
                <p className="text-slate-500">Loading data...</p>
              </div>
            </div>
          ) : (
            <DataTable columns={columns} data={users} />
          )}
        </div>
      </div>
    </LayoutDashboard>
  );
}
