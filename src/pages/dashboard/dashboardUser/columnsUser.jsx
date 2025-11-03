import UserActionCell from "./UserActionCell";

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
    header: "Aksi",
    cell: ({ row }) => <UserActionCell id={row.original.id} />,
  },
];



