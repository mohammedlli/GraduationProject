import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUsers,
  FiBookOpen,
  FiArrowLeft,
  FiShield,
} from "react-icons/fi";
import { signup } from "../service/login";
import { playSound } from "../hooks/useSound";

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    stage_id: "",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      stage_id: "",
    });
    setRole("student");
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      playSound("err");
      toast.error("يرجى إدخال اسم المستخدم");
      return false;
    }

    if (!form.email.trim()) {
      playSound("err");
      toast.error("يرجى إدخال البريد الإلكتروني");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      playSound("err");
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
      return false;
    }

    if (!form.password) {
      playSound("err");
      toast.error("يرجى إدخال كلمة المرور");
      return false;
    }

    if (form.password.length < 6) {
      playSound("err");
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return false;
    }

    if (!form.password_confirmation) {
      playSound("err");
      toast.error("يرجى تأكيد كلمة المرور");
      return false;
    }

    if (form.password !== form.password_confirmation) {
      playSound("err");
      toast.error("كلمتا المرور غير متطابقتين");
      return false;
    }

    if (role === "student" && !form.stage_id) {
      playSound("err");
      toast.error("يرجى اختيار المرحلة");
      return false;
    }

    return true;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      playSound("success");
      toast.success("تم إنشاء الحساب بنجاح 🎉");
      resetForm();
      navigate("/stages", { replace: true });
    },
    onError: (error) => {
      playSound("err");
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "فشل في إنشاء الحساب";
      toast.error(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      password_confirmation: form.password_confirmation,
      role,
      stage_id: role === "student" ? form.stage_id : null,
    });
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8"
    >
      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-gray-100 lg:grid-cols-2"
        >
          {/* Visual side */}
          <div className="hidden bg-gradient-to-br from-[#4B96FF] via-blue-500 to-indigo-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="inline-flex rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                إنشاء حساب جديد
              </div>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight">
                ابدأ رحلتك معنا
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
                أنشئ حسابك للوصول إلى المراحل الدراسية، المهام، والإجابات ضمن
                تجربة حديثة ومنظمة وسهلة الاستخدام.
              </p>
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

          {/* Form side */}
          <div className="p-6 sm:p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-8"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-[#4B96FF]/10 px-4 py-2 text-sm font-semibold text-[#4B96FF]">
                <FiShield size={16} />
                بوابة إنشاء الحساب
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                إنشاء حساب
              </h1>

              <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
                أدخل بياناتك لإنشاء حساب جديد والبدء باستخدام المنصة.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
              >
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  اسم المستخدم
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition focus-within:border-[#4B96FF] focus-within:ring-4 focus-within:ring-[#4B96FF]/10">
                  <FiUser className="text-[#4B96FF]" size={18} />
                  <input
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full bg-transparent text-right outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  البريد الإلكتروني
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition focus-within:border-[#4B96FF] focus-within:ring-4 focus-within:ring-[#4B96FF]/10">
                  <FiMail className="text-[#4B96FF]" size={18} />
                  <input
                    type="email"
                    placeholder="أدخل البريد الإلكتروني"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full bg-transparent text-right outline-none placeholder:text-gray-400"
                    dir="ltr"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  كلمة المرور
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition focus-within:border-[#4B96FF] focus-within:ring-4 focus-within:ring-[#4B96FF]/10">
                  <FiLock className="text-[#4B96FF]" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
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

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
              >
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  تأكيد كلمة المرور
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition focus-within:border-[#4B96FF] focus-within:ring-4 focus-within:ring-[#4B96FF]/10">
                  <FiLock className="text-[#4B96FF]" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="أعد إدخال كلمة المرور"
                    value={form.password_confirmation}
                    onChange={(e) =>
                      updateField("password_confirmation", e.target.value)
                    }
                    className="w-full bg-transparent text-right outline-none placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-gray-400 transition hover:text-[#4B96FF]"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  اختيار النوع
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition ${
                      role === "student"
                        ? "bg-[#4B96FF] text-white shadow-lg shadow-blue-100"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FiBookOpen size={17} />
                    طالب
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRole("teacher");
                      updateField("stage_id", "");
                    }}
                    className={`flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition ${
                      role === "teacher"
                        ? "bg-[#4B96FF] text-white shadow-lg shadow-blue-100"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FiUsers size={17} />
                    تدريسي
                  </button>
                </div>
              </motion.div>

              {role === "student" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 }}
                >
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    اختيار المرحلة
                  </label>

                  <select
                    value={form.stage_id}
                    onChange={(e) => updateField("stage_id", e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-right outline-none transition focus:border-[#4B96FF] focus:ring-4 focus:ring-[#4B96FF]/10"
                  >
                    <option value="">اختر المرحلة</option>
                    <option value="1">المرحلة الأولى</option>
                    <option value="2">المرحلة الثانية</option>
                    <option value="3">المرحلة الثالثة</option>
                    <option value="4">المرحلة الرابعة</option>
                  </select>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="flex items-center justify-between gap-3"
              >
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#4B96FF] transition hover:underline"
                >
                  <FiArrowLeft size={16} />
                  لديك حساب؟
                </Link>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isPending}
                className="w-full rounded-2xl bg-[#4B96FF] py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "جاري التسجيل..." : "إنشاء حساب"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
