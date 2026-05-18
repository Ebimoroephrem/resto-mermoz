import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
            <img src={assets.logo} alt="Logo" />
            <p>Bienvenue au rest'O Mermoz</p>
            <div className="footer-social">
              <img src={assets.facebook_icon} alt="Facebook" />
              <img src={assets.linkedin_icon} alt="LinkedIn" />
              <img src={assets.twitter_icon} alt="Twitter" />
            </div>
        </div>
        <div className="footer-center">
          <h2>Compagnie</h2>
            <ul>
              <li>Acceuil</li>
              <li>A propros de nous</li>
              <li>Livraison</li>
              <li>Politique de confidentialité</li>
            </ul>

        </div>
        <div className="footer-right">
          <h2>Contactez-nous</h2>
             <ul>
              <li>+225 05-86-05-05-27</li>
              <li>ephremulrich@gmail.com</li>
              <li>123 Rue de la Paix, Abidjan</li>
             </ul>

        </div>
      </div>
      <hr />
      <p className="footer-bottom">© 2026 rest'O Mermoz. Tous droits réservés.</p>
    </div>
  );
};

export default Footer;
