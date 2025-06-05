"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear error

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        setError("Gagal memproses response dari server.");
        return;
      }

      if (!res.ok) {
        setError(data.error || "Login gagal");
        return;
      }

      // Simpan role dan username di localStorage
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("username", data.username);

      // Redirect langsung ke dashboard sesuai role
      if (data.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.role === "guru") {
        router.push("/guru/dashboard");
      } else if (data.role === "siswa") {
        router.push("/siswa/dashboard");
      } else {
        setError("Role tidak dikenali. Hubungi administrator.");
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server.");
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Login</h1>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={userInfo.username}
          onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Masuk
        </button>
      </form>
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
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "24px",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.5rem",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
    textAlign: "center",
  },
};
