import { useQuery } from "@tanstack/react-query";
import { FiCheckCircle, FiAlertCircle, FiBarChart2 } from "react-icons/fi";
import { getAnswerAiById } from "../service/Answers";

function AnswerAi({ id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["answers-ai", id],
    queryFn: () => getAnswerAiById(id),
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-md">
        <p className="text-gray-500">Loading AI analysis...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 rounded-2xl shadow-md text-red-500">
        Failed to load AI result
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#4B96FF]/10 text-[#4B96FF] p-2 rounded-xl">
          <FiBarChart2 size={20} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">
          AI Evaluation Result
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Score</p>
          <p className="text-xl font-bold text-gray-800">{data?.score}%</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Accuracy</p>
          <p className="text-xl font-bold text-gray-800">{data?.accuracy}%</p>
        </div>
      </div>

      {/* Status */}
      <div
        className={`flex items-center gap-2 p-3 rounded-xl ${
          data?.isCorrect
            ? "bg-green-50 text-green-600"
            : "bg-red-50 text-red-500"
        }`}
      >
        {data?.isCorrect ? <FiCheckCircle /> : <FiAlertCircle />}
        <span className="font-medium">
          {data?.isCorrect ? "Correct Answer" : "Needs Improvement"}
        </span>
      </div>

      {/* Suggestion */}
      <div className="bg-blue-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500 mb-1">Suggestion</p>
        <p className="text-gray-800 font-medium">
          {data?.suggestion || "No suggestion provided"}
        </p>
      </div>

      {/* Errors */}
      {data?.errors?.length > 0 && (
        <div className="bg-red-50 p-4 rounded-xl">
          <p className="text-sm text-red-400 mb-2">Errors</p>
          <ul className="list-disc list-inside text-red-500 text-sm space-y-1">
            {data.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AnswerAi;
