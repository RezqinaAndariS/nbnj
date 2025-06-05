import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { studentId } = req.query;
    const reports = await prisma.answer.groupBy({
      by: ["questionId"],
      _sum: { score: true },
      where: { studentId: parseInt(studentId) },
    });
    res.json(reports);
  } else {
    res.status(405).end();
  }
}
