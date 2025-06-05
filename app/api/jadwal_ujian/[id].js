import { getConnection } from '../../../lib/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  const connection = await getConnection();
  const jadwalId = parseInt(id);

  // Cek apakah jadwal ada
  const [rows] = await connection.query("SELECT * FROM jadwal_ujian WHERE id = ?", [jadwalId]);
  if (rows.length === 0) {
    await connection.end();
    return res.status(404).json({ error: "Jadwal tidak ditemukan" });
  }

  if (method === "PUT") {
    const { mapel, tanggal, jam } = body;
    if (!mapel || !tanggal || !jam) {
      await connection.end();
      return res.status(400).json({ error: "Semua field harus diisi" });
    }

    try {
      await connection.query(
        "UPDATE jadwal_ujian SET mapel = ?, tanggal = ?, jam = ? WHERE id = ?",
        [mapel, tanggal, jam, jadwalId]
      );
      await connection.end();
      return res.status(200).json({ id: jadwalId, mapel, tanggal, jam });
    } catch (error) {
      await connection.end();
      return res.status(500).json({ error: "Gagal mengupdate jadwal" });
    }
  }

  if (method === "DELETE") {
    try {
      await connection.query("DELETE FROM jadwal_ujian WHERE id = ?", [jadwalId]);
      await connection.end();
      return res.status(200).json({ message: "Jadwal berhasil dihapus" });
    } catch (error) {
      await connection.end();
      return res.status(500).json({ error: "Gagal menghapus jadwal" });
    }
  }

  await connection.end();
  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
