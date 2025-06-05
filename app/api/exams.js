import prisma from "@/lib/prisma";  // Pastikan kamu punya folder lib/prisma.js untuk koneksi DB

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const exams = await prisma.exam.findMany({
        include: { createdBy: true }
      });
      res.json(exams);
      break;

    case "POST":
      const { title, subject, description, startTime, endTime, createdById } = req.body;
      const newExam = await prisma.exam.create({
        data: {
          title,
          subject,
          description,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          createdById,
        },
      });
      res.json(newExam);
      break;

    case "DELETE":
      const { id } = req.query;
      await prisma.exam.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Deleted" });
      break;

    default:
      res.status(405).end();
      break;
  }
}
