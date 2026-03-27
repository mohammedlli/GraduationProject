import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnswer } from "../../service/Answers";
import { getTasks } from "../../service/tasks";
import toast from "react-hot-toast";
import TaskCard from "../../components/TaskCard";

function TasksStudent() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTasks(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAnswer,
    onSuccess: () => {
      toast.success("تم إرسال الإجابة بنجاح 🎉");
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإرسال");
    },
  });

  const handleAddAnswer = (data) => {
    if (!data.answer?.trim()) {
      toast.error("يرجى كتابة الإجابة");
      return;
    }

    const formData = new FormData();
    formData.append("task_id", data.task_id);
    formData.append("user_id", localStorage.getItem("id"));
    formData.append("answer", data.answer);

    if (data.file) {
      formData.append("file", data.file);
    }

    mutate(formData);
  };

  return (
    <div dir="rtl" className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl bg-white px-6 py-4 text-center shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">المهام</h2>
          <p className="mt-1 text-sm text-gray-500">
            قم بحل المهام وإرسال إجابتك
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {isLoading &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl bg-gray-200/60"
              />
            ))}

          {isError && (
            <div className="text-center text-red-500">
              حدث خطأ أثناء تحميل المهام
            </div>
          )}

          {!isLoading && tasks.length === 0 && (
            <div className="text-center text-gray-500">لا توجد مهام حالياً</div>
          )}

          {!isLoading &&
            tasks.map((item) => (
              <TaskCard
                key={item.id}
                item={item}
                onSave={handleAddAnswer}
                isLoading={isPending}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TasksStudent;