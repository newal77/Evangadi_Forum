import React from 'react'
import "./Footer.css";
import logo from "../../assets/logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer_out_container">
          <div className="footer_inner_container">
            <div className="footer_data">
              <div>
                <div className="footer_icon">
                  <img src={logo} />
                </div>
                <div className="footer_icons">
                  <div>
                    <FacebookOutlinedIcon />
                  </div>
                  <div>
                    <InstagramIcon />
                  </div>
                  <div>
                    <YouTubeIcon />
                  </div>
                </div>
              </div>
              <div className="footer_links">
                <h3>Useful Link</h3>
                <ul>
                  <li>How it works</li>
                  <li>Terms of Service</li>
                  <li>Privacy policy</li>
                </ul>
              </div>
              <div className="footer_links">
                <h3>Contact Info</h3>
                <ul>
                  <li>Contact Info</li>
                  <li>support@evangadi.com</li>
                  <li>+1-202-386-2702</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer
