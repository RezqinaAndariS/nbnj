import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const questions = await prisma.question.findMany({
        include: { exam: true },
      });
      res.json(questions);
      break;

    case "POST":
      const { examId, questionText, type, options, correctAnswer, image } = req.body;
      const newQuestion = await prisma.question.create({
        data: {
          examId,
          questionText,
          type,
          options,
          correctAnswer,
          image,
        },
      });
      res.json(newQuestion);
      break;

    case "DELETE":
      const { id } = req.query;
      await prisma.question.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Deleted" });
      break;

    default:
      res.status(405).end();
      break;
  }
}
