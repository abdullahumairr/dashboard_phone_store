import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, User, Mail, Lock, Calendar, ArrowLeft } from "lucide-react";

const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(3, "Nama Lengkap minimal 3 karakter")
      .max(50, "Nama Lengkap maksimal 50 karakter"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        "Password harus mengandung huruf besar dan angka"
      ),
    confirmPassword: z.string().min(1, "Konfirmasi Password wajib diisi"),
    age: z
      .string()
      .refine((val) => !isNaN(val), "Umur harus berupa angka")
      .transform((val) => Number(val))
      .refine((val) => val >= 18 && val <= 60, {
        message: "Umur harus antara 18 - 60 tahun",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Konfirmasi Password tidak sama",
    path: ["confirmPassword"],
  });

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Register data:", data);
    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-lg relative">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Login</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-3 shadow-lg">
              <UserPlus className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-slate-600 mt-2">
              Join us and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  {...register("fullname")}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-slate-700"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="email"
                  {...register("email")}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-slate-700"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="password"
                  {...register("password")}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-slate-700"
                  placeholder="Create a password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-slate-700"
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Umur */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Age
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="number"
                  {...register("age")}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-slate-700"
                  placeholder="Enter your age"
                />
              </div>
              {errors.age && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
            >
              <UserPlus size={20} />
              <span>Create Account</span>
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-slate-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
