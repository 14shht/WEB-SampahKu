import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div id="containerHome" data-reveal>
      <div className="intro" data-reveal>
        <img src="/images/R_Kuning.png" id="kuning" />
        <img src="/images/R_Biru.png" id="biru" />
        <h1>KLASIFIKASI SAMPAH</h1>
        <p>
          Website ini menggunakan teknologi machine learning untuk membantu Anda
          mengklasifikasikan sampah yang ingin dibuang menjadi tiga kategori:
          organik, anorganik, dan sampah berbahaya. Dengan ini, kami berharap
          dapat mempermudah Anda dalam memilah sampah dengan benar dan mendukung
          upaya menjaga lingkungan.
        </p>
        <button id="btnMulai">
          <Link to="/klasifikasi">MULAI</Link>
        </button>
      </div>
      <div className="bckGroundHome" data-reveal>
        <img src="/images/bg-1.png" alt="Garbage Separation Background" />
      </div>
    </div>
  );
}

export default HomePage;
