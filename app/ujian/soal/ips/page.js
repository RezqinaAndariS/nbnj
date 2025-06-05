"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const soalPilihanGanda = [
  {
    id: 1,
    soal: `Peta berikut menunjukkan persebaran penduduk di Indonesia. Apa yang dapat disimpulkan dari peta tersebut?`,
    gambar: "/images/peta_penduduk_indonesia.png", // path lokal public/images
    options: [
      { id: "a", text: "Penduduk tersebar merata di seluruh wilayah." },
      { id: "b", text: "Penduduk terkonsentrasi di wilayah perkotaan tertentu." },
      { id: "c", text: "Penduduk sedikit di pulau Jawa." },
      { id: "d", text: "Semua wilayah memiliki jumlah penduduk yang sama." },
    ],
    jawaban: "b",
  },
  {
    id: 2,
    soal: `Bacalah teks berikut:

    "Sumber daya alam yang melimpah di Indonesia memberikan potensi besar dalam bidang pertanian, perikanan, dan pertambangan."

    Pernyataan di atas menunjukkan bahwa Indonesia memiliki...`,
    gambar: null,
    options: [
      { id: "a", text: "Sumber daya manusia yang banyak." },
      { id: "b", text: "Sumber daya alam yang beragam." },
      { id: "c", text: "Penduduk yang sedikit." },
      { id: "d", text: "Industri teknologi tinggi." },
    ],
    jawaban: "b",
  },
  {
    id: 3,
    soal: `Perhatikan gambar berikut yang menunjukkan jenis-jenis mata pencaharian masyarakat di sebuah desa.`,
    gambar: "/images/mata_pencaharian_desa.png",
    options: [
      { id: "a", text: "Mayoritas penduduk bekerja sebagai petani." },
      { id: "b", text: "Mayoritas penduduk bekerja di sektor industri." },
      { id: "c", text: "Mayoritas penduduk bekerja sebagai guru." },
      { id: "d", text: "Mayoritas penduduk tidak bekerja." },
    ],
    jawaban: "a",
  },
  {
    id: 4,
    soal: `Apa yang dimaksud dengan globalisasi dalam konteks IPS?`,
    gambar: null,
    options: [
      { id: "a", text: "Proses interaksi dan integrasi antar negara." },
      { id: "b", text: "Pengaruh budaya lokal yang kuat." },
      { id: "c", text: "Isolasi negara dari dunia luar." },
      { id: "d", text: "Peningkatan jumlah penduduk." },
    ],
    jawaban: "a",
  },
  {
    id: 5,
    soal: `Manakah faktor yang paling mempengaruhi urbanisasi?`,
    gambar: null,
    options: [
      { id: "a", text: "Ketersediaan lapangan kerja di kota." },
      { id: "b", text: "Minat bertani di desa." },
      { id: "c", text: "Kurangnya pendidikan di kota." },
      { id: "d", text: "Kepadatan penduduk di desa." },
    ],
    jawaban: "a",
  },
  {
    id: 6,
    soal: `Perhatikan gambar berikut tentang perubahan iklim global.`,
    gambar: "/images/perubahan_iklim_global.png",
    options: [
      { id: "a", text: "Perubahan iklim tidak berpengaruh pada kehidupan manusia." },
      { id: "b", text: "Perubahan iklim berdampak pada cuaca ekstrim dan bencana alam." },
      { id: "c", text: "Perubahan iklim membuat bumi menjadi lebih dingin." },
      { id: "d", text: "Perubahan iklim hanya terjadi di daerah kutub." },
    ],
    jawaban: "b",
  },
  {
    id: 7,
    soal: `Apa fungsi utama dari lembaga pemerintahan di suatu negara?`,
    gambar: null,
    options: [
      { id: "a", text: "Mengatur dan menjalankan aturan negara." },
      { id: "b", text: "Mengatur cuaca dan iklim." },
      { id: "c", text: "Membuat peta geografi." },
      { id: "d", text: "Mengelola kegiatan olahraga." },
    ],
    jawaban: "a",
  },
  {
    id: 8,
    soal: `Salah satu dampak negatif dari industrialisasi adalah...`,
    gambar: null,
    options: [
      { id: "a", text: "Peningkatan pengangguran." },
      { id: "b", text: "Pencemaran lingkungan." },
      { id: "c", text: "Penurunan jumlah penduduk." },
      { id: "d", text: "Meningkatnya produksi pangan." },
    ],
    jawaban: "b",
  },
  {
    id: 9,
    soal: `Manakah pernyataan yang benar tentang demokrasi?`,
    gambar: null,
    options: [
      { id: "a", text: "Semua kekuasaan dipegang oleh satu orang." },
      { id: "b", text: "Kekuasaan berasal dari rakyat dan untuk rakyat." },
      { id: "c", text: "Rakyat tidak memiliki hak dalam pengambilan keputusan." },
      { id: "d", text: "Demokrasi menolak hak asasi manusia." },
    ],
    jawaban: "b",
  },
  {
    id: 10,
    soal: `Manakah contoh kegiatan yang termasuk dalam sektor jasa?`,
    gambar: null,
    options: [
      { id: "a", text: "Bertani padi." },
      { id: "b", text: "Menjalankan toko kelontong." },
      { id: "c", text: "Mengajar di sekolah." },
      { id: "d", text: "Menambang batu bara." },
    ],
    jawaban: "c",
  },
];

