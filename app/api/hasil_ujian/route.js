// file: /app/api/hasil_ujian/route.js (Next.js 13 app dir API route)

import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_PATH, "hasil_ujian.json");

async function bacaData() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function simpanData(data) {
  await fs.mkdir(DATA_PATH, { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.mata_pelajaran || body.nilai == null) {
      return new Response(
        JSON.stringify({ error: "Data tidak lengkap" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const semuaData = await bacaData();
    semuaData.push(body);
    await simpanData(semuaData);

    return new Response(
      JSON.stringify({ message: "Hasil ujian berhasil disimpan" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Terjadi kesalahan server",
        detail: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// GET untuk statistik ringkas
export async function GET(request) {
  try {
    const semuaData = await bacaData();

    if (semuaData.length === 0) {
      return new Response(
        JSON.stringify({
          peserta: 0,
          rata_rata: 0,
          nilai_tertinggi: 0,
          nilai_terendah: 0,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const nilaiArr = semuaData.map((d) => d.nilai);
    const peserta = nilaiArr.length;
    const totalNilai = nilaiArr.reduce((a, b) => a + b, 0);
    const rata_rata = totalNilai / peserta;
    const nilai_tertinggi = Math.max(...nilaiArr);
    const nilai_terendah = Math.min(...nilaiArr);

    return new Response(
      JSON.stringify({
        peserta,
        rata_rata: Number(rata_rata.toFixed(2)),
        nilai_tertinggi,
        nilai_terendah,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Terjadi kesalahan server",
        detail: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
