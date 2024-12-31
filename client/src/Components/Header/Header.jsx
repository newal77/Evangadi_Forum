import React, { useState, useEffect, useContext } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo0.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { AppState } from "../../Router";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { handleLogout } = useContext(AppState);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.header_section}>
      <div className={`${styles.header} container`}>
        <div className={`${styles.header_container} row align-items-center`}>
          <div className="col text-align-right d-flex justify-content-between align-items-center">
            <a href="/">
              <img src={logo} alt="Logo" />
            </a>
            <div className={styles.header_small} onClick={toggleMenu}>
              <MenuIcon style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div
            className={`${styles.header_navlist} col mx-auto d-none d-md-block d-lg-block`}
          >
            <div className="d-flex gap-5 justify-content-end align-items-center">
              <div className="gap-3 d-flex">
                <Link to="/" className={styles.nav_link}>
                  <div>Home</div>
                </Link>

                <Link to={"/how-it-works"} className={styles.nav_link}>
                  <div>How it Works</div>
                </Link>
              </div>
              <button>
                {token ? (
                  <button
                    className={styles.header_btn_blue}
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </button>
                ) : (
                  <Link to="/login">
                    <button className={styles.header_btn_blue}>SIGN IN</button>
                  </Link>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.mobile_menu}>
          <div className={styles.mobile_menu_item}>
            <Link to="/" className={styles.nav_link}>
              <div>Home</div>
            </Link>
          </div>
          <div className={styles.mobile_menu_item}>
            <Link to={"/how-it-works"} className={styles.nav_link}>
              <div>How it Works</div>
            </Link>
          </div>
          <div className={styles.mobile_menu_item}>
            {token ? (
              <button className={styles.header_btn_blue} onClick={handleLogout}>
                LOG OUT
              </button>
            ) : (
              <Link to="/login">
                <button className={styles.header_btn_blue}>SIGN IN</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Header;
