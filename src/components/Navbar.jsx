import { Link } from "react-router-dom";

export default function Navbar({ role }) {
  return (
    <nav
      dir="rtl"
      className="
        w-full h-18
        flex items-center justify-between
        px-10
        bg-[#1E3A8A]
        shadow-md
      "
    >
      {/* اسم الجامعة – يمين */}
      <h1 className="text-white text-lg font-bold">
        جامعة بغداد - كلية العلوم
      </h1>

      {/* يظهر فقط إذا كان تدريسي */}
      {role === "teacher" && (
        <Link to="/StudentAnswers">
          <button
            className="
              bg-white
              text-[#0D47A1]
              px-5 py-2
              rounded-lg
              font-semibold
              shadow
              hover:bg-[#E3F2FD]
              transition
            "
          >
              أجوبة الطلاب
          </button>
        </Link>
      )}
    </nav>
  );
}
