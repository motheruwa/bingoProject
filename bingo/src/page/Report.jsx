import React, { useState, useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';
import styles from './App.module.css';

const App = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [isFlying, setIsFlying] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [lastCashedOutMultiplier, setLastCashedOutMultiplier] = useState(null);
  const [message, setMessage] = useState('Place your bet and press start!');
  const [balance, setBalance] = useState(100.0);
  const [betAmount, setBetAmount] = useState(5.0);

  const crashPointRef = useRef(1 + Math.random() * 5);

  useEffect(() => {
    let interval;
    if (isFlying) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const newMultiplier = prev + 0.01;
          if (newMultiplier >= crashPointRef.current) {
            clearInterval(interval);
            setIsFlying(false);
            setIsCrashed(true); // ✅ mark crashed
            setMessage('💥 CRASHED!');
            setBalance((prevBalance) => prevBalance - betAmount);
            return crashPointRef.current;
          }
          return parseFloat(newMultiplier.toFixed(2));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isFlying, betAmount]);

  const startGame = () => {
    if (balance < betAmount) {
      setMessage('Not enough balance!');
      return;
    }
    setMultiplier(1.0);
    setIsFlying(true);
    setIsCrashed(false); // ✅ reset crash
    setMessage('Flying...');
    setLastCashedOutMultiplier(null);
    crashPointRef.current = 1 + Math.random() * 5;
  };

  const cashOut = () => {
    if (isFlying) {
      setIsFlying(false);
      setLastCashedOutMultiplier(multiplier);
      setMessage(`You cashed out at ${multiplier.toFixed(2)}x!`);
      setBalance((prev) => prev + betAmount * multiplier - betAmount);
    }
  };

  return (
    <div className={`${styles.app} ${isCrashed ? styles.crashedApp : ''}`}>
      <div className={styles.card}>
        <h1 className={styles.title}>Aviator Game</h1>

        <div className={styles.stats}>
          <div className={styles.statBox}>
            Balance: <span className={styles.green}>${balance.toFixed(2)}</span>
          </div>
          <div className={styles.statBox}>
            Bet: <span className={styles.yellow}>${betAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className={`${styles.playArea} ${isCrashed ? styles.crashedPlayArea : ''}`}>
          <div className={`${styles.cloud} ${styles.cloud1} ${isFlying ? styles.cloudMove1 : ''} ${isCrashed ? styles.cloudCrashed : ''}`} />
          <div className={`${styles.cloud} ${styles.cloud2} ${isFlying ? styles.cloudMove2 : ''} ${isCrashed ? styles.cloudCrashed : ''}`} />
          <div className={`${styles.cloud} ${styles.cloud3} ${isFlying ? styles.cloudMove3 : ''} ${isCrashed ? styles.cloudCrashed : ''}`} />
          <div className={`${styles.cloud} ${styles.cloud4} ${isFlying ? styles.cloudMove4 : ''} ${isCrashed ? styles.cloudCrashed : ''}`} />
          <div className={`${styles.cloud} ${styles.cloud5} ${isFlying ? styles.cloudMove5 : ''} ${isCrashed ? styles.cloudCrashed : ''}`} />
          <div className={`${styles.cloud} ${styles.cloud6} ${isFlying ? styles.cloudMove6 : ''} ${isCrashed ? styles.cloudCrashed : ''}`} />

          <div className={`${styles.plane} ${isCrashed ? styles.planeCrashed : ''}`}>
            <Plane className={styles.planeIcon} />
          </div>

          <div className={styles.multiplier}>
            <span className={`${isFlying ? styles.multiplierFlying : styles.multiplierIdle} ${isCrashed ? styles.multiplierCrashed : ''}`}>
              {isCrashed ? '💥 CRASHED!' : `${multiplier.toFixed(2)}x`}
            </span>
          </div>
        </div>

        <div className={`${styles.message} ${isCrashed ? styles.messageCrashed : ''}`}>{message}</div>

        <div className={styles.controls}>
          <button
            onClick={startGame}
            disabled={isFlying}
            className={`${styles.button} ${isFlying ? styles.disabled : styles.start}`}
          >
            {isCrashed ? "Restart" : "Start Game"}
          </button>
          <button
            onClick={cashOut}
            disabled={!isFlying}
            className={`${styles.button} ${!isFlying ? styles.disabled : styles.cashout}`}
          >
            Cash Out
          </button>
        </div>

        {lastCashedOutMultiplier && (
          <div className={styles.lastRound}>
            Last Round: Cashed out at {lastCashedOutMultiplier.toFixed(2)}x
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
