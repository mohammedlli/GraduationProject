import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCode, FiCalendar, FiUser, FiUploadCloud } from "react-icons/fi";
import AddAnswerModal from "./AddAnswerModel";

function TaskCard({ item, onSave, isLoading }) {
  const [open, setOpen] = useState(false);

  const handleSave = (data) => {
    onSave({
      ...data,
      task_id: item.id,
    });
    setOpen(false);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
        <span className="absolute right-0 top-0 h-full w-1.5 bg-[#4B96FF]" />

        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-xl bg-[#4B96FF]/10 px-3 py-1 text-sm font-medium text-[#4B96FF]">
              <FiCode size={16} />
              مهمة برمجية
            </div>

            <h2 className="break-words text-xl font-bold text-gray-900">
              {item?.question}
            </h2>

            <p className="mt-2 text-gray-600">{item?.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-3">
              <div className="mb-1 flex items-center gap-2 text-gray-500">
                <FiCode size={14} />
                Language
              </div>
              <p className="font-semibold text-gray-800">{item?.language}</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3">
              <div className="mb-1 flex items-center gap-2 text-gray-500">
                <FiUser size={14} />
                User ID
              </div>
              <p className="font-semibold text-gray-800">{item?.user_id}</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3">
              <div className="mb-1 flex items-center gap-2 text-gray-500">
                <FiCalendar size={14} />
                Created
              </div>
              <p className="font-semibold text-gray-800">
                {new Date(item?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap justify-end gap-3">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#4B96FF] px-5 py-2.5 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <FiUploadCloud size={16} />
              إرسال الإجابة
            </button>

            <Link
              to={`/student-code/${item?.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#4B96FF] px-5 py-2.5 font-semibold text-[#4B96FF] transition hover:bg-[#4B96FF]/5"
            >
              <FiCode size={16} />
              عرض الحل
            </Link>
          </div>
        </div>
      </div>

      <AddAnswerModal
        open={open}
        onClose={() => setOpen(false)}
        taskId={item?.id}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </>
  );
}

export default TaskCard;