import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.title}>Menus</div>
        <div className={styles.breadcrumb}>/ Menus</div>
      </div>
    </div>
  );
};

export default Header;
