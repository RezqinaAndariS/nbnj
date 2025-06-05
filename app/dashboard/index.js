import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Simulasi ambil role dari session/localstorage
    const role = localStorage.getItem("role"); // 'admin' | 'guru' | 'siswa'
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "guru") {
      router.push("/guru/dashboard");
    } else if (role === "siswa") {
      router.push("/siswa/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <p>Loading Dashboard...</p>;
}
