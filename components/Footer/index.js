import styles from './Footer.module.css';
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h5>&copy; <a href="https://www.coldmessager.com" target={"_blank"}>Cold Messager</a></h5>

      <div className={styles.footer__iconscontainer}>
          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/company/cold-messager/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3BXVyiHlHhQL%2BQNt7Mz9jsEQ%3D%3D"
            target={"_blank"}
            className={styles.footer__icons}
          >
            <FaLinkedin className={styles.footer__icons_icon} />
          </a>
          {/* Twitter Icon */}
          <a
            href="https://twitter.com/ColdM13955"
            target={"_blank"}
            className={styles.footer__icons}
          >
            <FaTwitter className={styles.footer__icons_icon} />
          </a>
          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/coldmessager/"
            target={"_blank"}
            className={styles.footer__icons}
          >
            <FaInstagram className={styles.footer__icons_icon} />
          </a>
        </div>
    </footer>
  );
}
