import { useState } from "react";
import AddTask from "./AddTask";
import { Link } from "react-router-dom";


function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([task, ...tasks]);
    setShowPopup(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">

      {/* Header */}
<div className="bg-white border-b px-6 py-4 flex justify-between items-center">

  {/* يمين */}
  <h2 className="text-xl font-bold text-gray-700">
    صفحة المهام
  </h2>

  {/* يسار أزرار */}
  <div className="flex gap-3">

    <Link to="/StudentAnswers">
      <button
        className="
          bg-white
          border border-[#1E3A8A]
          text-[#1E3A8A]
          px-4 py-2
          rounded-md
          text-sm
          hover:bg-[#E3F2FD]
          transition
        "
      >
        أجوبة الطلاب
      </button>
    </Link>

    <button
      onClick={() => setShowPopup(true)}
      className="
        bg-[#1E3A8A]
        text-white
        px-4 py-2
        rounded-md
        text-sm
        hover:bg-[#1D4ED8]
        transition
      "
    >
        إضافة مهمة جديدة
    </button>

  </div>
</div>

      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto">

        {/* Header Row */}
        <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-gray-600 border-b pb-3 mb-4">
          <div>السؤال</div>
          <div>المرفق</div>
          <div>تاريخ الانتهاء</div>
          <div>الدرجة</div>
        </div>

        {/* Empty */}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            لا توجد مهام مدخلة
          </p>
        )}

        {/* Rows */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-4 gap-4 bg-white rounded-md px-4 py-3 mb-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="truncate">
              {task.question || "—"}
            </div>

            <div className="text-teal-600">
              {task.pdf ? task.pdf.name : "—"}
            </div>

            <div>
              {task.deadline || "—"}
            </div>

            <div>
              {task.score || "—"}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="relative bg-white rounded-xl w-[90%] max-w-3xl p-6">

  {/* زر X في الأعلى */}
  <button
    onClick={() => setShowPopup(false)}
    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl font-bold"

  >
    ✕
  </button>

  <AddTask onSave={handleAddTask} />

</div>

        </div>
      )}
    </div>
  );
}

export default Home;
