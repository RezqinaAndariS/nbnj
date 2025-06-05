"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const soalPilihanGanda = [
  {
    id: 1,
    soal: "Berapakah hasil dari 5 + 7?",
    gambar: null,
    options: [
      { id: "a", text: "10" },
      { id: "b", text: "12" },
      { id: "c", text: "11" },
      { id: "d", text: "13" },
    ],
    jawaban: "b",
  },
  {
    id: 2,
    soal: "Berapa hasil dari luas persegi ini?",
    gambar:
      "https://i.ibb.co/WxvQkgV/persegi-5x5.png", // contoh gambar persegi 5x5
    options: [
      { id: "a", text: "10" },
      { id: "b", text: "20" },
      { id: "c", text: "25" },
      { id: "d", text: "30" },
    ],
    jawaban: "c",
  },
  {
    id: 3,
    soal: "Berapakah hasil dari 15 ÷ 3?",
    gambar: null,
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "6" },
      { id: "c", text: "3" },
      { id: "d", text: "8" },
    ],
    jawaban: "a",
  },
  {
    id: 4,
    soal: "Hitung hasil dari panjang segitiga ini.",
    gambar:
      "https://i.ibb.co/NWgL18M/segitiga-3-4-5.png", // gambar segitiga siku-siku 3-4-5
    options: [
      { id: "a", text: "6" },
      { id: "b", text: "5" },
      { id: "c", text: "7" },
      { id: "d", text: "8" },
    ],
    jawaban: "b",
  },
  {
    id: 5,
    soal: "Berapakah keliling persegi panjang berikut?",
    gambar:
      "https://i.ibb.co/hcRmpXp/persegi-panjang-6x3.png", // contoh persegi panjang 6x3
    options: [
      { id: "a", text: "18" },
      { id: "b", text: "20" },
      { id: "c", text: "16" },
      { id: "d", text: "15" },
    ],
    jawaban: "b",
  },
  {
    id: 6,
    soal: "Jika 3x + 4 = 19, berapakah nilai x?",
    gambar: null,
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "6" },
      { id: "c", text: "7" },
      { id: "d", text: "8" },
    ],
    jawaban: "a",
  },
  {
    id: 7,
    soal: "Berapakah hasil dari 9 x 9?",
    gambar: null,
    options: [
      { id: "a", text: "72" },
      { id: "b", text: "81" },
      { id: "c", text: "79" },
      { id: "d", text: "90" },
    ],
    jawaban: "b",
  },
  {
    id: 8,
    soal: "Berapakah hasil dari 100 - 45?",
    gambar: null,
    options: [
      { id: "a", text: "65" },
      { id: "b", text: "55" },
      { id: "c", text: "60" },
      { id: "d", text: "50" },
    ],
    jawaban: "a",
  },
  {
    id: 9,
    soal: "Hitung hasil dari 4² + 3²",
    gambar: null,
    options: [
      { id: "a", text: "16" },
      { id: "b", text: "25" },
      { id: "c", text: "20" },
      { id: "d", text: "30" },
    ],
    jawaban: "b",
  },
  {
    id: 10,
    soal: "Berapakah hasil dari 7 x 8?",
    gambar: null,
    options: [
      { id: "a", text: "54" },
      { id: "b", text: "56" },
      { id: "c", text: "58" },
      { id: "d", text: "60" },
    ],
    jawaban: "b",
  },
];

const soalEssay = [
  {
    id: 11,
    soal: "Jelaskan bagaimana cara mencari luas lingkaran!",
    keyword: ["luas lingkaran", "rumus", "lingkaran", "pi", "matematika"],
  },
  {
    id: 12,
    soal: "Tuliskan rumus keliling segitiga dan berikan contohnya.",
    keyword: ["keliling segitiga", "rumus", "segitiga", "contoh", "matematika"],
  },
  {
    id: 13,
    soal: "Hitung hasil dari 12 + 15 - 7 dan jelaskan langkahnya.",
    keyword: ["penjumlahan", "pengurangan", "aritmatika", "langkah", "matematika"],
  },
  {
    id: 14,
    soal: "Apa perbedaan antara bilangan prima dan bilangan komposit?",
    keyword: ["bilangan prima", "bilangan komposit", "definisi", "matematika", "angka"],
  },
  {
    id: 15,
    soal: "Sebuah kotak berisi 10 bola merah dan 15 bola biru. Jika diambil 5 bola secara acak, berapa kemungkinan mendapatkan 3 bola merah?",
    keyword: ["probabilitas", "peluang", "bola merah", "kombinasi", "matematika"],
  },
];


