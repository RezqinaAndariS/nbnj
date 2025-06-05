import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const exam = await prisma.exam.create({
    data: {
      title: 'Ujian Matematika',
      description: 'Latihan soal matematika dasar',
      duration: 60,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        questionText: 'Berapa hasil dari 2 + 2?',
        type: 'pg',
        choices: JSON.stringify(['3', '4', '5', '6']),
        correctAnswer: '4',
        examId: exam.id,
      },
      {
        questionText: 'Jelaskan pengertian himpunan!',
        type: 'esai',
        choices: null,
        correctAnswer: null,
        examId: exam.id,
      },
      {
        questionText: 'Gambar bangun segitiga.',
        type: 'esai',
        choices: null,
        correctAnswer: null,
        examId: exam.id,
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Data soal berhasil di-seed');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
