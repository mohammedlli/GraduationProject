import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiClipboard,
  FiPlus,
  FiUsers,
  FiCode,
  FiCalendar,
  FiFileText,
  FiInbox,
  FiArrowLeft,
} from "react-icons/fi";
import { createTask, getTasks } from "../../service/tasks";
import AddTask from "../../components/AddTask";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setShowPopup(false);
    },
    onError: (err) => {
      console.log("ERROR", err.response?.data);
    },
  });

  const handleAddTask = (task) => {
    mutate({
      stage_id: id,
      user_id: localStorage.getItem("id"),
      question: task.question,
      language: task.language,
      description: task.description || "بدون وصف",
      deadline: task.deadline,
      score: task.score,
      pdf: task.pdf,
    });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-[#4B96FF]/10 p-3 text-[#4B96FF]">
              <FiClipboard size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">صفحة المهام</h1>
              <p className="mt-1 text-sm text-gray-500">
                إدارة المهام البرمجية وعرضها بشكل منظم واحترافي
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/StudentAnswers">
              <button className="inline-flex items-center gap-2 rounded-xl border border-[#4B96FF] px-4 py-2.5 text-sm font-semibold text-[#4B96FF] transition hover:bg-[#4B96FF]/5">
                <FiUsers size={16} />
                أجوبة الطلاب
              </button>
            </Link>

            <button
              onClick={() => setShowPopup(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#4B96FF] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <FiPlus size={16} />
              إضافة مهمة جديدة
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-3xl bg-white shadow-sm"
              />
            ))}
          </div>
        )}

        {!isLoading && tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 rounded-full bg-gray-100 p-4 text-gray-400">
              <FiInbox size={30} />
            </div>
            <h3 className="text-xl font-bold text-gray-700">لا توجد مهام حالياً</h3>
            <p className="mt-2 text-sm text-gray-500">
              يمكنك البدء بإضافة مهمة جديدة من الزر بالأعلى
            </p>
          </div>
        )}

        {!isLoading && tasks.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <Link
                to={`answer/${task.id}`}
                key={task.id}
                className="group block overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Top strip */}
                <div className="h-2 w-full bg-[#4B96FF]" />

                <div className="p-6">
                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-xl bg-[#4B96FF]/10 px-3 py-1 text-sm font-medium text-[#4B96FF]">
                    <FiCode size={15} />
                    مهمة برمجية
                  </div>

                  {/* Question */}
                  <h2 className="line-clamp-2 text-lg font-bold leading-8 text-gray-800">
                    {task.question || "بدون عنوان"}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {task.description || "لا يوجد وصف متوفر لهذه المهمة"}
                  </p>

                  {/* Info */}
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-gray-400">
                        <FiCode size={14} />
                        اللغة
                      </div>
                      <p className="font-semibold text-gray-800">
                        {task.language || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-gray-400">
                        <FiCalendar size={14} />
                        الموعد
                      </div>
                      <p className="font-semibold text-gray-800">
                        {task.deadline || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-gray-400">
                        <FiFileText size={14} />
                        الدرجة
                      </div>
                      <p className="font-semibold text-gray-800">
                        {task.score || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-gray-400">
                        <FiFileText size={14} />
                        المرفق
                      </div>
                      <p className="truncate font-semibold text-[#4B96FF]">
                        {task.file || "لا يوجد"}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <span className="text-sm font-medium text-gray-500">
                      عرض التفاصيل
                    </span>

                    <div className="flex items-center gap-2 text-[#4B96FF] transition group-hover:translate-x-[-4px]">
                      <FiArrowLeft size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Popup */}
      <AddTask
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSave={handleAddTask}
        isLoading={isPending}
      />
    </div>
  );
}

export default Home;