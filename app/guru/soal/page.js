"use client";

import { useEffect, useState } from "react";

export default function AdminJadwalUjian() {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newJadwal, setNewJadwal] = useState({
    mapel: "",
    tanggal: "",
    jam: "",
  });
  const [editId, setEditId] = useState(null);
  const [editJadwal, setEditJadwal] = useState({
    mapel: "",
    tanggal: "",
    jam: "",
  });

  useEffect(() => {
    fetchJadwal();
    const interval = setInterval(fetchJadwal, 5000); // polling tiap 5 detik untuk update ke siswa
    return () => clearInterval(interval);
  }, []);

  const fetchJadwal = () => {
    fetch("/api/jadwal_ujian")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch jadwal");
        return res.json();
      })
      .then((data) => {
        setJadwal(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat jadwal ujian.");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setNewJadwal({ ...newJadwal, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditJadwal({ ...editJadwal, [e.target.name]: e.target.value });
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJadwal),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menambah jadwal ujian.");
        return;
      }
      fetchJadwal();
      setNewJadwal({ mapel: "", tanggal: "", jam: "" });
    } catch {
      setError("Terjadi kesalahan saat menambah jadwal ujian.");
    }
  };

  const handleEditJadwal = (item) => {
    setEditId(item.id);
    setEditJadwal({
      mapel: item.mapel,
      tanggal: item.tanggal,
      jam: item.jam,
    });
  };

  const handleUpdateJadwal = async (id) => {
    setError("");
    try {
      const res = await fetch(`/api/jadwal_ujian/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editJadwal),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal mengupdate jadwal.");
        return;
      }
      fetchJadwal();
      setEditId(null);
    } catch {
      setError("Terjadi kesalahan saat update.");
    }
  };

  const handleDeleteJadwal = async (id) => {
    setError("");
    try {
      const res = await fetch(`/api/jadwal_ujian/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setError("Gagal menghapus jadwal.");
        return;
      }
      fetchJadwal();
    } catch {
      setError("Terjadi kesalahan saat menghapus.");
    }
  };

  return (
    <>
      <style>{`
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
          padding: 0.7rem 1.8rem;
          background-color: #00796b;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
          min-width: 120px;
        }
        button:hover {
          background-color: #004d40;
        }
        .table-btn {
          background-color: #004d40;
          margin: 0 auto 1rem;
          display: block;
          min-width: 140px;
        }
        .table-btn:hover {
          background-color: #00251a;
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
        .action-btn {
          margin: 0 5px;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          background-color: #00796b;
          color: white;
          border: none;
        }
        .action-btn:hover {
          background-color: #004d40;
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
          .table-btn {
            min-width: unset;
            width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <button
          className="table-btn"
          onClick={() => (window.location.href = "/guru/dashboard")}
          aria-label="Kembali ke dashboard admin"
        >
          &larr; Kembali ke Dashboard
        </button>

        <h1>Kelola Jadwal Ujian</h1>
        {error && <div className="error">{error}</div>}

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
                    {editId === item.id ? (
                      <input
                        type="text"
                        name="mapel"
                        value={editJadwal.mapel}
                        onChange={handleEditChange}
                      />
                    ) : (
                      item.mapel
                    )}
                  </td>
                  <td>
                    {editId === item.id ? (
                      <input
                        type="date"
                        name="tanggal"
                        value={editJadwal.tanggal}
                        onChange={handleEditChange}
                      />
                    ) : (
                      item.tanggal
                    )}
                  </td>
                  <td>
                    {editId === item.id ? (
                      <input
                        type="time"
                        name="jam"
                        value={editJadwal.jam}
                        onChange={handleEditChange}
                      />
                    ) : (
                      item.jam
                    )}
                  </td>
                  <td>
                    {editId === item.id ? (
                      <>
                        <button
                          className="action-btn"
                          onClick={() => handleUpdateJadwal(item.id)}
                        >
                          Simpan
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => setEditId(null)}
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="action-btn"
                          onClick={() => handleEditJadwal(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => handleDeleteJadwal(item.id)}
                        >
                          Hapus
                        </button>
                      </>
                    )}
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
