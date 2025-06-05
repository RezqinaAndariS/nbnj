import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { ujianId } = req.query;
  const nilai = await prisma.answer.findMany({
    where: { question: { examId: parseInt(ujianId) } },
    include: { user: true, question: true },
  });

  const hasil = {};
  nilai.forEach((n) => {
    if (!hasil[n.userId]) {
      hasil[n.userId] = { nama: n.user.name, totalScore: 0 };
    }
    hasil[n.userId].totalScore += n.score || 0;
  });

  res.json(Object.values(hasil));
}
