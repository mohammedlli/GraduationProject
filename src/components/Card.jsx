import { Link } from "react-router";

export default function Card({ title, id }) {
  return (
    <div className="flex justify-center">
      <div
        className="
          w-80 h-64
          bg-white
          rounded-xl
          shadow-md
          hover:shadow-lg
          transition-all duration-300
          flex flex-col
          justify-between
          p-6
          relative
        "
      >
        {/* خط جانبي رسمي */}
        <span className="absolute top-0 right-0 h-full w-2 bg-gradient-to-b from-blue-400 to-indigo-500  rounded-tr-xl rounded-br-xl"></span>

        {/* المحتوى */}
        <div className="flex flex-col justify-center items-start flex-1">
          <h3 className=" text-2xl font-bold mb-3">{title}</h3>

          <p className="text-[#374151] text-sm leading-relaxed">
            إدارة ومتابعة المهام الخاصة بالمادة الدراسية بطريقة منظمة وسهلة
          </p>
        </div>

        {/* زر الدخول */}
        <Link to={`/stages/${id}`} className="w-full">
          <button
            className="
              w-full
              py-2.5
              rounded-lg
              bg-[#006aff]
              text-white
              font-semibold
              hover:bg-[#0069fb]
              transition
            "
          >
            الدخول
          </button>
        </Link>
      </div>
    </div>
  );
}
