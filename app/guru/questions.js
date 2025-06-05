// pages/guru/questions.js
import { useEffect, useState } from "react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    examId: "",
    questionText: "",
    type: "pg",
    options: "",
    correctAnswer: "",
    image: "",
  });

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({
      examId: "",
      questionText: "",
      type: "pg",
      options: "",
      correctAnswer: "",
      image: "",
    });
    const res = await fetch("/api/questions");
    setQuestions(await res.json());
  };

  const handleDelete = async (id) => {
    await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
    const res = await fetch("/api/questions");
    setQuestions(await res.json());
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manajemen Soal</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          name="examId"
          placeholder="ID Ujian"
          value={form.examId}
          onChange={(e) => setForm({ ...form, examId: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          name="questionText"
          placeholder="Pertanyaan"
          value={form.questionText}
          onChange={(e) => setForm({ ...form, questionText: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <select
          name="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border px-2 py-1 mr-2"
        >
          <option value="pg">Pilihan Ganda</option>
          <option value="esai">Esai</option>
        </select>
        {form.type === "pg" && (
          <>
            <input
              name="options"
              placeholder='["A", "B", "C", "D"]'
              value={form.options}
              onChange={(e) => setForm({ ...form, options: e.target.value })}
              className="border px-2 py-1 mr-2"
            />
            <input
              name="correctAnswer"
              placeholder="Jawaban Benar"
              value={form.correctAnswer}
              onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
              className="border px-2 py-1 mr-2"
            />
          </>
        )}
        <input
          name="image"
          placeholder="URL Gambar (opsional)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded">Tambah Soal</button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Pertanyaan</th>
            <th className="border p-2">Tipe</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td className="border p-2">{q.id}</td>
              <td className="border p-2">{q.questionText}</td>
              <td className="border p-2">{q.type}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(q.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
