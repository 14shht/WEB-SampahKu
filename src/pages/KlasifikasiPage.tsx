import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

type PredictionView = {
  predictedClass: string;
  probability: number;
  kategori: string;
  color: string;
  penjelasan: string;
  penanggulangan: string[];
};

type TmPrediction = {
  className: string;
  probability: number;
};

type TmModel = {
  predict: (input: HTMLImageElement) => Promise<TmPrediction[]>;
};

const classifyInfo = (predictedClass: string) => {
  if (predictedClass === "Biologis") {
    return {
      kategori: "Organik",
      color: "#3E9900",
      penjelasan:
        "Sampah yang kategori organik biasanya terdiri dari sisa makanan dan daun-daunan yang dapat terurai secara alami.",
      penanggulangan: [
        "Pemisahan di Sumber: Pastikan untuk memisahkan sampah organik dari anorganik ketika membuang sampah. Gunakan tempat sampah terpisah atau wadah yang berbeda untuk masing-masing jenis sampah ini.",
        "Pengomposan: Sampah organik dapat diolah melalui pengomposan. Anda dapat menggunakan komposter untuk mengurai sisa-sisa makanan, daun, dan bahan organik lainnya menjadi kompos yang berguna untuk tanaman.",
        "Penggunaan sebagai Pupuk Kompos: Sampah organik dapat diolah menjadi pupuk kompos yang berguna untuk tanaman. Hal ini dapat dilakukan dengan memasukkan tanah secukupnya ke wadah yang telah diisi sampah organik, lalu disiram dengan air dan diisi dengan arang.",
      ],
    };
  }

  if (
    predictedClass === "Kaca" ||
    predictedClass === "Baterai" ||
    predictedClass === "Sampah"
  ) {
    return {
      kategori: "Berbahaya",
      color: "#CD000E",
      penjelasan:
        "Sampah yang kategori sampah berbahaya mencakup bahan-bahan yang dapat membahayakan lingkungan atau kesehatan manusia, seperti baterai, limbah biologis, dan beberapa jenis kaca yang mengandung zat berbahaya.",
      penanggulangan: [
        "Pemisahan di Sumber: Sampah berbahaya seperti kaca, kemasan detergen, atau pembasmi serangga harus dipisahkan secara khusus dalam satu wadah untuk meminimalisasi dampak yang mungkin ditimbulkan.",
        "Pengelolaan yang Tepat: Sampah berbahaya harus dikelola dengan tepat untuk mengurangi dampak negatifnya pada lingkungan. Contohnya, kaca dapat didaur ulang menjadi produk lain, sedangkan kemasan detergen dapat didaur ulang menjadi produk lain yang lebih ramah lingkungan.",
      ],
    };
  }

  return {
    kategori: "Anorganik",
    color: "#ECB500",
    penjelasan:
      "Sampah yang kategori anorganik meliputi bahan-bahan seperti logam, plastik, kaca, dan kertas yang tidak dapat terurai secara alami dan membutuhkan pengolahan khusus.",
    penanggulangan: [
      "Pemisahan di Sumber: Memisahkan sampah anorganik dari organik ketika membuang sampah juga sangat penting. Gunakan tempat sampah terpisah atau wadah yang berbeda untuk masing-masing jenis sampah ini.",
      "Daur Ulang: Sampah anorganik dapat diolah melalui proses daur ulang yang sesuai dengan jenisnya. Contohnya, kertas dapat didaur ulang menjadi kertas yang baru, sedangkan plastik dapat didaur ulang menjadi produk lain.",
      "Penggunaan sebagai Kerajinan Daur Ulang: Sampah anorganik dapat diolah menjadi kerajinan daur ulang yang berguna, seperti produk kerajinan dari kertas, kaleng, atau plastik.",
    ],
  };
};

