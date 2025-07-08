'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Update body overflow when mobile menu is toggled
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''}`}>
      <div className="container">
        <div className={styles.header__wrapper}>
          {/* Logo */}
          <Link href="http://localhost:4200" className={styles.header__logo} aria-label="Skyrise Furniture Home">
            <span className={styles.header__logoText}>skyrise</span>
            <span className={styles.header__logoAccent}>decor</span>
          </Link>

          {/* Navigation */}
          <nav className={styles.header__nav} aria-label="Main navigation">
            <ul className={styles.header__navList}>
              <li className={styles.header__navItem}>
                <a href="#" className={`${styles.header__navLink} ${styles['header__navLink--active']}`}>
                  Modern Furniture
                </a>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className={styles.header__actions}>
            <button className={`btn btn--secondary ${styles.header__actionBtn}`} aria-label="View less tables">
              Let&apos;s Talk!
            </button>
            
            {/* Mobile menu toggle */}
            <button 
              className={styles.header__menuToggle}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className={styles.header__menuToggleLine}></span>
              <span className={styles.header__menuToggleLine}></span>
              <span className={styles.header__menuToggleLine}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className={`${styles.header__mobileNav} ${isMobileMenuOpen ? styles['header__mobileNav--open'] : ''}`} 
        aria-label="Mobile navigation"
      >
        <ul className={styles.header__mobileNavList}>
          <li className={styles.header__mobileNavItem}>
            <a href="#" className={`${styles.header__mobileNavLink} ${styles['header__mobileNavLink--active']}`}>
              Modern Furniture
            </a>
          </li>
        </ul>
        <button className={`btn btn--secondary ${styles.header__mobileActionBtn}`}>
          Let&apos;s Talk!
        </button>
      </nav>
    </header>
  );
};

export default Header;