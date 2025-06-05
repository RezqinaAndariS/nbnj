import { NextResponse } from "next/server";

// Simulasi database sementara dengan array dalam memori.
// Di real project, ganti dengan koneksi database (MySQL, MongoDB, dll).
let jadwalDB = [
  { id: 1, mapel: "Matematika", tanggal: "2025-06-10", jam: "09:00" },
  { id: 2, mapel: "Bahasa Inggris", tanggal: "2025-06-11", jam: "13:00" },
  { id: 3, mapel: "Bahasa Indonesia", tanggal: "2025-06-12", jam: "08:00" },
  { id: 4, mapel: "IPS", tanggal: "2025-06-13", jam: "10:30" },
  { id: 5, mapel: "IPA", tanggal: "2025-06-14", jam: "12:30" },
];

// Helper untuk generate ID unik sederhana
const generateId = () => (jadwalDB.length ? Math.max(...jadwalDB.map((j) => j.id)) + 1 : 1);

export async function GET() {
  // Kirim semua jadwal
  return NextResponse.json(jadwalDB);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { mapel, tanggal, jam } = data;

    if (!mapel || !tanggal || !jam) {
      return NextResponse.json(
        { error: "Field mapel, tanggal, dan jam wajib diisi." },
        { status: 400 }
      );
    }

    const newJadwal = {
      id: generateId(),
      mapel,
      tanggal,
      jam,
    };
    jadwalDB.push(newJadwal);

    return NextResponse.json(newJadwal, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");
    if (!idParam) {
      return NextResponse.json({ error: "ID jadwal diperlukan." }, { status: 400 });
    }
    const id = parseInt(idParam);

    const index = jadwalDB.findIndex((j) => j.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Jadwal tidak ditemukan." }, { status: 404 });
    }

    const data = await request.json();
    const { mapel, tanggal, jam } = data;

    if (!mapel || !tanggal || !jam) {
      return NextResponse.json(
        { error: "Field mapel, tanggal, dan jam wajib diisi." },
        { status: 400 }
      );
    }

    jadwalDB[index] = { id, mapel, tanggal, jam };

    return NextResponse.json(jadwalDB[index]);
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");
    if (!idParam) {
      return NextResponse.json({ error: "ID jadwal diperlukan." }, { status: 400 });
    }
    const id = parseInt(idParam);

    const index = jadwalDB.findIndex((j) => j.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Jadwal tidak ditemukan." }, { status: 404 });
    }

    jadwalDB.splice(index, 1);

    return NextResponse.json({ message: "Jadwal berhasil dihapus." });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan." }, { status: 400 });
  }
}
