// file: /app/api/auth/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();

  // Simulasi user db
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "guru", password: "guru123", role: "guru" },
    { username: "siswa", password: "siswa123", role: "siswa" },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Kembalikan data user (biasanya token / session)
  return NextResponse.json({
    username: user.username,
    role: user.role,
  });
}
