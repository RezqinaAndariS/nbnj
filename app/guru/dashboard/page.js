"use client";

import { useRouter } from "next/navigation";

export default function GuruDashboard() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <style jsx>{`
        .container {
          max-width: 720px;
          margin: 2rem auto;
          padding: 2rem;
          background: #e0f7fa;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h1 {
          color: #006064;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          margin-bottom: 1rem;
        }
        button {
          display: block;
          width: 100%;
          padding: 0.8rem 1rem;
          background-color: #00796b;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        button:hover {
          background-color: #004d40;
          transform: translateY(-2px);
        }
        @media (max-width: 600px) {
          .container {
            padding: 1rem;
          }
          button {
            font-size: 0.9rem;
            padding: 0.7rem 0.9rem;
          }
        }
      `}</style>

      <div className="container">
        <h1>Dashboard Guru</h1>
        <ul>
          <li>
            <button onClick={() => handleNavigation("/guru/soal")}>
              Buat/Edit Soal
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("/app/guru/jadwal_ujian")}>
              Buat/Edit Ujian
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("/app/koreksi_esai")}>
              Koreksi Soal Esai
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("/app/laporan_siswa")}>
              Lihat Laporan Siswa
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