const soalEssay = [
  {
    id: 11,
    soal:
      "Jelaskan dampak positif dan negatif globalisasi terhadap kehidupan sosial masyarakat Indonesia.",
    keywords: ["globalisasi", "dampak positif", "dampak negatif", "sosial", "Indonesia"],
    gambar: null,
  },
  {
    id: 12,
    soal:
      "Analisislah penyebab urbanisasi dan bagaimana dampaknya terhadap kota-kota besar di Indonesia.",
    keywords: ["urbanisasi", "penyebab", "dampak", "kota besar", "Indonesia"],
    gambar: null,
  },
  {
    id: 13,
    soal:
      "Jelaskan peran sumber daya alam dalam perekonomian Indonesia dan berikan contoh konkret.",
    keywords: ["sumber daya alam", "peran", "perekonomian", "Indonesia", "contoh"],
    gambar: "/images/sumber_daya_ekonomi.png",
  },
  {
    id: 14,
    soal:
      "Bagaimana perubahan iklim mempengaruhi kehidupan manusia dan lingkungan? Jelaskan dengan contoh.",
    keywords: ["perubahan iklim", "pengaruh", "manusia", "lingkungan", "contoh"],
    gambar: "/images/iklim_lingkungan.png",
  },
  {
    id: 15,
    soal:
      "Diskusikan fungsi lembaga pemerintahan dalam menjaga stabilitas politik dan sosial suatu negara.",
    keywords: ["lembaga pemerintahan", "fungsi", "stabilitas politik", "sosial", "negara"],
    gambar: null,
  },
];

// fungsi sederhana menilai essay berdasarkan kata kunci
function nilaiEssayJawaban(jawaban, keywords) {
  if (!jawaban) return 0;

  const jawabanLower = jawaban.toLowerCase();
  let score = 0;

  // hitung berapa kata kunci muncul
  let foundCount = 0;
  keywords.forEach((kw) => {
    if (jawabanLower.includes(kw.toLowerCase())) foundCount++;
  });

  // jika semua kata kunci ada -> 1
  if (foundCount === keywords.length) score = 1;
  // jika setengah atau lebih kata kunci ada -> 0.5
  else if (foundCount >= keywords.length / 2) score = 0.5;
  else score = 0;

  return score;
}

export default function SoalIPS() {
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
          mata_pelajaran: "Bahasa IPS",
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
        mata_pelajaran: "Bahasa IPS",
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
        <h1>Ujian IPS</h1>
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