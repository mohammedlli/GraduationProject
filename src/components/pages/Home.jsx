import { useState } from "react";
import AddTask from "./AddTask";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, getTasks } from "../../service/tasks";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const queryClient = useQueryClient();

  // ✅ GET tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  // ✅ POST task
  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: (res) => {
      console.log("SUCCESS", res);
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (err) => {
      console.log("ERROR", err.response?.data);
    },
  });
  const { id } = useParams();
  const handleAddTask = (task) => {
    mutate({
      stage_id: id,
      user_id: localStorage.getItem("id"),
      question: task.question,
      language: task.language,
      description: "ddd",
    });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">صفحة المهام</h2>

        <div className="flex gap-3">
          <Link to="/StudentAnswers">
            <button className="border border-[#1E3A8A] text-[#1E3A8A] px-4 py-2 rounded-md text-sm hover:bg-[#E3F2FD]">
              أجوبة الطلاب
            </button>
          </Link>

          <button
            onClick={() => setShowPopup(true)}
            className="bg-[#1E3A8A] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1D4ED8]"
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

        {/* Loading */}
        {isLoading && <p className="text-center">Loading...</p>}

        {/* Empty */}
        {!isLoading && tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-10">لا توجد مهام</p>
        )}

        {/* Rows */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-4 gap-4 bg-white rounded-md px-4 py-3 mb-2 text-sm hover:bg-gray-50"
          >
            <div>{task.question || "—"}</div>
            <div className="text-teal-600">{task.file || "—"}</div>
            <div>{task.deadline || "—"}</div>
            <div>{task.score || "—"}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl w-[90%] max-w-3xl p-6">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
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
