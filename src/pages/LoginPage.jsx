import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../service/login";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { playSound } from "../hooks/useSound";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      playSound("success");
      toast.success("تم تسجيل الدخول بنجاح 🎉");
      if (res.user.role === "DOCTOR") {
        navigate("/");
      } else {
        navigate("/tasks-student");
      }
    },
    onError: () => {
      playSound("err");
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      playSound("err");
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    mutate(form);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center  px-4"
    >
      {/* Container */}
      <div className="w-fit max-w-5xl grid md:grid-cols-1 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side (Desktop) */}

        {/* Right Side */}
        <div className="w-full p-6 sm:p-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            تسجيل الدخول
          </h1>
          <p className="text-center text-gray-500 mt-1 text-sm sm:text-base">
            أدخل بياناتك للمتابعة
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-right focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="كلمة المرور"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-right focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                تذكرني
              </label>

              <Link to="/signup" className="text-[#4B96FF] hover:underline">
                ليس لديك حساب؟
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-lg bg-[#4B96FF] text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
