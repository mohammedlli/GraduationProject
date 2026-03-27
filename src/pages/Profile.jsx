// Profile.jsx
import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};

export default function Profile() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile-user"],
    queryFn: fetchUser,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error loading profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-[#4B96FF]" />

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-12 w-24 h-24 rounded-full bg-[#4B96FF] text-white flex items-center justify-center text-3xl font-bold border-4 border-white">
            {data.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-slate-800">{data.name}</h2>
            <p className="text-sm text-slate-500">{data.email}</p>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-3">
            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-xs text-slate-400">Username</p>
              <p className="font-medium">{data.username}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-xs text-slate-400">Phone</p>
              <p className="font-medium">{data.phone}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-xs text-slate-400">Website</p>
              <p className="font-medium">{data.website}</p>
            </div>
          </div>

          {/* Button */}
          <button className="mt-6 w-full bg-[#4B96FF] text-white py-3 rounded-xl font-semibold hover:opacity-90">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
