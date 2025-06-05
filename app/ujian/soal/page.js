"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function JadwalUjian({ role }) {
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
          "x-user-role": role,
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

  const getMapelClass = (mapel) => {
    switch (mapel.toLowerCase()) {
      case "matematika":
        return "mapel-mtk";
      case "bahasa indonesia":
        return "mapel-bindo";
      case "ipa":
        return "mapel-ipa";
      case "ips":
        return "mapel-ips";
      case "bahasa inggris":
        return "mapel-bing";
      default:
        return "mapel-default";
    }
  };

  // Cek apakah jadwal bisa dikerjakan sekarang
  const isUjianBisaDikerjakan = (tanggal, jam) => {
    const now = new Date();
    const ujianDateTime = new Date(`${tanggal}T${jam}`);
    return now >= ujianDateTime;
  };

  return (
    <>
      <style>{`
        /* CSS sama seperti sebelumnya + tambahan sedikit */
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

        input {
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 2px solid #4dd0e1;
          font-size: 1rem;
          min-width: 180px;
          transition: border-color 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #0097a7;
          background-color: #b2ebf2;
        }

        button {
          padding: 0.5rem 1rem;
          background-color: #00796b;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        button:disabled {
          background-color: #bdbdbd;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
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
          padding: 12px 10px;
          text-align: center;
          border-bottom: 1px solid #e0f2f1;
          font-weight: 600;
          color: #004d40;
        }

        th {
          background-color: #4db6ac;
          color: white;
        }

        .mapel-mtk { color: #d32f2f; font-weight: bold; }
        .mapel-bindo { color: #1976d2; font-weight: bold; }
        .mapel-ipa { color: #388e3c; font-weight: bold; }
        .mapel-ips { color: #f57c00; font-weight: bold; }
        .mapel-bing { color: #7b1fa2; font-weight: bold; }
        .mapel-default { color: #455a64; font-weight: bold; }

        a {
          text-decoration: none;
        }

        @media (max-width: 600px) {
          form {
            flex-direction: column;
            align-items: stretch;
          }
          input, button {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>

      <div className="container">
        <h1>Jadwal Ujian</h1>

        {error && <div className="error">{error}</div>}

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
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <span className={getMapelClass(item.mapel)}>
                      {item.mapel}
                    </span>
                  </td>
                  <td>{item.tanggal}</td>
                  <td>{item.jam}</td>
                  <td>
                    <Link
                      href={`/ujian/soal/${encodeURIComponent(
                        item.mapel.toLowerCase()
                      )}`}
                      passHref
                    >
                      <button disabled={!isUjianBisaDikerjakan(item.tanggal, item.jam)}>
                        Mulai Kerjakan
                      </button>
                    </Link>
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
