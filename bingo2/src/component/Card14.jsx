import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card14() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [5, 1, 7, 2, 10],
      I: [18, 27, 28, 21, 24],
      N: [45, 42, 'free', 43, 32],
      G: [58, 50, 54, 60, 51],
      O: [67, 65, 64, 74, 71]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B5', 'B1', 'B7', 'B2', 'B10'], // First row (B)
    ['I18', 'I27', 'I28', 'I21', 'I24'], // Second row (I)
    ['N45', 'N42', 'free', 'N43', 'N32'], // Third row (N)
    ['G58', 'G50', 'G54', 'G60', 'G51'], // Fourth row (G)
    ['O67', 'O65', 'O64', 'O74', 'O71'], // Fifth row (O)
    ['B5', 'I27', 'free', 'G60', 'O71'], // Top-left to bottom-right diagonal
    ['O67', 'G50', 'free', 'I21', 'B10'], // Top-right to bottom-left diagonal
    ['B5', 'I18', 'N45', 'G58', 'O67'], // First column
    ['B1', 'I27', 'N42', 'G50', 'O65'], // Second column
    ['B7', 'I28', 'free', 'G54', 'O64'], // Third column
    ['B2', 'I21', 'N43', 'G60', 'O74'], // Fourth column
    ['B10', 'I24', 'N32', 'G51', 'O71'], // Fifth column
    ['B5', 'B10', 'O67', 'O71'] // Corner
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
  winningNumbers.includes('B10') &&
  winningNumbers.includes('O67') &&
  winningNumbers.includes('O71');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 14</div>
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
  );
}

export default Card14;