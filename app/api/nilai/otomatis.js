import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ujianId, userId } = req.body;
    const answers = await prisma.answer.findMany({
      where: { question: { examId: ujianId }, userId },
      include: { question: true },
    });

    let totalScore = 0;
    for (const answer of answers) {
      if (answer.question.type === 'pg') {
        const benar = answer.answer === answer.question.correctAnswer;
        const score = benar ? 1 : 0;
        await prisma.answer.update({
          where: { id: answer.id },
          data: { score },
        });
        totalScore += score;
      }
    }
    res.json({ totalScore });
  }
}
