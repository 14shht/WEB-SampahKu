import tpaData from "../data/tpaData";

function TpaPage() {
  return (
    <>
      <h1 className="h1-tpa" data-reveal>
        TEMPAT PEMBUANGAN AKHIR
      </h1>
      <div id="container-tpa">
        {tpaData.map((alamat) => (
          <div className="container-tpa" key={alamat.link} data-reveal>
            <div className="tpa-image">
              <iframe
                src={alamat.embedUrl}
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="alamat-tpa">
              <a href={alamat.link} target="_blank" rel="noreferrer">
                {alamat.alamat}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TpaPage;
