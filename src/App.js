import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MenuManagement from './components/MenuManagement';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <MenuManagement />
      </div>
    </div>
  );
}

export default App;
