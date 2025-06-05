// pages/guru/exams.js
import { useEffect, useState } from "react";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => res.json())
      .then(setExams);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, createdById: 1 }),  // sementara, ID guru=1
    });
    setForm({
      title: "",
      subject: "",
      description: "",
      startTime: "",
      endTime: "",
    });
    const res = await fetch("/api/exams");
    setExams(await res.json());
  };

  const handleDelete = async (id) => {
    await fetch(`/api/exams?id=${id}`, { method: "DELETE" });
    const res = await fetch("/api/exams");
    setExams(await res.json());
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manajemen Ujian</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          name="title"
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          name="subject"
          placeholder="Mata Pelajaran"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          name="startTime"
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          name="endTime"
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded">Tambah Ujian</button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Judul</th>
            <th className="border p-2">Mata Pelajaran</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td className="border p-2">{exam.id}</td>
              <td className="border p-2">{exam.title}</td>
              <td className="border p-2">{exam.subject}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(exam.id)}
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
