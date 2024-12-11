import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card39() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const [animateCurrent, setAnimateCurrent] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  useEffect(() => {
    if (calledNumbers.size > 0) {
      setCurrentNumber(Array.from(calledNumbers).pop());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAnimateCurrent(true);
    
    
    const timeout = setTimeout(() => {
      setAnimateCurrent(false);
    }, 2000); // Duration of the 'current' animation
    
    return () => clearTimeout(timeout);
    }, [currentNumber]);
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [10, 14, 1, 11, 13],
      I: [27, 16, 25, 26, 28],
      N: [35, 37, 'free', 41, 42],
      G: [51, 53, 48, 58, 47],
      O: [61, 72, 69, 70, 68]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B10', 'B14', 'B1', 'B11', 'B13'], // First row
        ['I27', 'I16', 'I25', 'I26', 'I28'], // Second row
        ['N35', 'N37', 'free', 'N41', 'N42'], // Third row
        ['G51', 'G53', 'G48', 'G58', 'G47'], // Fourth row
        ['O61', 'O72', 'O69', 'O70', 'O68'], // Fifth row
        ['B10', 'I16', 'free', 'G58', 'O68'], // Top-left to bottom-right diagonal
        ['O61', 'G53', 'free', 'I26', 'B13'], // Top-right to bottom-left diagonal
        ['B10', 'I27', 'N35', 'G51', 'O61'], // First column
        ['B14', 'I16', 'N37', 'G53', 'O72'], // Second column
        ['B1', 'I25', 'free', 'G48', 'O69'], // Third column
        ['B11', 'I26', 'N41', 'G58', 'O70'], // Fourth column
        ['B13', 'I28', 'N42', 'G47', 'O68'], // Fifth column
        ['B10', 'B13', 'O61', 'O68'], // corner
    ];

    const winningLines = [];
    for (const condition of winConditions) {
      if (condition.every(char => calledNumbers.has(char))) {
        winningLines.push(condition);
      }
    }

    if (winningLines.length > 0) {
      const winningNumbers = [...new Set(winningLines.flat())];
      return winningNumbers;
    }

    return [];
  };

  const bingoCard = generateBingoCard();
  const winningNumbers = checkWin();


  const handleResetAndNavigate = () => {
    localStorage.removeItem('calledNumbers');
    localStorage.removeItem('registeredNumbers');

    navigate('/registerdcard');
  };

  
  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  const audioWin = new Audio(Win);
  const audioNotwin = new Audio(Notwin);

  const playWinSound = () => {
    audioWin.play();
  };

  const playNotwinSound = () => {
    audioNotwin.play();
    audioNotwin.onended = function() {
        handleGoBack();
    };
};

  const isFourCornersWinning =
  winningNumbers.includes('B10') &&
  winningNumbers.includes('B13') &&
  winningNumbers.includes('O61') &&
  winningNumbers.includes('O68');
  return (
    <div className={styles.container}>
    <div className={styles.current11}>
        <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
          <h3>{currentNumber}</h3>
        </div>
      </div>
      <div className={styles.cont}>
      <div className={styles.cardnumber}>Card Number 39</div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.B}>B</th>
          <th className={styles.I}>I</th>
          <th className={styles.N}>N</th>
          <th className={styles.G}>G</th>
          <th className={styles.O}>O</th>
        </tr>
      </thead>
      <tbody>
      {[0, 1, 2, 3, 4].map((index) => (
        <tr key={index}>
          {Object.keys(bingoCard).map((letter) => {
            const number = bingoCard[letter][index];
            const isCalled = calledNumbers.has(`${letter}${number}`) || (number === 'free' && calledNumbers.has('free'));
            const isWinningNumber = winningNumbers.includes(`${letter}${number}`) || (number === 'free' && winningNumbers.includes('free'));
            const isCornerWinning = isFourCornersWinning && (letter === 'B' || letter === 'O') && (index === 0 || index === 4);

            const cellClassName = isWinningNumber
              ? isCornerWinning
                ? styles.cornerwinning
                : styles.winning
              : isCalled
              ? styles.called
              : '';
            return (
              <td >
                <div key={number} className={cellClassName}>
                {number}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
    </table>
    <div className={styles.buttons}>
    <button onClick={playWinSound} className={styles.good}>Good Bingo</button>
    <button onClick={playNotwinSound} className={styles.add}>Not Bingo</button>
    <button onClick={ handleGoBack} className={styles.good}>Additional</button>
    <button onClick={handleResetAndNavigate} className={styles.add}>New Bingo</button>
    </div>
      </div>
    
    
  </div>
  );
}

export default Card39;