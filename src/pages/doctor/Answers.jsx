import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FiFileText,
  FiPlayCircle,
  FiAlertCircle,
  FiInbox,
} from "react-icons/fi";
import { getAnswerById } from "../../service/Answers";
import AnswerAi from "../../components/AnswerAi";
import AnswerCard from "../../components/AnswerCard";
import { getTasks, getTasksById } from "../../service/tasks";

function Answer() {
  const { id } = useParams();

  const {
    data: answers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["answers", id],
    queryFn: () => getAnswerById(id),
  });

  const {
    data: task,
    isLoading: isLoadingTask,
    isError: isErrorTask,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTasksById(id),
  });

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        {/* Task Info */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-[#4B96FF]/10 p-2 text-[#4B96FF]">
              <FiFileText size={18} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">تفاصيل المهمة</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Language */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-400">اللغة</p>
              <p className="font-semibold text-gray-800">
                {task?.language || "—"}
              </p>
            </div>

            {/* Stage ID */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-400">Stage ID</p>
              <p className="font-semibold text-gray-800">
                {task?.stage_id || "—"}
              </p>
            </div>

            {/* User ID */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-400">User ID</p>
              <p className="font-semibold text-gray-800">
                {task?.user_id || "—"}
              </p>
            </div>

            {/* Answer count (optional nice touch) */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-400">عدد الإجابات</p>
              <p className="font-semibold text-gray-800">
                {answers?.length || 0}
              </p>
            </div>
          </div>

          {/* Answer preview (optional) */}
          {answers?.[0]?.answer && (
            <div className="mt-5 bg-[#4B96FF]/5 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">نموذج إجابة</p>
              <p className="text-gray-800 font-medium">{answers[0].answer}</p>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-5">
          {isLoading &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}

          {isError && (
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-6 py-8 text-red-500 shadow-sm">
              <FiAlertCircle size={20} />
              <span className="font-medium">حدث خطأ أثناء تحميل البيانات</span>
            </div>
          )}

          {!isLoading && !isError && answers?.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-10 text-center shadow-sm">
              <div className="mb-3 rounded-full bg-gray-100 p-4 text-gray-400">
                <FiInbox size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">
                لا توجد إجابات حالياً
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                سيتم عرض الإجابات هنا عند توفرها
              </p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            answers?.map((item, index) => (
              <AnswerCard key={index} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Answer;
