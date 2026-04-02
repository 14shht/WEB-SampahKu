import teamData from "../data/teamData";

function AboutPage() {
  const technologies = [
    { name: "Vite", image: "/images/vite.png" },
    { name: "TypeScript", image: "/images/type%20script.png" },
    { name: "React", image: "/images/react.png" },
    { name: "CSS", image: "/images/logo-css.png" },
    { name: "TensorFlow", image: "/images/logo-tf.png" },
    { name: "Teachable Machine", image: "/images/logo-tm.png" },
    { name: "Kaggle", image: "/images/logo-kaggle.png" },
  ];

  return (
    <div id="container-about" className="about-shell">
      <div id="container-kontributor" data-reveal>
        <h1 className="section-title">TIM PENGEMBANG</h1>
        <p className="section-subtitle">
          Kolaborasi lintas role untuk membangun platform klasifikasi sampah yang
          praktis dan informatif.
        </p>
        <div id="team-grid">
          {teamData.map((member) => (
            <article className="team-card" key={member.name} data-reveal>
              <img src={member.image} alt={member.name} />
              <h2>{member.name}</h2>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
      <div id="container-visimisi" data-reveal>
        <div className="visi" data-reveal>
          <h3 className="section-mini-title">VISI</h3>
          <div>
            <p>
              Membangun sebuah website yang inovatif dan mudah digunakan untuk
              membantu masyarakat dalam mengenali dan mengklasifikasikan
              jenis-jenis sampah, sehingga dapat mendukung upaya pelestarian
              lingkungan dan pengelolaan sampah yang lebih efektif.
            </p>
          </div>
        </div>
        <div className="misi" data-reveal>
          <h3 className="section-mini-title">MISI</h3>
          <div>
            <p>
              Menyediakan informasi yang lengkap dan akurat mengenai berbagai
              jenis sampah dan cara pengelolaannya yang tepat, guna meningkatkan
              kesadaran masyarakat tentang pentingnya pengelolaan sampah yang
              baik.
            </p>
          </div>
        </div>
      </div>
      <div id="container-teknologi" data-reveal>
        <h1 className="section-title">TEKNOLOGI</h1>
        <div className="image">
          {technologies.map((tech) => (
            <div className="tech-item" key={tech.name} data-reveal>
              <img src={tech.image} alt={tech.name} />
              <p>{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
