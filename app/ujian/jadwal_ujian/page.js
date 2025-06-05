"use client";

import { useEffect, useState } from "react";

export default function JadwalUjian({ role }) {
  // role = "admin", "guru", atau "siswa"
  // Untuk demo, bisa test dengan role="siswa" atau "admin"

  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJadwal, setNewJadwal] = useState({
    mapel: "",
    tanggal: "",
    jam: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/jadwal_ujian")
      .then((res) => res.json())
      .then((data) => {
        setJadwal(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat jadwal ujian.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setNewJadwal({ ...newJadwal, [e.target.name]: e.target.value });
  };

  const handleAddJadwal = async () => {
    setError("");
    if (!newJadwal.mapel || !newJadwal.tanggal || !newJadwal.jam) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      const res = await fetch("/api/jadwal_ujian", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-role": role,  // Kirim role ke backend
        },
        body: JSON.stringify(newJadwal),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menambah jadwal ujian.");
        return;
      }

      const data = await res.json();
      setJadwal([...jadwal, data]);
      setNewJadwal({ mapel: "", tanggal: "", jam: "" });
    } catch {
      setError("Terjadi kesalahan saat menambah jadwal ujian.");
    }
  };

  return (
    <>
      <style>{`
        /* CSS sama seperti sebelumnya */
        .container {
          max-width: 720px;
          margin: 2rem auto;
          padding: 2rem;
          background: #e0f7fa;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h1 {
          color: #006064;
          margin-bottom: 1rem;
          text-align: center;
        }

        .error {
          background: #ffebee;
          color: #b71c1c;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 1rem;
          text-align: center;
        }

        form {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        input, select {
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 2px solid #4dd0e1;
          font-size: 1rem;
          min-width: 180px;
          transition: border-color 0.3s ease;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #0097a7;
          background-color: #b2ebf2;
        }

        button {
          padding: 0.7rem 1.8rem;
          background-color: #00796b;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
          min-width: 120px;
          align-self: center;
        }
        button:hover {
          background-color: #004d40;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          background-color: white;
        }

        th, td {
          padding: 12px 18px;
          text-align: center;
          border-bottom: 1px solid #e0f2f1;
          font-weight: 600;
          color: #004d40;
        }

        th {
          background-color: #4db6ac;
          color: white;
        }

        @media (max-width: 600px) {
          form {
            flex-direction: column;
            align-items: stretch;
          }
          input, select, button {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>

      <div className="container">
        <h1>Jadwal Ujian</h1>

        {error && <div className="error">{error}</div>}

        {/* Tampilkan form tambah jadwal hanya jika role admin/guru */}
        {(role === "admin" || role === "guru") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddJadwal();
            }}
            aria-label="Form tambah jadwal ujian"
          >
            <input
              type="text"
              name="mapel"
              placeholder="Mata Pelajaran"
              value={newJadwal.mapel}
              onChange={handleChange}
              maxLength={30}
            />
            <input
              type="date"
              name="tanggal"
              value={newJadwal.tanggal}
              onChange={handleChange}
            />
            <input
              type="time"
              name="jam"
              value={newJadwal.jam}
              onChange={handleChange}
            />
            <button type="submit">Tambah Jadwal</button>
          </form>
        )}

        {loading ? (
          <p style={{ textAlign: "center" }}>Memuat jadwal...</p>
        ) : (
          <table aria-label="Daftar jadwal ujian">
            <thead>
              <tr>
                <th>No</th>
                <th>Mata Pelajaran</th>
                <th>Tanggal</th>
                <th>Jam Mulai</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.mapel}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.jam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
