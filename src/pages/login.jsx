import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Smartphone } from "lucide-react";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Username atau Email wajib diisi")
    .refine(
      (val) => /\S+@\S+\.\S+/.test(val) || val.length >= 5,
      "Masukkan username (min 5 karakter) atau email valid"
    ),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/dashboard/user");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* login card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Smartphone className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Phone Store
            </h1>
            <p className="text-slate-600 mt-2">
              Welcome back! Please login to continue
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* username / email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username / Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  {...register("identifier")}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-700 placeholder:text-slate-400"
                  placeholder="Enter username or email"
                />
              </div>
              {errors.identifier && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="password"
                  {...register("password")}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-700 placeholder:text-slate-400"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* remember & fforgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* login button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              <span>Login to Dashboard</span>
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* register link */}
          <p className="text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
