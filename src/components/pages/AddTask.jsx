import { useState } from "react";

export default function AddTask({ onSave }) {
  const [question, setQuestion] = useState("");
  const [pdf, setPdf] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      question,
      pdf,
      deadline,
      score,
    };

    onSave(newTask);

    setQuestion("");
    setPdf(null);
    setDeadline("");
    setScore("");
  };

  return (
    <div dir="rtl" className="w-full">
      {/* العنوان */}
      <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 text-center">
        إضافة مهمة جديدة
      </h2>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          rounded-xl
          shadow-md
          border border-gray-200
          p-6
          space-y-5
        "
      >
        {/* السؤال */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            السؤال
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            placeholder="اكتب السؤال هنا..."
            className="
              w-full
              rounded-lg
              border border-gray-300
              p-2
              text-right
              focus:ring-2
              focus:ring-[#1E3A8A]
              focus:outline-none
            "
          />
        </div>

        {/* PDF */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            ملف PDF (اختياري)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            className="
              w-full
              border border-gray-300
              rounded-lg
              p-2
              bg-gray-50
            "
          />
        </div>

        {/* التاريخ + الدرجة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              تاريخ الانتهاء
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="
                w-full
                border border-gray-300
                rounded-lg
                p-2
                focus:ring-2
                focus:ring-[#1E3A8A]
                focus:outline-none
              "
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              الدرجة
            </label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="مثال: 10"
              className="
                w-full
                border border-gray-300
                rounded-lg
                p-2
                focus:ring-2
                focus:ring-[#1E3A8A]
                focus:outline-none
              "
            />
          </div>
        </div>

        {/* زر الإضافة */}
        <button
          type="submit"
          className="
            w-full
            bg-[#1E3A8A]
            text-white
            py-2.5
            rounded-lg
            font-semibold
            hover:bg-[#1D4ED8]
            transition
          "
        >
          حفظ المهمة
        </button>
      </form>
    </div>
  );
}
