import { useState } from "react";
import { FiFileText, FiUpload, FiX } from "react-icons/fi";

function AddAnswerModal({ open, onClose, taskId, onSave, isLoading }) {
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      task_id: taskId,
      answer,
      file,
    });

    setAnswer("");
    setFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <FiX size={20} />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#4B96FF]/10 p-3 text-[#4B96FF]">
            <FiFileText size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">إرسال الإجابة</h2>
            <p className="text-sm text-gray-500">
              أضف النص وارفع الملف المطلوب
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              نص الإجابة
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              placeholder="اكتب إجابتك هنا..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4B96FF]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              رفع ملف
            </label>

            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-gray-500 transition hover:border-[#4B96FF] hover:bg-[#4B96FF]/5">
              <FiUpload size={18} />
              <span>{file ? file.name : "اختر ملفاً من الجهاز"}</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#4B96FF] px-5 py-2.5 font-semibold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "جاري الإرسال..." : "حفظ الإجابة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAnswerModal;