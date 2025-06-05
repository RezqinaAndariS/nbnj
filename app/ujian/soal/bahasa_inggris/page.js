"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Soal Pilihan Ganda Bahasa Inggris
const soalPilihanGanda = [
  {
    id: 1,
    soal: "What is the opposite of 'hot'?",
    gambar: null,
    options: [
      { id: "a", text: "Cold" },
      { id: "b", text: "Warm" },
      { id: "c", text: "Cool" },
      { id: "d", text: "Heat" },
    ],
    jawaban: "a",
  },
  {
    id: 2,
    soal: "Which word is a noun?",
    gambar: null,
    options: [
      { id: "a", text: "Run" },
      { id: "b", text: "Quickly" },
      { id: "c", text: "Happiness" },
      { id: "d", text: "Blue" },
    ],
    jawaban: "c",
  },
  {
    id: 3,
    soal: "What is the plural form of 'child'?",
    gambar: null,
    options: [
      { id: "a", text: "Childs" },
      { id: "b", text: "Childes" },
      { id: "c", text: "Children" },
      { id: "d", text: "Childrens" },
    ],
    jawaban: "c",
  },
  {
    id: 4,
    soal: "Choose the correct sentence.",
    gambar: null,
    options: [
      { id: "a", text: "He go to school." },
      { id: "b", text: "She goes to school." },
      { id: "c", text: "They goes to school." },
      { id: "d", text: "You goes to school." },
    ],
    jawaban: "b",
  },
  {
    id: 5,
    soal: "What does 'brave' mean?",
    gambar: null,
    options: [
      { id: "a", text: "Cowardly" },
      { id: "b", text: "Afraid" },
      { id: "c", text: "Courageous" },
      { id: "d", text: "Timid" },
    ],
    jawaban: "c",
  },
  {
    id: 6,
    soal: "What is the antonym of 'fast'?",
    gambar: null,
    options: [
      { id: "a", text: "Quick" },
      { id: "b", text: "Rapid" },
      { id: "c", text: "Slow" },
      { id: "d", text: "Swift" },
    ],
    jawaban: "c",
  },
  {
    id: 7,
    soal: "Which word is an adjective?",
    gambar: null,
    options: [
      { id: "a", text: "Happily" },
      { id: "b", text: "Joy" },
      { id: "c", text: "Happy" },
      { id: "d", text: "Run" },
    ],
    jawaban: "c",
  },
  {
    id: 8,
    soal: "Which is a correct question?",
    gambar: null,
    options: [
      { id: "a", text: "You are coming?" },
      { id: "b", text: "Coming you are?" },
      { id: "c", text: "Are you coming?" },
      { id: "d", text: "Coming are you?" },
    ],
    jawaban: "c",
  },
  {
    id: 9,
    soal: "What does 'tiny' mean?",
    gambar: null,
    options: [
      { id: "a", text: "Huge" },
      { id: "b", text: "Little" },
      { id: "c", text: "Big" },
      { id: "d", text: "Large" },
    ],
    jawaban: "b",
  },
  {
    id: 10,
    soal: "Choose the correct preposition: 'I live ____ Jakarta.'",
    gambar: null,
    options: [
      { id: "a", text: "at" },
      { id: "b", text: "in" },
      { id: "c", text: "on" },
      { id: "d", text: "by" },
    ],
    jawaban: "b",
  },
];

const soalEssay = [
  {
    id: 11,
    soal: "Explain the difference between 'much' and 'many'.",
    keyword: ["much", "many", "difference", "quantity", "countable", "uncountable"],
  },
  {
    id: 12,
    soal: "Write a short paragraph about your favorite hobby.",
    keyword: ["hobby", "favorite", "activities", "interest", "leisure"],
  },
  {
    id: 13,
    soal: "What is the importance of learning English?",
    keyword: ["importance", "learning", "English", "communication", "education"],
  },
  {
    id: 14,
    soal: "Explain the difference between 'who' and 'whom'.",
    keyword: ["who", "whom", "difference", "grammar", "pronouns"],
  },
  {
    id: 15,
    soal: "Give an example of a complex sentence and explain it.",
    keyword: ["complex sentence", "example", "grammar", "clauses", "explanation"],
  },
];



// fungsi sederhana menilai essay berdasarkan kata kunci
function nilaiEssayJawaban(jawaban, keywords) {
  if (!jawaban) return 0;
  if (!Array.isArray(keywords) || keywords.length === 0) return 0;

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


export default function SoalIPA() {
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
          mata_pelajaran: "Bahasa IPA",
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
        mata_pelajaran: "Bahasa IPA",
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
        <h1>Ujian Ilmu Pengetahuan Alam</h1>
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