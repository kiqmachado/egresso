import React, { useEffect, useState } from 'react';
import './../../css/stylesHeaderFooter.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { collection, doc, getDoc} from 'firebase/firestore';


function Footer() {
  
  return (
    <div>
      <footer id="footer">
        <div className="footerContainer">
          <div class="footerEsq">
            <h3>Copyright © 2022 - Grupo do Egresso</h3>
          </div>
          <div class="footerDir">
            <div class="contato">
              <a class="f-box-left-wpp" href="https://bri.ifsp.edu.br/index.php/contato"><i class="fa-brands fa-whatsapp"></i></a>
              <a class="f-box-left-insta" href="https://www.instagram.com/ifsp.bri/"><i class="fab fa-instagram-square"></i></a>
              <a class="f-box-left-face" href="https://www.facebook.com/ifspbirigui/?locale=pt_BR"><i class="fab fa-facebook-f"></i></a>
              </div>
            </div>
          </div>

      </footer>
    </div>
  );
}

export default Footer;
