import { getUserById } from "@/utils/api/users";
import { useState, useEffect } from "react";
import { X, User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";

export default function DetailUser({ id, setDetailUserPopup }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserById = async (id) => {
    setLoading(true);
    try {
      const response = await getUserById(id);
      console.log(response);
      setUser(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setDetailUserPopup(false);
    }
  };

  return (
    <div
      className="fixed inset-0  backdrop-blur-sm  overflow-y-auto flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 rounded-t-2xl">
          <button
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            onClick={() => setDetailUserPopup(false)}
          >
            <X className="text-white" size={20} />
          </button>
          <h2 className="text-2xl font-bold text-white">Detail User</h2>
          <p className="text-blue-100 text-sm mt-1">Informasi lengkap pengguna</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-slate-500 mt-4">Memuat data...</p>
            </div>
          ) : user ? (
            <div className="space-y-4">
              {/* Nama Lengkap */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Nama Lengkap</p>
                  <p className="text-slate-800 font-semibold mt-1">{user.fullname || "-"}</p>
                </div>
              </div>

              {/* Username */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Username</p>
                  <p className="text-slate-800 font-semibold mt-1">@{user.username || "-"}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Email</p>
                  <p className="text-slate-800 font-semibold mt-1">{user.email || "-"}</p>
                </div>
              </div>

              {/* Nomor Telepon */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Phone className="text-orange-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Nomor Telepon</p>
                  <p className="text-slate-800 font-semibold mt-1">{user.phone_number || "-"}</p>
                </div>
              </div>

              {/* Umur */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Calendar className="text-pink-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Umur</p>
                  <p className="text-slate-800 font-semibold mt-1">{user.age ? `${user.age} tahun` : "-"}</p>
                </div>
              </div>

              {/* Alamat */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <MapPin className="text-teal-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Alamat</p>
                  <p className="text-slate-800 font-semibold mt-1">{user.address || "-"}</p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Shield className="text-indigo-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Role</p>
                  <div className="mt-2">
                    <span
                      className={`
                        px-4 py-2 rounded-full text-sm font-semibold inline-block
                        ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {user.role || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">Data tidak ditemukan</p>
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
}