export default function SoalMatematika() {
  const router = useRouter();

  const [jawabanPG, setJawabanPG] = useState({});
  const [jawabanEssay, setJawabanEssay] = useState({});
  const [waktu, setWaktu] = useState(30 * 60);
  const [selesai, setSelesai] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setWaktu((w) => {
        if (w <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return w - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  function formatWaktu(sec) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleJawabanPGChange(id, val) {
    setJawabanPG((j) => ({ ...j, [id]: val }));
  }

  function handleJawabanEssayChange(id, val) {
    setJawabanEssay((j) => ({ ...j, [id]: val }));
  }

  async function handleSubmit() {
    if (selesai) return;

    // Hitung benar PG, max 10
    let benarPG = 0;
    soalPilihanGanda.forEach((soal) => {
      if (jawabanPG[soal.id] === soal.jawaban) benarPG++;
    });
    // Pastikan max 10 soal PG, jika kurang dari 10, nilai tetap proporsional sesuai jumlah soal
    const totalSoalPG = soalPilihanGanda.length;
    const nilaiPG = (benarPG / totalSoalPG) * 10;

    // Hitung skor essay berdasarkan kata kunci (per soal max 1)
    let totalEssayScore = 0;
    soalEssay.forEach(({ id, keywords }) => {
      const jawab = jawabanEssay[id] || "";
      totalEssayScore += nilaiEssayJawaban(jawab, keywords);
    });

    // Hitung nilai akhir sesuai rumus:
    // (nilaiPG + totalEssayScore * 2) / 3 * 10
    const totalNilai = Math.round(((nilaiPG + totalEssayScore * 2) / 3) * 10);

    setSelesai(true);

    // Simpan hasil ke API (dummy)
    try {
      await fetch("/api/hasil_ujian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mata_pelajaran: "Matematika",
          nilai: totalNilai,
          jawabanPG,
          jawabanEssay,
          tanggal: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("Gagal kirim hasil ujian:", e);
    }

    if (typeof window !== "undefined") {
      let hasilLokal = JSON.parse(localStorage.getItem("hasil_ujian")) || [];
      hasilLokal.push({
        mata_pelajaran: "Matematika",
        nilai: totalNilai,
        tanggal: new Date().toISOString(),
      });
      localStorage.setItem("hasil_ujian", JSON.stringify(hasilLokal));
    }
  }

  function handleNextUjian() {
    router.push("/ujian/soal");
  }

  return (
    <>
      <style>{`
        .container {
          max-width: 900px;
          margin: 2rem auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 0 12px rgba(0,0,0,0.1);
        }
        h1 {
          text-align: center;
          color: #005f73;
        }
        .timer {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ee6c4d;
          text-align: center;
          margin-bottom: 1rem;
        }
        .soal {
          background: #ffffff;
          border-radius: 8px;
          padding: 1rem 1.5rem;
          margin-bottom: 1.3rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          border-left: 6px solid #0a9396;
        }
        .soal img {
          max-width: 100%;
          margin-top: 10px;
          border-radius: 6px;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
        }
        .options {
          margin-top: 0.8rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          cursor: pointer;
          padding: 5px 12px;
          border-radius: 5px;
          transition: background 0.25s;
          border: 1px solid transparent;
        }
        input[type="radio"]:checked + label {
          background: #94d2bd;
          border-color: #005f73;
          font-weight: 600;
        }
        input[type="radio"] {
          display: none;
        }
        textarea {
          width: 100%;
          min-height: 90px;
          border-radius: 6px;
          border: 1px solid #ccc;
          padding: 8px 10px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          margin-top: 8px;
        }
        button.submit-btn {
          background-color: #005f73;
          color: white;
          border: none;
          padding: 12px 25px;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          display: block;
          margin: 2rem auto 1rem;
          transition: background-color 0.3s ease;
        }
        button.submit-btn:hover:not(:disabled) {
          background-color: #0a9396;
        }
        button.submit-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .hasil {
          background: #94d2bd;
          padding: 1.5rem;
          border-radius: 10px;
          font-size: 1.2rem;
          font-weight: 700;
          text-align: center;
          margin-top: 2rem;
          color: #001219;
        }
        .statistik {
          margin-top: 1rem;
          text-align: center;
          font-size: 1rem;
          font-weight: 500;
          color: #005f73;
        }
        .next-btn {
          background-color: #ee6c4d;
          color: white;
          border: none;
          padding: 12px 25px;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          display: block;
          margin: 1rem auto 2rem;
          transition: background-color 0.3s ease;
        }
        .next-btn:hover {
          background-color: #d94f36;
        }
      `}</style>

      <div className="container">
        <h1>Ujian Matematika</h1>
        <div className="timer">Waktu tersisa: {formatWaktu(waktu)}</div>

        {!selesai ? (
          <>
            <h2>Soal Pilihan Ganda</h2>
            {soalPilihanGanda.map(({ id, soal, gambar, options }) => (
              <div className="soal" key={id}>
                <div>
                  <strong>{id}. </strong> {soal}
                </div>
                {gambar && <img src={gambar} alt={`Gambar soal ${id}`} />}
                <div className="options">
                  {options.map(({ id: oid, text }) => (
                    <React.Fragment key={oid}>
                      <input
                        type="radio"
                        id={`pg-${id}-${oid}`}
                        name={`pg-${id}`}
                        value={oid}
                        onChange={() => handleJawabanPGChange(id, oid)}
                        checked={jawabanPG[id] === oid}
                      />
                      <label htmlFor={`pg-${id}-${oid}`}>
                        {oid.toUpperCase()}. {text}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}

            <h2>Soal Essay</h2>
            {soalEssay.map(({ id, soal }) => (
              <div className="soal" key={id}>
                <div>
                  <strong>{id}. </strong> {soal}
                </div>
                <textarea
                  placeholder="Jawaban kamu..."
                  value={jawabanEssay[id] || ""}
                  onChange={(e) => handleJawabanEssayChange(id, e.target.value)}
                  required
                />
              </div>
            ))}

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={
                Object.keys(jawabanPG).length !== soalPilihanGanda.length ||
                Object.keys(jawabanEssay).length !== soalEssay.length
              }
              title="Harap jawab semua soal terlebih dahulu"
            >
              Submit Jawaban
            </button>
          </>
        ) : (
          <>
            <div className="hasil">
              Nilai kamu:{" "}
              {(() => {
                let benarPG = 0;
                soalPilihanGanda.forEach((soal) => {
                  if (jawabanPG[soal.id] === soal.jawaban) benarPG++;
                });
                const nilaiPG = (benarPG / soalPilihanGanda.length) * 10;

                let totalEssayScore = 0;
                soalEssay.forEach(({ id, keywords }) => {
                  const jawab = jawabanEssay[id] || "";
                  totalEssayScore += nilaiEssayJawaban(jawab, keywords);
                });

                const totalNilai = Math.round(
                  ((nilaiPG + totalEssayScore * 2) / 3) * 10
                );
                return totalNilai;
              })()}
            </div>

            <div
  className="statistik"
  style={{
    maxWidth: 420,
    margin: "30px auto",
    padding: 24,
    backgroundColor: "#e3f2fd",
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(33, 150, 243, 0.2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#222",
    userSelect: "none",
  }}
>
  <h3
    style={{
      marginBottom: 20,
      color: "#0d47a1",
      borderBottom: "3px solid #1976d2",
      paddingBottom: 8,
      fontWeight: "700",
      fontSize: 20,
      letterSpacing: "0.02em",
    }}
  >
    Statistik Jawaban Pilihan Ganda
  </h3>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      gap: 16,
      flexWrap: "wrap",
      marginBottom: 36,
    }}
  >
    {soalPilihanGanda.map((soal) => {
      const benar = jawabanPG[soal.id] === soal.jawaban;
      return (
        <div
          key={soal.id}
          style={{
            flex: "1 1 48%",
            backgroundColor: benar ? "#d0f0c0" : "#f9d6d5",
            border: `2px solid ${benar ? "#2e7d32" : "#d32f2f"}`,
            borderRadius: 14,
            padding: 14,
            boxShadow: benar
              ? "0 4px 10px rgba(46, 125, 50, 0.3)"
              : "0 4px 10px rgba(211, 47, 47, 0.3)",
            cursor: "default",
            display: "flex",
            alignItems: "center",
            gap: 12,
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: benar ? "#2e7d32" : "#d32f2f",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "700",
              fontSize: 18,
              userSelect: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            {benar ? "✓" : "✗"}
          </div>
          <div
            style={{
              flex: 1,
              fontSize: 15,
              color: "#222",
              fontWeight: "600",
              lineHeight: 1.3,
            }}
          >
            Soal {soal.id}
          </div>
        </div>
      );
    })}
  </div>

  <h3
    style={{
      marginBottom: 20,
      color: "#0d47a1",
      borderBottom: "3px solid #1976d2",
      paddingBottom: 8,
      fontWeight: "700",
      fontSize: 20,
      letterSpacing: "0.02em",
    }}
  >
    Statistik Jawaban Essay
  </h3>

  <ul
    style={{
      listStyle: "none",
      paddingLeft: 0,
      fontSize: 17,
      marginBottom: 0,
      maxHeight: 240,
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#1976d2 #bbdefb",
    }}
  >
    {soalEssay.map(({ id, keywords }) => {
      const jawab = jawabanEssay[id] || "";
      const score = nilaiEssayJawaban(jawab, keywords);
      let label, color;

      if (score === 1) {
        label = "Benar";
        color = "#2e7d32"; // hijau
      } else if (score === 0.5) {
        label = "Mendekati";
        color = "#ed6c02"; // oranye
      } else {
        label = "Salah";
        color = "#d32f2f"; // merah
      }

      return (
        <li
          key={id}
          style={{
            marginBottom: 10,
            padding: "10px 16px",
            borderRadius: 14,
            border: `2px solid ${color}`,
            backgroundColor: color + "22",
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
            color: "#222",
            cursor: "default",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = color + "33";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = color + "22";
          }}
        >
          <span
            style={{
              minWidth: 80,
              textAlign: "center",
              fontWeight: "700",
              color,
              userSelect: "none",
              fontSize: 15,
            }}
          >
            {label}
          </span>
          <span style={{ marginLeft: 16, fontWeight: "600" }}>Soal {id}</span>
        </li>
      );
    })}
  </ul>
</div>


            <button className="next-btn" onClick={handleNextUjian}>
              Lanjut ke Jadwal Ujian Berikutnya
            </button>
          </>
        )}
      </div>
    </>
  );
}