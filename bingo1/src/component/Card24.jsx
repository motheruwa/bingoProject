import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card24() {
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
      B: [4, 1, 8, 10, 3],
      I: [26, 21, 17, 28, 18],
      N: [34, 37, 'free', 43, 41],
      G: [50, 48, 57, 49, 55],
      O: [74, 66, 70, 68, 61]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      // Rows
  ['B4', 'B1', 'B8', 'B10', 'B3'], // First row (B)
  ['I26', 'I21', 'I17', 'I28', 'I18'], // Second row (I)
  ['N34', 'N37', 'free', 'N43', 'N41'], // Third row (N)
  ['G50', 'G48', 'G57', 'G49', 'G55'], // Fourth row (G)
  ['O74', 'O66', 'O70', 'O68', 'O61'], // Fifth row (O)

  // Columns
  ['B4', 'I26', 'N34', 'G50', 'O74'], // First column
  ['B1', 'I21', 'N37', 'G48', 'O66'], // Second column
  ['B8', 'I17', 'free', 'G57', 'O70'], // Third column
  ['B10', 'I28', 'N43', 'G49', 'O68'], // Fourth column
  ['B3', 'I18', 'N41', 'G55', 'O61'], // Fifth column

  // Diagonals
  ['B4', 'I21', 'free', 'G49', 'O61'], // Top-left to bottom-right diagonal
  ['B3', 'I28', 'free', 'G48', 'O74'], // Top-right to bottom-left diagonal

  // Corners
  ['B4', 'B3', 'O74', 'O61'] // Corners
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
  winningNumbers.includes('B4') &&
  winningNumbers.includes('B3') &&
  winningNumbers.includes('O74') &&
  winningNumbers.includes('O61');

  return (
    <div className={styles.container}>
    <div className={styles.current11}>
        <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
          <h3>{currentNumber}</h3>
        </div>
      </div>
      <div className={styles.cont}>
      <div className={styles.cardnumber}>Card Number 24</div>
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

export default Card24;