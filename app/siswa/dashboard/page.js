import Link from "next/link";

export default function SiswaDashboard() {
  return (
    <>
      <style>{`
        .dashboard-container {
          max-width: 720px;
          margin: 2rem auto;
          padding: 2rem;
          background: linear-gradient(135deg, #67e8f9 0%, #3b82f6 100%);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgb(59 130 246 / 0.4);
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.3);
        }

        .nav-list {
          list-style: none;
          padding-left: 0;
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .nav-list li {
          flex: 1;
          text-align: center;
        }

        .nav-link {
          display: inline-block;
          padding: 0.8rem 1.6rem;
          background-color: rgba(255 255 255 / 0.25);
          border-radius: 12px;
          font-weight: 600;
          color: white;
          text-decoration: none;
          box-shadow: 0 4px 10px rgba(0 0 0 / 0.15);
          transition: background-color 0.3s ease, transform 0.3s ease;
          user-select: none;
        }

        .nav-link:hover,
        .nav-link:focus {
          background-color: rgba(255 255 255 / 0.5);
          transform: translateY(-3px);
          outline: none;
          cursor: pointer;
        }
      `}</style>

      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard Siswa</h1>

        <ul className="nav-list" role="navigation" aria-label="Navigasi dashboard siswa">
          <li>
            <Link href="/ujian/jadwal_ujian" className="nav-link">
              Lihat Jadwal Ujian
            </Link>
          </li>
          <li>
            <Link href="/ujian/soal" className="nav-link">
              Kerjakan Ujian
            </Link>
          </li>
          <li>
            <Link href="/ujian/hasil_ujian" className="nav-link">
              Lihat Nilai
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
