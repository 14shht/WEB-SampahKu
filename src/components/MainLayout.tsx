import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!revealItems.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    revealItems.forEach((item, index) => {
      item.classList.remove("is-visible");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 60, 320)}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <header>
        <div id="navbar">
          <div id="logo">
            <img src="/images/logo.png" alt="Logo SampahKu" width={200} />
            <h1>
              <Link to="/home">SampahKu</Link>
            </h1>
          </div>

          <div id="link">
            <NavLink to="/home">HOME</NavLink>
            <NavLink to="/klasifikasi">KLASIFIKASI</NavLink>
            <NavLink to="/tpa">TPA</NavLink>
            <NavLink to="/about">TIM</NavLink>
          </div>

          <div id="hamburgerMenu">
            <button
              id="btnHamburger"
              aria-label="Toggle navigation menu"
              onClick={() => setIsDrawerOpen((prev) => !prev)}
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>

          <div id="link2" style={{ display: isDrawerOpen ? "block" : "none" }}>
            <ul>
              <li>
                <NavLink to="/home" onClick={closeDrawer}>
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink to="/klasifikasi" onClick={closeDrawer}>
                  KLASIFIKASI
                </NavLink>
              </li>
              <li>
                <NavLink to="/tpa" onClick={closeDrawer}>
                  TPA
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={closeDrawer}>
                  TIM
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer>
        <p>
          SampahKu |<a href="#"> KOMPRES IFLAB Team AFQO. All rights reserved.</a>
          | &copy; 2024-2025.
        </p>
      </footer>
    </>
  );
}

export default MainLayout;
