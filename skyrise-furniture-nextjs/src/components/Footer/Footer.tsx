import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <p className={styles.footer__copyright}>&copy; 2023. All right reserved.</p>
          <p className={styles.footer__brand}>CREATIVE DIGITAL</p>
          <address className={styles.footer__address}>
            36 East 73th street<br />
            NEW YORK, NY
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;