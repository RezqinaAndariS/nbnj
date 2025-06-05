import { useEffect, useState } from "react";

export default function CorrectAnswers() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("/api/answers")
      .then((res) => res.json())
      .then(setAnswers);
  }, []);

  const handleScore = async (answerId, score) => {
    await fetch(`/api/answers/${answerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: parseInt(score) }),
    });
    alert("Score updated!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Penilaian Soal Esai</h1>
      {answers.map((a) => (
        <div key={a.id} className="mb-4">
          <p><strong>Soal:</strong> {a.question.questionText}</p>
          <p><strong>Jawaban:</strong> {a.answerText}</p>
          <input
            type="number"
            placeholder="Skor"
            onBlur={(e) => handleScore(a.id, e.target.value)}
            className="border p-1"
          />
        </div>
      ))}
    </div>
  );
}
