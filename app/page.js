"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (!role) {
      router.push("/login");
    } else {
      if (role === "admin") router.push("/admin/dashboard");
      else if (role === "guru") router.push("/guru/dashboard");
      else if (role === "siswa") router.push("/siswa/dashboard");
      else router.push("/login");
    }
  }, [router]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Loading dashboard...</h1>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  title: {
    color: "#333",
    fontSize: "24px",
  },
};
