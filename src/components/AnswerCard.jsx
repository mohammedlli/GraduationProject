import { Link } from "react-router-dom";
import { FiFileText, FiPlayCircle } from "react-icons/fi";
import AnswerAi from "./AnswerAi";
import { getUserById } from "../service/user";
import { useQuery } from "@tanstack/react-query";

function AnswerCard({ item }) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", item?.id],
    queryFn: () => getUserById(item?.id),
  });
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
      {/* Accent */}
      <span className="absolute right-0 top-0 h-full w-1.5 bg-[#4B96FF]" />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        {/* Content */}
        <div className="flex-1 pr-3">
          {/* Label */}
          <div className="mb-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-xl bg-[#4B96FF]/10 px-3 py-1 text-sm font-medium text-[#4B96FF]">
              <FiFileText size={16} />
              إجابة الطالب
            </div>

            {/* Answer text */}
            <h3 className="break-words text-lg font-semibold leading-8 text-gray-800">
              {user?.name}
            </h3>
          </div>

          {/* AI Result */}
          <AnswerAi id={item.id} />
        </div>

        {/* Action */}
        <div className="flex lg:min-w-[140px] lg:justify-end">
          <Link
            to={`/student-code/${item?.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4B96FF] px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
          >
            <FiPlayCircle size={18} />
            تشغيل الكود
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
