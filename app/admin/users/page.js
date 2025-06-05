"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "SISWA",
    password: "",
  });
  const [error, setError] = useState("");

  // Fetch Users
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data pengguna.");
        setLoading(false);
      });
  }, []);

  // Handle Add User
  const handleAddUser = async () => {
    setError("");
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menambah pengguna.");
        return;
      }

      const data = await res.json();
      setUsers([...users, data]);
      setNewUser({ name: "", email: "", role: "SISWA", password: "" });
    } catch (err) {
      setError("Terjadi kesalahan saat menambah pengguna.");
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (id) => {
    setError("");
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menghapus pengguna.");
        return;
      }
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus pengguna.");
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="p-6">Memuat data pengguna...</p>;

  return (
    <>
      <style>{`
        /* Reset dan layout */
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f0f9ff;
          margin: 0; padding: 0;
        }
        .container {
          max-width: 960px;
          margin: 2rem auto;
          padding: 1.5rem;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
        }

        h1, h2 {
          color: #0369a1;
          margin-bottom: 1rem;
        }

        /* Error box */
        .error-box {
          background-color: #fee2e2;
          color: #b91c1c;
          border: 1.5px solid #fca5a5;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        /* Form inputs */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
          margin-bottom: 1.5rem;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"],
        select {
          padding: 10px 14px;
          border-radius: 8px;
          border: 2px solid #7dd3fc;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus,
        select:focus {
          outline: none;
          border-color: #0284c7;
          background-color: #e0f2fe;
        }

        button {
          background-color: #0284c7;
          color: white;
          font-weight: 600;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          max-width: 150px;
        }
        button:hover {
          background-color: #0369a1;
        }

        /* Tombol Kembali */
        .btn-back {
          background-color: #2563eb;
          color: white;
          font-weight: 600;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 1.5rem;
          transition: background-color 0.3s ease;
          max-width: 180px;
        }
        .btn-back:hover {
          background-color: #1e40af;
        }

        /* Table */
        table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 8px rgb(0 0 0 / 0.1);
          background-color: #ffffff;
        }
        thead {
          background: linear-gradient(90deg, #38bdf8, #0ea5e9);
          color: white;
        }
        th, td {
          padding: 12px 18px;
          text-align: left;
          border-bottom: 1px solid #dbeafe;
          font-size: 0.95rem;
        }
        tbody tr:hover {
          background-color: #bae6fd;
          cursor: pointer;
        }
        tbody tr td:nth-child(1),
        tbody tr td:nth-child(4),
        tbody tr td:nth-child(5) {
          text-align: center;
        }

        /* Delete button in table */
        .btn-delete {
          background-color: #ef4444;
          padding: 8px 14px;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn-delete:hover {
          background-color: #b91c1c;
        }

        @media (max-width: 600px) {
          .form-group {
            max-width: 100%;
          }
          table, thead, tbody, th, td, tr {
            display: block;
          }
          thead tr {
            display: none;
          }
          tbody tr {
            margin-bottom: 1rem;
            background: #e0f2fe;
            border-radius: 12px;
            padding: 12px;
          }
          tbody tr td {
            padding-left: 50%;
            position: relative;
            text-align: left;
            border: none;
          }
          tbody tr td::before {
            position: absolute;
            left: 18px;
            top: 12px;
            font-weight: 600;
            white-space: nowrap;
            color: #0369a1;
          }
          tbody tr td:nth-child(1)::before { content: "ID"; }
          tbody tr td:nth-child(2)::before { content: "Nama"; }
          tbody tr td:nth-child(3)::before { content: "Email"; }
          tbody tr td:nth-child(4)::before { content: "Role"; }
          tbody tr td:nth-child(5)::before { content: "Aksi"; }
          .btn-delete {
            padding: 8px 12px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="container">
        {/* Tombol Kembali */}
        <button className="btn-back" onClick={() => router.push("/admin/dashboard")}>
          ← Kembali ke Dashboard Admin
        </button>

        <h1>Manajemen Pengguna</h1>

        {error && <div className="error-box">{error}</div>}

        <div className="form-group">
          <input
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Nama"
            type="text"
          />
          <input
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
          <select name="role" value={newUser.role} onChange={handleChange}>
            <option value="ADMIN">Admin</option>
            <option value="GURU">Guru</option>
            <option value="SISWA">Siswa</option>
          </select>
          <input
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />
          <button onClick={handleAddUser}>Tambah</button>
        </div>

        {loading ? (
          <p>Memuat data pengguna...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn-delete"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
