import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { studentId, examId } = req.body;

    // Cari semua jawaban siswa
    const answers = await prisma.answer.findMany({
      where: {
        studentId,
        question: { examId },
      },
      include: {
        question: true,
      },
    });

    // Penilaian otomatis untuk soal PG
    let totalScore = 0;
    answers.forEach(async (answer) => {
      if (answer.question.type === "pg") {
        const correctAnswer = answer.question.correctAnswer;
        if (answer.answerText === correctAnswer) {
          await prisma.answer.update({
            where: { id: answer.id },
            data: { score: 1 },
          });
          totalScore += 1;
        } else {
          await prisma.answer.update({
            where: { id: answer.id },
            data: { score: 0 },
          });
        }
      }
    });

    res.json({ totalScore, message: "Penilaian otomatis selesai" });
  } else {
    res.status(405).end();
  }
}
