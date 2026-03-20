import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../service/login";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "mohammed33@gmail.com",
    password: "12345678",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      console.log("Success:", res.data);
      
    },
    onError: (err) => {
      console.log("Error:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // 🔥 important
    mutate(form);
  };

  return (
    <div className="mt-20">
      <div className="mx-auto w-full max-w-md rounded-xl bg-[#EFEBE9] px-6 py-10 shadow-lg border border-[#D7CCC8]">
        <h1 className="text-center text-2xl font-bold text-[#775b51]">
          Sign in to your account
        </h1>

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#775b51]">
              Email address
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-[#D7CCC8]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#775b51]">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-[#D7CCC8]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-[#A1887F] py-2 font-semibold hover:bg-[#8D6E63]"
          >
            {isPending ? "Loading..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}