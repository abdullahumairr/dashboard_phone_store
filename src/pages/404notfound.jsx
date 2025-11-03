import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse leading-none">
            404
          </h1>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-300 text-lg max-w-md mx-auto">
            balik sono
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Kembali</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </button>
        </div>


        <div className="mt-16 flex justify-center gap-2">
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
