"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Call NextAuth signIn with credentials provider
    const res = await signIn("credentials", {
      redirect: false, // We handle redirect manually
      username: userInfo.username,
      password: userInfo.password,
    });

    if (res.error) {
      setError("Username atau password salah");
    } else {
      // Fetch the session to get user role
      const session = await getSession();
      if (!session) {
        setError("Gagal mendapatkan session");
        return;
      }

      const role = session.user.role; // Pastikan role ada di session.user

      // Redirect sesuai role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "guru") {
        router.push("/guru/dashboard");
      } else if (role === "siswa") {
        router.push("/siswa/dashboard");
      } else {
        setError("Role tidak dikenali");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h1 className="text-2xl mb-6 font-bold">Login</h1>
        {error && (
          <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          className="w-full mb-6 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
