import React, { useState } from 'react';
import styles from '../css/SafeBrowserMode.module.css';

function SafeBrowserMode({ children }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  document.addEventListener('fullscreenchange', handleFullscreenChange);

  return (
    <div className={styles.safebrowsermode}>
      {!isFullScreen && <button onClick={toggleFullScreen}>Toggle Full Screen</button>}
      {children}
    </div>
  );
}

export default SafeBrowserMode;