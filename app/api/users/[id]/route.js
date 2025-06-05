import { NextResponse } from "next/server";

// Simulasi data pengguna (sebagai contoh)
let users = [
  { id: 1, name: "Admin", email: "admin@example.com", role: "ADMIN" },
  { id: 2, name: "Guru", email: "guru@example.com", role: "GURU" },
  { id: 3, name: "Siswa", email: "siswa@example.com", role: "SISWA" },
];

let nextId = 4;

// GET: Fetch all users
export async function GET() {
  return NextResponse.json(users);
}

// POST: Tambah user baru
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.password || !data.role) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    const newUser = {
      id: nextId++,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambah user." },
      { status: 500 }
    );
  }
}

// DELETE: Hapus user berdasarkan ID
export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
  }

  users.splice(userIndex, 1);

  return NextResponse.json({ message: "User berhasil dihapus" }, { status: 200 });
}
