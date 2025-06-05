import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ujianId, answers } = req.body;
    for (const [questionId, answer] of Object.entries(answers)) {
      await prisma.answer.create({
        data: {
          userId: 1, // Ini dummy, harusnya pakai session userId
          questionId: parseInt(questionId),
          answer,
          score: null, // Penilaian otomatis dilakukan terpisah
        },
      });
    }
    res.status(200).json({ message: 'Jawaban berhasil disimpan' });
  }
}
