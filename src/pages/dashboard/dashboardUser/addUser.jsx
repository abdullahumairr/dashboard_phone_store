import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUser } from "@/utils/api/users";
import LayoutDashboard from "@/components/layout/layoutDashboard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, UserPlus } from "lucide-react";

const addUserSchema = z.object({
  fullname: z
    .string()
    .min(8, { message: "Nama Lengkap harus minimal 8 karakter" }),
  username: z.string().min(5, { message: "Username harus minimal 5 karakter" }),
  password: z.string().min(5, { message: "Password harus minimal 5 karakter" }),
  email: z.email({ message: "Format email tidak valid" }),
  phone_number: z
    .string()
    .refine((val) => !isNaN(val), "Nomor telepon harus berupa angka")
    .transform((val) => Number(val)),
  age: z
    .string()
    .refine((val) => !isNaN(val), "Umur harus berupa angka")
    .transform((val) => Number(val))
    .refine((val) => val >= 18 && val <= 60, {
      message: "Umur harus antara 18 - 60 tahun",
    }),
  address: z.string().min(10, { message: "Alamat harus minimal 10 karakter" }),
  role: z.enum(["user", "admin"], { message: "Role tidak valid" }),
});

function AddUser() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone_number: 0,
      age: 0,
      address: "",
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const message = await addUser(data);
      alert("User berhasil ditambahkan: " + message);
      navigate("/dashboard/user");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Gagal menambahkan user.");
    }
  };

  return (
    <LayoutDashboard>
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard/user")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Users</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserPlus className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Add New User
              </h1>
              <p className="text-slate-500 mt-1">
                Fill in the form below to create a new user
              </p>
            </div>
          </div>
        </div>

        {/* form */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* fullname */}
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Nama Lengkap
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Nama Lengkap"
                          {...field}
                          className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Username"
                          {...field}
                          className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Email"
                          type="email"
                          {...field}
                          className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Password"
                          type="password"
                          {...field}
                          className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* telephone number */}
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Nomor Telepon
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Nomor Telepon"
                          {...field}
                          className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* age */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Umur
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Umur"
                          type="number"
                          {...field}
                          className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Alamat
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan Alamat Lengkap"
                        {...field}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Role
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-slate-700"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard/user")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                >
                  <Save size={18} />
                  Save User
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default AddUser;
