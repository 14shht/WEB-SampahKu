import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import KlasifikasiPage from "./pages/KlasifikasiPage";
import TpaPage from "./pages/TpaPage";

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <div className="route-transition" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/klasifikasi" element={<KlasifikasiPage />} />
          <Route path="/tpa" element={<TpaPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </MainLayout>
  );
}

export default App;
