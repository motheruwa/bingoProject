import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';

function Card30() {
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
      B: [5, 1, 6, 11, 8],
      I: [22, 26, 18, 19, 29],
      N: [42, 44, 'free', 36, 40],
      G: [57, 52, 49, 48,51],
      O: [71, 62, 74, 75, 68]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
    // Rows
  ['B5', 'B1', 'B6', 'B11', 'B8'], // First row (B)
  ['I22', 'I26', 'I18', 'I19', 'I29'], // Second row (I)
  ['N42', 'N44', 'free', 'N36', 'N40'], // Third row (N)
  ['G57', 'G52', 'G49', 'G48', 'G51'], // Fourth row (G)
  ['O71', 'O62', 'O74', 'O75', 'O68'], // Fifth row (O)

  // Columns
  ['B5', 'I22', 'N42', 'G57', 'O71'], // First column
  ['B1', 'I26', 'N44', 'G52', 'O62'], // Second column
  ['B6', 'I18', 'free', 'G49', 'O74'], // Third column
  ['B11', 'I19', 'N36', 'G48', 'O75'], // Fourth column
  ['B8', 'I29', 'N40', 'G51', 'O68'], // Fifth column

  // Diagonals
  ['B5', 'I26', 'free', 'G48', 'O68'], // Top-left to bottom-right diagonal
  ['B8', 'I19', 'free', 'G52', 'O71'], // Top-right to bottom-left diagonal

  // Corners
  ['B5', 'B8', 'O71', 'O68'] // Corners
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
  winningNumbers.includes('B5') &&
  winningNumbers.includes('B8') &&
  winningNumbers.includes('O71') &&
  winningNumbers.includes('O68');
  
  return (
    <div className={styles.container}>
    <div className={styles.current11}>
        <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
          <h3>{currentNumber}</h3>
        </div>
      </div>
      <div className={styles.cont}>
      <div className={styles.cardnumber}>Card Number 30</div>
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

export default Card30;