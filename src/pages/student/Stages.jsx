import { useState } from "react";

export default function Stages() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      question: "السؤال الأول",
      pdf: "homework1.pdf",
      deadline: "2026-01-31",
      score: 200,
      answerPdf: null,
    },
    {
      id: 2,
      question: "الواجب الثاني",
      pdf: null,
      deadline: "2026-03-18",
      score: null,
      answerPdf: null,
    },
  ]);

  const handleUpload = (id, file) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, answerPdf: file } : task
      )
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F1F5F9] p-6">
      {/* العنوان */}
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
        واجباتي
      </h2>

      {/* الجدول */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="w-full text-sm text-right">
          {/* رأس الجدول */}
          <thead className="bg-[#1E3A8A] text-white">
            <tr>
              <th className="px-4 py-3">السؤال</th>
              <th className="px-4 py-3">ملف الأستاذ</th>
              <th className="px-4 py-3">تاريخ الانتهاء</th>
              <th className="px-4 py-3">الدرجة</th>
              <th className="px-4 py-3">إجابة الطالب</th>
            </tr>
          </thead>

          {/* جسم الجدول */}
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                {/* السؤال */}
                <td className="px-4 py-3 font-medium text-gray-700">
                  {task.question || "—"}
                </td>

                {/* PDF الأستاذ */}
                <td className="px-4 py-3">
                  {task.pdf ? (
                    <a
                      href="#"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      📄 تحميل
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                {/* التاريخ */}
                <td className="px-4 py-3 text-gray-600">
                  {task.deadline || "—"}
                </td>

                {/* الدرجة */}
                <td className="px-4 py-3">
                  {task.score !== null ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                      {task.score}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                {/* رفع الإجابة */}
                <td className="px-4 py-3">
                  {task.answerPdf ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">
                      ✔ تم الرفع
                    </span>
                  ) : (
                    <label className="cursor-pointer inline-block">
                      <span className="px-4 py-1.5 text-xs rounded-lg bg-[#1E3A8A] text-white hover:bg-[#1D4ED8] transition">
                        رفع PDF
                      </span>
                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) =>
                          handleUpload(task.id, e.target.files[0])
                        }
                      />
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
