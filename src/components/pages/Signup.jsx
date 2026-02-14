import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [role, setRole] = useState("student");
  const [stage, setStage] = useState("");
  const navigate = useNavigate();

 const handleLogin = () => {
  if (role === "student" && !stage) {
    alert("الرجاء اختيار المرحلة");
    return;
  }

  if (role === "student") {
    navigate("/Stages", { state: { stage, role } });
  } else {
    navigate("/HomeCard", { state: { role } });
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <div className="w-full max-w-md rounded-xl bg-white px-6 py-10 shadow-md border border-[#CBD5E1]">

        {/* العنوان */}
        <h1 className="text-2xl font-bold text-center mb-6 text-[#1E3A8A]">
          تسجيل الدخول
        </h1>

        {/* الإيميل */}
        <input
          type="text"
          placeholder="الإيميل أو اسم المستخدم"
          className="
            text-right w-full mb-4 px-4 py-2
            border border-[#CBD5E1]
            rounded-lg
            text-[#374151]
            focus:ring-2 focus:ring-[#1E3A8A]
            focus:outline-none
          "
        />

        {/* كلمة المرور */}
        <input
          type="password"
          placeholder="كلمة المرور"
          className="
            text-right w-full mb-4 px-4 py-2
            border border-[#CBD5E1]
            rounded-lg
            text-[#374151]
            focus:ring-2 focus:ring-[#1E3A8A]
            focus:outline-none
          "
        />

        {/* اختيار النوع */}
        <p className="mb-2 text-right font-medium text-[#374151]">
          اختيار النوع
        </p>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-lg border transition
              ${
                role === "student"
                  ? "bg-[#1E3A8A] text-white"
                  : "border-[#CBD5E1] text-[#374151] hover:bg-[#E5E7EB]"
              }`}
          >
             طالب
          </button>

          <button
            onClick={() => setRole("teacher")}
            className={`flex-1 py-2 rounded-lg border transition
              ${
                role === "teacher"
                  ? "bg-[#1E3A8A] text-white"
                  : "border-[#CBD5E1] text-[#374151] hover:bg-[#E5E7EB]"
              }`}
          >
             تدريسي
          </button>
        </div>

        {/* اختيار المرحلة */}
        {role === "student" && (
          <div className="mb-6">
            <label className="block mb-2 text-right font-medium text-[#374151]">
              اختيار المرحلة
            </label>

            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="
                w-full px-4 py-2 rounded-lg
                border border-[#CBD5E1]
                bg-white
                text-right text-[#374151]
                focus:ring-2 focus:ring-[#1E3A8A]
                focus:outline-none
              "
            >
              <option value="">اختر المرحلة</option>
              <option value="first">المرحلة الأولى</option>
              <option value="second">المرحلة الثانية</option>
              <option value="third">المرحلة الثالثة</option>
              <option value="fourth">المرحلة الرابعة</option>
            </select>
          </div>
        )}

        {/* زر الدخول */}
        <button
          onClick={handleLogin}
          className="
            w-full bg-[#1E3A8A] text-white py-2 rounded-lg
            hover:bg-[#1D4ED8] transition
          "
        >
          دخول
        </button>

      </div>
    </div>
  );
}

export default Signup;
