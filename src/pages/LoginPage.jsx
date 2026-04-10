import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../service/login";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { playSound } from "../hooks/useSound";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiShield,
} from "react-icons/fi";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8"
    >
      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-gray-100 lg:grid-cols-2"
        >
          {/* Right side / form */}
          <div className="order-2 p-6 sm:p-8 lg:order-1 lg:p-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-8"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-[#4B96FF]/10 px-4 py-2 text-sm font-semibold text-[#4B96FF]">
                <FiShield size={16} />
                بوابة تسجيل الدخول
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                تسجيل الدخول
              </h1>

              <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
                أدخل بياناتك للوصول إلى النظام ومتابعة المهام والمحتوى الدراسي
                بسهولة وأمان.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  البريد الإلكتروني
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 transition focus-within:border-[#4B96FF] focus-within:ring-4 focus-within:ring-[#4B96FF]/10">
                  <FiMail className="shrink-0 text-[#4B96FF]" size={18} />
                  <input
                    type="email"
                    placeholder="أدخل البريد الإلكتروني"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-transparent text-right outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  كلمة المرور
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 transition focus-within:border-[#4B96FF] focus-within:ring-4 focus-within:ring-[#4B96FF]/10">
                  <FiLock className="shrink-0 text-[#4B96FF]" size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full bg-transparent text-right outline-none placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-400 transition hover:text-[#4B96FF]"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Options */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="flex flex-wrap items-center justify-between gap-3 text-sm"
              >
                <label className="flex cursor-pointer items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-[#4B96FF]"
                  />
                  تذكرني
                </label>

                <Link
                  to="/signup"
                  className="font-medium text-[#4B96FF] transition hover:underline"
                >
                  ليس لديك حساب؟
                </Link>
              </motion.div>

              {/* Button */}
              <motion.button
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isPending}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4B96FF] py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiLogIn size={18} />
                {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </motion.button>
            </form>
          </div>

          {/* Left side / visual panel */}
          <div className="order-1 hidden bg-gradient-to-br from-[#4B96FF] via-blue-500 to-indigo-600 p-10 text-white lg:flex lg:order-2 lg:flex-col lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="inline-flex rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                منصة تقيم ذكية
              </div>
              <div>
                <h2 className="mt-6 text-4xl font-extrabold leading-tight">
                  مرحباً بعودتك
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
                  سجّل الدخول للوصول إلى المراحل الدراسية، المهام، الإجابات،
                  ومتابعة تقدمك ضمن تجربة حديثة وسهلة الاستخدام.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid gap-4"
            >
              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-md">
                <p className="text-sm text-white/80">by</p>
                <p className="mt-2 text-2xl font-bold">
                  Mohammed ahmed ali akbar
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-md">
                <p className="text-sm text-white/80">Supervisor</p>
                <p className="mt-2 text-2xl font-bold">
                  Mariam abdul raheem yassir
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
