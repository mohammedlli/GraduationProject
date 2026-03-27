import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../service/login";
import { useMutation } from "@tanstack/react-query";
import { playSound } from "../hooks/useSound";
function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    stage_id: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      playSound("success");
      toast.success("تم إنشاء الحساب بنجاح 🎉");
      navigate("/stages", { replace: true });
    },
    onError: () => {
      playSound("err");
      toast.error("فشل في إنشاء الحساب");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      playSound("err");
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    if (form.password !== form.password_confirmation) {
      playSound("err");
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }

    if (role === "student" && !form.stage_id) {
      playSound("err");
      toast.error("يرجى اختيار المرحلة");
      return;
    }

    mutate({
      ...form,
      role,
      stage_id: role === "student" ? form.stage_id : null,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      {/* Container */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side (Desktop Only) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-[#4B96FF] text-white p-10">
          <h2 className="text-3xl font-bold mb-4"> 👋 مرحباً </h2>
          <p className="text-center opacity-90">أنشئ حسابك وابدأ رحلتك معنا</p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full p-6 sm:p-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            إنشاء حساب
          </h1>
          <p className="text-center text-gray-500 mt-1 text-sm sm:text-base">
            أدخل بياناتك للمتابعة
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-right focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="الإيميل"
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

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="تأكيد كلمة المرور"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({
                  ...form,
                  password_confirmation: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border rounded-lg text-right focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {/* Role */}
            <div>
              <p className="mb-2 text-right font-medium text-gray-600">
                اختيار النوع
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-2.5 rounded-lg transition font-medium
                    ${
                      role === "student"
                        ? "bg-[#4B96FF] text-white shadow"
                        : "border text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  طالب
                </button>

                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`py-2.5 rounded-lg transition font-medium
                    ${
                      role === "teacher"
                        ? "bg-[#4B96FF] text-white shadow"
                        : "border text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  تدريسي
                </button>
              </div>
            </div>

            {/* Stage */}
            {role === "student" && (
              <div>
                <label className="block mb-2 text-right font-medium text-gray-600">
                  اختيار المرحلة
                </label>

                <select
                  value={form.stage_id}
                  onChange={(e) =>
                    setForm({ ...form, stage_id: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border text-right focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">اختر المرحلة</option>
                  <option value="1">المرحلة الأولى</option>
                  <option value="2">المرحلة الثانية</option>
                  <option value="3">المرحلة الثالثة</option>
                  <option value="4">المرحلة الرابعة</option>
                </select>
              </div>
            )}

            {/* Link */}
            <div className="text-sm text-right">
              <Link to="/login" className="text-[#4B96FF] hover:underline">
                لديك حساب؟
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-lg bg-[#4B96FF] text-white font-semibold hover:bg-[#0084ff] transition disabled:opacity-50"
            >
              {isPending ? "جاري التسجيل..." : "إنشاء حساب"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
