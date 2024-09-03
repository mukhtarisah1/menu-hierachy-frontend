import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.toggleHead}>
        <div className={styles.logo}>
          <img src="img/svg-gobbler-1.svg" />
        </div>
        <div className={styles.logo}>
          <img src="img/togle.svg" />
        </div>
      </div>

      <nav className={styles.content}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              <img src="img/folder.svg" /> Systems
            </a>
           
          </li>

          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
             
              <img src="img/submenu.svg" /> System Code
            </a>
          </li>

          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
             
              <img src="img/submenu.svg" /> Properties
            </a>
          </li>

          
        

          <li className={styles.menuItem}>
            <a href="#" className={styles.activeLink}>
              <img src="img/b-submenu.svg" /> Menus
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
             
              <img src="img/submenu.svg" /> API List
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
             
              <img src="img/t-folder.svg" /> Users & Group
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              
              <img src="img/t-folder.svg" /> Competition
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
