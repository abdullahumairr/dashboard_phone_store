import { Trash2, Eye, Pencil } from "lucide-react";
import { deleteUser } from "@/utils/api/users";
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

export const columns = [
  {
    header: "No",
    accessorFn: (originalRow, index) => index + 1,
    cell: ({ row }) => (
      <div className="font-medium text-slate-600">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "fullname",
    header: "Nama Lengkap",
    cell: ({ row }) => (
      <div className="font-semibold text-slate-800">
        {row.getValue("fullname")}
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="text-slate-600">@{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-slate-600">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: "Nomor Telepon",
    cell: ({ row }) => (
      <div className="text-slate-600">{row.getValue("phone_number")}</div>
    ),
  },
  {
    accessorKey: "age",
    header: "Umur",
    cell: ({ row }) => (
      <div className="text-slate-600">{row.getValue("age")} tahun</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => (
      <div className="text-slate-600 max-w-xs truncate">
        {row.getValue("address")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      return (
        <span
          className={`
          px-3 py-1 rounded-full text-xs font-semibold
          ${
            role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }
        `}
        >
          {role}
        </span>
      );
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.original.id;

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
          {/* Button Info */}
          <button
            onClick={() => console.log("View detail:", id)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={18} />
          </button>

          {/* Button Edit */}
          <button
            onClick={() => console.log("Edit user:", id)}
            className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
            title="Edit User"
          >
            <Pencil size={18} />
          </button>

          {/* Button Delete */}
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
                  Apakah Anda yakin ingin menghapus data user ini? Data yang
                  sudah dihapus tidak dapat dikembalikan lagi.
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
    },
  },
];
