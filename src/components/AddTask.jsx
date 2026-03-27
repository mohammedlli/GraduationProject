import { useState } from "react";
import {
  FiHelpCircle,
  FiFileText,
  FiCalendar,
  FiAward,
  FiCode,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

export default function AddTask({ onSave, onClose, isOpen }) {
  const [question, setQuestion] = useState("");
  const [pdf, setPdf] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [score, setScore] = useState("");
  const [language, setLanguage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      question,
      pdf,
      deadline,
      language,
      score,
    };

    onSave(newTask);

    setQuestion("");
    setPdf(null);
    setDeadline("");
    setScore("");
    setLanguage("");

    onClose?.();
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-10 rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <FiX size={22} />
        </button>

        {/* Header */}
        <div className="border-b border-gray-100 bg-[#4B96FF]/5 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#4B96FF]/10 p-3 text-[#4B96FF]">
              <FiFileText size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                إضافة مهمة جديدة
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                قم بإدخال تفاصيل المهمة البرمجية بشكل واضح ومنظم
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FiHelpCircle className="text-[#4B96FF]" />
              السؤال
            </label>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              placeholder="اكتب السؤال هنا..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-gray-800 outline-none transition focus:border-[#4B96FF] focus:ring-4 focus:ring-[#4B96FF]/10"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FiCode className="text-[#4B96FF]" />
              لغة البرمجة
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-right text-gray-800 outline-none transition focus:border-[#4B96FF] focus:ring-4 focus:ring-[#4B96FF]/10"
            >
              <option value="">اختر اللغة</option>
              <option value="C++">C++</option>
              <option value="C#">C#</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FiUploadCloud className="text-[#4B96FF]" />
              ملف PDF (اختياري)
            </label>

            <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-[#4B96FF] hover:bg-[#4B96FF]/5">
              <FiFileText className="text-[#4B96FF]" size={22} />
              <span className="text-sm font-medium text-gray-700">
                {pdf ? pdf.name : "اضغط لاختيار ملف PDF"}
              </span>
              <span className="text-xs text-gray-500">PDF files only</span>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FiCalendar className="text-[#4B96FF]" />
                تاريخ الانتهاء
              </label>

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-[#4B96FF] focus:ring-4 focus:ring-[#4B96FF]/10"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FiAward className="text-[#4B96FF]" />
                الدرجة
              </label>

              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="مثال: 10"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-[#4B96FF] focus:ring-4 focus:ring-[#4B96FF]/10"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#4B96FF] px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              حفظ المهمة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
