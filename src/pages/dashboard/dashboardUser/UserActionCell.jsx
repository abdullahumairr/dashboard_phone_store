import { useState } from "react";
import { Trash2, Eye, Pencil } from "lucide-react";
import { deleteUser } from "@/utils/api/users";
import DetailUser from "./detailUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function UserActionCell({ id }) {
  const [detailUserPopup, setDetailUserPopup] = useState(false);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      alert("Data User Berhasil Dihapus");
      window.location.reload();
    } catch (error) {
      alert("Gagal Menghapus Data User: " + error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* button infoo */}
      <button
        onClick={() => setDetailUserPopup(true)}
        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
        title="View Details"
      >
        <Eye size={18} />
      </button>
      {detailUserPopup && (
        <DetailUser id={id} setDetailUserPopup={setDetailUserPopup} />
      )}

      {/* buttton edit */}
      <button
        onClick={() => console.log("Edit user:", id)}
        className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
        title="Edit User"
      >
        <Pencil size={18} />
      </button>

      {/* button delete */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
            title="Delete User"
          >
            <Trash2 size={18} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data User</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data user ini? Data yang sudah
              dihapus tidak dapat dikembalikan lagi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteUser(id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