function KlasifikasiPage() {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const modelRef = useRef<TmModel | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionView | null>(null);
  const [activeTab, setActiveTab] = useState<"hasil" | "penanggulangan">("hasil");
  const [isClassifying, setIsClassifying] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);

  useEffect(() => {
    // Make sure TensorFlow runtime is initialized before loading the TM model.
    tf.ready()
      .then(async () => {
        const model = await window.tmImage.load("/model/model.json", "/model/metadata.json");
        modelRef.current = model;
        setIsModelReady(true);
      })
      .catch((error) => {
        console.error("Failed to initialize model:", error);
      });
  }, []);

  const classifyButtonText = useMemo(() => {
    if (isClassifying) {
      return "Loading ...";
    }
    return previewUrl ? "Klasifikasikan" : "Pilih Gambar";
  }, [isClassifying, previewUrl]);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setPrediction(null);
  };

  const clearImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPrediction(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const classifyImage = async () => {
    if (!previewUrl || !modelRef.current) {
      return;
    }

    setIsClassifying(true);

    try {
      const imageElement = new Image();
      imageElement.src = previewUrl;

      await new Promise<void>((resolve, reject) => {
        imageElement.onload = () => resolve();
        imageElement.onerror = () => reject(new Error("Gagal membaca gambar."));
      });

      const predictions = await modelRef.current.predict(imageElement);
      const topPrediction = predictions.reduce((prev: TmPrediction, current: TmPrediction) =>
        current.probability > prev.probability ? current : prev,
      );

      const info = classifyInfo(topPrediction.className);
      setActiveTab("hasil");
      setPrediction({
        predictedClass: topPrediction.className,
        probability: topPrediction.probability,
        ...info,
      });
    } catch (error) {
      console.error("Failed to classify image:", error);
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <>
      <div id="deskripsi" data-reveal>
        <h2>KLASIFIKASIKAN</h2>
      </div>
      <div id="container" data-reveal>
        <div id="containerFile" data-reveal>
          <div id="file" onClick={() => imageInputRef.current?.click()}>
            <div id="imagePreview">
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview upload"
                    width={500}
                    height={400}
                    style={{ borderRadius: "25px", objectFit: "cover" }}
                  />
                  <button
                    id="buttonExit"
                    onClick={(event) => {
                      event.stopPropagation();
                      clearImage();
                    }}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </>
              ) : null}
            </div>
            <label htmlFor="imageUpload" id="logoFile" style={{ display: previewUrl ? "none" : "block" }}>
              <img src="/images/logoFile.png" alt="" />
            </label>
            <input ref={imageInputRef} type="file" id="imageUpload" accept="image/*" onChange={onChangeFile} />
            <label htmlFor="imageUpload" id="labelFile" style={{ display: previewUrl ? "none" : "block" }}>
              Unggah Gambar
            </label>
          </div>
          <button
            id="buttonKlasifikasi"
            className={isClassifying ? "button-loading" : ""}
            style={{ backgroundColor: previewUrl ? "#FFC849" : "#ad9866" }}
            onClick={classifyImage}
            disabled={!previewUrl || !isModelReady || isClassifying}
          >
            {classifyButtonText}
          </button>
        </div>

        <div id="containerHasil" data-reveal>
          {prediction ? (
            <>
              <div id="headHasil">
                <div className="hasilKlasifikasi">
                  <button id="hasilKlasifikasi" onClick={() => setActiveTab("hasil")}>
                    Hasil
                  </button>
                </div>
                <div className="penagulangan">
                  <button id="penagulangan" onClick={() => setActiveTab("penanggulangan")}>
                    Penanggulangan
                  </button>
                </div>
              </div>

              <div id="hasil">
                {activeTab === "hasil" ? (
                  <>
                    <div
                      className="hasil"
                      style={{
                        backgroundColor: prediction.color,
                        borderRadius: "25px 25px 0 0",
                        color: "white",
                      }}
                    >
                      <h2>Hasil Klasifikasi</h2>
                    </div>
                    <hr />
                    <table>
                      <tbody>
                        <tr>
                          <th>Kategori</th>
                          <th>: {prediction.kategori}</th>
                        </tr>
                        <tr>
                          <th>Jenis</th>
                          <th>: {prediction.predictedClass}</th>
                        </tr>
                        <tr>
                          <th>Kecocokan</th>
                          <th>: {Math.round(prediction.probability * 100)}%</th>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
                    <p>{prediction.penjelasan}</p>
                  </>
                ) : (
                  <>
                    <div
                      className="hasil"
                      style={{
                        backgroundColor: prediction.color,
                        borderRadius: "25px 25px 0 0",
                        color: "white",
                      }}
                    >
                      <h2>Cara Penanggulangan Sampah {prediction.kategori}</h2>
                    </div>
                    <hr />
                    <ul>
                      {prediction.penanggulangan.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default KlasifikasiPage;
