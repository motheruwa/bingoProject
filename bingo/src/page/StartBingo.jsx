import React, { useState, useEffect } from 'react';
import styles from '../css/start.module.css';
import { useNavigate } from 'react-router-dom';
import BingoCard from '../images/bingocard.jpg';
import startAudio from '../audio/START.mp4';

const StartBingo = () => {
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [remainingMoney, setRemainingMoney] = useState(0);
  // eslint-disable-next-line
  const [deductedAmount, setDeductedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNumbers = localStorage.getItem('registeredNumbers');
    const storedAmount = localStorage.getItem('selectedAmount');

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }

    if (storedAmount) {
      setSelectedAmount(Number(storedAmount));
    }

    resetRoundCountIfNewDay();

  }, []);

  useEffect(() => {
    // Calculate the total amount
    const total = registeredNumbers.length * selectedAmount;
    setTotalAmount(total);
  
    let deductionMultiplier = 1; // Default deduction multiplier for registered numbers 1-6
  
    // Update deduction multiplier based on the range of registered numbers
    if (registeredNumbers.length >= 7 && registeredNumbers.length <= 8) {
      deductionMultiplier = 1.5;
    } else if (registeredNumbers.length >= 9 && registeredNumbers.length <= 11) {
      deductionMultiplier = 2;
    } else if (registeredNumbers.length >= 12 && registeredNumbers.length <= 13) {
      deductionMultiplier = 2.5;
    } else if (registeredNumbers.length >= 14 && registeredNumbers.length <= 16) {
      deductionMultiplier = 3;
    }else if (registeredNumbers.length >= 17 && registeredNumbers.length <= 18) {
      deductionMultiplier = 3.5;
    }else if (registeredNumbers.length >= 19 && registeredNumbers.length <= 21) {
      deductionMultiplier = 4;
    }else if (registeredNumbers.length >= 22 && registeredNumbers.length <= 23) {
      deductionMultiplier = 4.5;
    }else if (registeredNumbers.length >= 24 && registeredNumbers.length <= 26) {
      deductionMultiplier = 5;
    }else if (registeredNumbers.length >= 27 && registeredNumbers.length <= 28) {
      deductionMultiplier = 5.5;
    }else if (registeredNumbers.length >= 29 && registeredNumbers.length <= 31) {
      deductionMultiplier = 6;
    }else if (registeredNumbers.length >= 32 && registeredNumbers.length <= 33) {
      deductionMultiplier = 6.5;
    }else if (registeredNumbers.length >= 34 && registeredNumbers.length <= 36) {
      deductionMultiplier = 7;
    }else if (registeredNumbers.length >= 37 && registeredNumbers.length <= 38) {
      deductionMultiplier = 7.5;
    }else if (registeredNumbers.length >= 39 && registeredNumbers.length <= 41) {
      deductionMultiplier = 8;
    }else if (registeredNumbers.length >= 42 && registeredNumbers.length <= 43) {
      deductionMultiplier = 8.5;
    }else if (registeredNumbers.length >= 44 && registeredNumbers.length <= 46) {
      deductionMultiplier = 9;
    }else if (registeredNumbers.length >= 47 && registeredNumbers.length <= 48) {
      deductionMultiplier = 9.5;
    }else if (registeredNumbers.length >= 49 && registeredNumbers.length <= 51) {
      deductionMultiplier = 10;
    }
  
    // Calculate the deducted amount
    let deducted = deductionMultiplier * selectedAmount;
    
    // If the deducted amount is odd, subtract 5
    if (deducted % 2 !== 0) {
      deducted -= 5;
    }
  
    setDeductedAmount(deducted);
  
    // Calculate the remaining money after deduction
    const remaining = totalAmount - deducted;
    setRemainingMoney(remaining);
  }, [registeredNumbers, selectedAmount, totalAmount]);
  useEffect(() => {
    const audio = new Audio(startAudio);
    audio.load(); // Preload the audio

    return () => {
      // Clean up the audio element
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
  }, []); // Empty dependency array to run only on mount

  const handleClick = () => {
    const audio = new Audio(startAudio);

    audio.onended = () => {
      // Increment the number of rounds played
      const roundsPlayed = JSON.parse(localStorage.getItem('roundsPlayed')) || 0;
      localStorage.setItem('roundsPlayed', roundsPlayed + 1);

      navigate('/randombingonumber', {
        state: { registeredNumbers, remainingMoney }
      });
    };

    audio.play();
  };

  const handleregisterClick = () => {
    navigate('/registerdcard');
  };

  const resetRoundCountIfNewDay = () => {
    const lastResetDate = localStorage.getItem('lastResetDate');
    const currentDate = new Date().toLocaleDateString();

    if (lastResetDate !== currentDate) {
      localStorage.setItem('roundsPlayed', '0');
      localStorage.setItem('lastResetDate', currentDate);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.link} onClickCapture={handleregisterClick}>registercard</div>
      <div className={styles.card}>
        <img src={BingoCard} alt="Bingo Card" />
      </div>
      <button onClick={handleClick} disabled={registeredNumbers.length === 0} className={styles.button}>
        Start
      </button>
    </div>
  );
};

export default StartBingo;