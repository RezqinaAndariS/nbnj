import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const exam = await prisma.exam.findUnique({
    where: { id: parseInt(id) },
    include: { questions: true },
  });
  res.json(exam);
}
