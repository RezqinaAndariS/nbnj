// file: /app/api/riwayat_ujian/route.js

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

export async function GET() {
  try {
    const semuaData = await bacaData();

    return new Response(
      JSON.stringify({ ujian: semuaData }),
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
