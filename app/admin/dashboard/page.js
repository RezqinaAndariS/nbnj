"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Admin</h1>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link href="/admin/users" style={styles.link}>
            Kelola Pengguna
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link href="/admin/soal" style={styles.link}>
            Kelola Soal
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link href="/admin/ujian" style={styles.link}>
            Kelola Ujian
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link href="/admin/laporan" style={styles.link}>
            Lihat Laporan
          </Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#2563eb",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "12px",
  },
  link: {
    display: "block",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#1d4ed8",
  },
};
