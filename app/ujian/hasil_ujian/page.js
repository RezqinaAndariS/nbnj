"use client";

import React, { useEffect, useState } from "react";

export default function HasilUjianPage() {
  const [statistik, setStatistik] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch statistik ringkas
        const resStat = await fetch("/api/hasil_ujian");
        const dataStat = await resStat.json();
        setStatistik(dataStat);

        // Fetch riwayat lengkap
        const resRiwayat = await fetch("/api/riwayat_ujian");
        const dataRiwayat = await resRiwayat.json();
        setRiwayat(dataRiwayat.ujian || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function getBarWidth(nilai) {
    // Pastikan nilai maksimal 100 untuk bar
    return `${Math.min(nilai, 100)}%`;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <style>{`
        .hasil-ujian-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background: linear-gradient(135deg, #67e8f9 0%, #3b82f6 100%);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          color: white;
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }
        .hasil-ujian-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .bar-chart {
          margin-top: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          text-align: left;
        }
        .bar-row {
          margin-bottom: 1rem;
          text-align: left;
        }
        .bar-label {
          font-weight: 600;
          margin-bottom: 0.25rem;
          display: block;
        }
        .bar {
          height: 24px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.3);
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: #ffffff;
          color: #3b82f6;
          text-align: right;
          padding-right: 8px;
          font-weight: 600;
          line-height: 24px;
          white-space: nowrap;
          transition: width 0.5s ease;
        }
        .riwayat-container {
          margin-top: 3rem;
          background: white;
          color: black;
          border-radius: 12px;
          padding: 1rem 2rem;
          max-height: 400px;
          overflow-y: auto;
          text-align: left;
          font-family: Arial, sans-serif;
        }
        .ujian-item {
          border-bottom: 1px solid #ddd;
          padding: 12px 0;
        }
        .ujian-item:last-child {
          border-bottom: none;
        }
        .ujian-header {
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 4px;
        }
        .ujian-subheader {
          font-size: 0.9rem;
          margin-bottom: 8px;
          color: #555;
        }
        .jawaban-section {
          margin-left: 1rem;
          margin-bottom: 8px;
        }
        .jawaban-pg,
        .jawaban-essay {
          margin-bottom: 8px;
        }
        .jawaban-pg span,
        .jawaban-essay span {
          display: inline-block;
          background: #3b82f6;
          color: white;
          border-radius: 4px;
          padding: 2px 6px;
          margin: 2px 4px 2px 0;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="hasil-ujian-container">
        <h1 className="hasil-ujian-title">Statistik Hasil Ujian</h1>
        {statistik && statistik.peserta > 0 ? (
          <>
            <p>Total Peserta: {statistik.peserta}</p>
            <div className="bar-chart">
              <div className="bar-row">
                <span className="bar-label">Rata-rata Nilai</span>
                <div className="bar">
                  <div
                    className="bar-fill"
                    style={{ width: getBarWidth(statistik.rata_rata) }}
                  >
                    {statistik.rata_rata}
                  </div>
                </div>
              </div>
              <div className="bar-row">
                <span className="bar-label">Nilai Tertinggi</span>
                <div className="bar">
                  <div
                    className="bar-fill"
                    style={{ width: getBarWidth(statistik.nilai_tertinggi) }}
                  >
                    {statistik.nilai_tertinggi}
                  </div>
                </div>
              </div>
              <div className="bar-row">
                <span className="bar-label">Nilai Terendah</span>
                <div className="bar">
                  <div
                    className="bar-fill"
                    style={{ width: getBarWidth(statistik.nilai_terendah) }}
                  >
                    {statistik.nilai_terendah}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Belum ada data ujian yang tersedia.</p>
        )}

        <div className="riwayat-container">
          <h2>Riwayat Hasil Ujian</h2>
          {riwayat.length > 0 ? (
            riwayat.map((item, idx) => (
              <div key={idx} className="ujian-item">
                <div className="ujian-header">{item.mata_pelajaran}</div>
                <div className="ujian-subheader">
                  Nilai: {item.nilai} | Tanggal:{" "}
                  {new Date(item.tanggal).toLocaleString()}
                </div>
                <div className="jawaban-section">
                  <div className="jawaban-pg">
                    <strong>Jawaban Pilihan Ganda:</strong>{" "}
                    {Object.entries(item.jawabanPG || {}).map(([k, v]) => (
                      <span key={k}>{k}:{v}</span>
                    ))}
                  </div>
                  <div className="jawaban-essay">
                    <strong>Jawaban Essay:</strong>{" "}
                    {Object.entries(item.jawabanEssay || {}).map(([k, v]) => (
                      <span key={k}>{k}: {v}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Belum ada riwayat ujian yang tersimpan.</p>
          )}
        </div>
      </div>
    </>
  );
}
