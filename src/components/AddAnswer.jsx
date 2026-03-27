import { useState } from "react";

export default function AddAnswer({ onSave }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      answer,
    };

    onSave(newTask);
    setAnswer("");
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
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
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

        {/* التاريخ + الدرجة */}

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
