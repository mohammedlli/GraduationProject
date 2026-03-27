import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiLayers, FiAlertCircle, FiInbox, FiGrid } from "react-icons/fi";
import { getAllStages } from "../../service/stages";
import Card from "../../components/Card";

export default function HomeCard() {
  const location = useLocation();
  const role = location.state?.role;

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["all-stages"],
    queryFn: getAllStages,
  });

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[32px] bg-white shadow-xl ring-1 ring-gray-100">
          <div className="absolute inset-0 bg-gradient-to-l from-[#4B96FF]/10 via-transparent to-transparent" />
          <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-[#4B96FF]/10 blur-3xl" />
          <div className="absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-[#4B96FF]/10 px-4 py-2 text-sm font-semibold text-[#4B96FF]">
                <FiGrid size={16} />
                لوحة المراحل الدراسية
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
                اختر المرحلة المناسبة
                <span className="block text-[#4B96FF]">
                  وابدأ رحلتك الدراسية
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
                تصفح المراحل الدراسية المتاحة بسهولة، وانتقل إلى المحتوى والمهام
                المرتبطة بكل مرحلة ضمن واجهة واضحة وعصرية.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="rounded-[28px] bg-gradient-to-br from-[#4B96FF] to-blue-600 p-6 text-white shadow-lg">
                <FiLayers size={42} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats / top strip */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
            <p className="text-sm text-gray-400">إجمالي المراحل</p>
            <p className="mt-2 text-2xl font-extrabold text-gray-800">
              {isLoading ? "..." : data.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
            <p className="text-sm text-gray-400">حالة البيانات</p>
            <p className="mt-2 text-lg font-bold text-[#4B96FF]">
              {isLoading ? "جارِ التحميل" : isError ? "حدث خطأ" : "جاهزة"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
            <p className="text-sm text-gray-400">نوع العرض</p>
            <p className="mt-2 text-lg font-bold text-gray-800">بطاقات تفاعلية</p>
          </div>
        </div>

        {/* Section title */}
        <div className="mt-10 mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">المراحل المتاحة</h2>
            <p className="mt-1 text-sm text-gray-500">
              اختر بطاقة للانتقال إلى تفاصيل المرحلة
            </p>
          </div>
        </div>

        {/* Content */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-100"
              >
                <div className="mb-4 h-3 w-24 animate-pulse rounded bg-gray-200" />
                <div className="mb-3 h-8 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="mb-2 h-3 w-full animate-pulse rounded bg-gray-100" />
                <div className="mb-6 h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center rounded-[28px] bg-white px-6 py-16 text-center shadow-md ring-1 ring-gray-100">
            <div className="mb-4 rounded-full bg-red-50 p-4 text-red-500">
              <FiAlertCircle size={30} />
            </div>
            <h3 className="text-lg font-bold text-red-500">
              حدث خطأ أثناء تحميل المراحل
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              يرجى إعادة المحاولة لاحقاً
            </p>
          </div>
        )}

        {!isLoading && !isError && data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="transition duration-300 hover:-translate-y-1"
              >
                <Card id={item.id} title={item.name} role={role} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && !isError && data.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-[28px] bg-white px-6 py-16 text-center shadow-md ring-1 ring-gray-100">
            <div className="mb-4 rounded-full bg-gray-100 p-4 text-gray-400">
              <FiInbox size={30} />
            </div>
            <h3 className="text-xl font-bold text-gray-700">لا توجد مراحل حالياً</h3>
            <p className="mt-2 text-sm text-gray-500">
              سيتم عرض المراحل هنا عند إضافتها
            </p>
          </div>
        )}
      </div>
    </div>
  );
}