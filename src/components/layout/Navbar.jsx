import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

export default function Navbar({ role }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      dir="rtl"
      className="w-full h-16 flex items-center justify-between px-6 md:px-10 bg-[#4B96FF] shadow-md"
    >
      {/* Right */}
      <h1 className="text-white text-lg md:text-xl font-bold">
        جامعة بغداد - كلية العلوم
      </h1>

      {/* Left */}
      <div className="flex items-center gap-3">
        
        {/* Teacher button */}
        {role === "teacher" && (
          <Link to="/StudentAnswers">
            <button className="bg-white/90 text-[#4B96FF] px-4 py-2 rounded-xl font-medium shadow hover:bg-white transition">
              أجوبة الطلاب
            </button>
          </Link>
        )}

        {/* ✅ Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          
          {/* Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition"
          >
            <div className="bg-white text-[#4B96FF] rounded-full p-2">
              <FiUser size={16} />
            </div>

            <div className="text-right leading-tight hidden sm:block">
              <p className="text-sm font-semibold">
                {user?.name || "User"}
              </p>
              <p className="text-xs opacity-80">
                {user?.email || "email@example.com"}
              </p>
            </div>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50">
              
              <Link to="/profile">
                <div className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer">
                  <FiUser />
                  الملف الشخصي
                </div>
              </Link>

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-100"
              >
                <FiLogOut />
                تسجيل الخروج
              </button>

            </div>
          )}
        </div>

      </div>
    </nav>
  );
}