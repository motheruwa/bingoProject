import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';

function Card3() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();

  const generateBingoCard = () => {
    const bingoCard = {
      B: [4, 7, 14, 5, 9],
      I: [29, 23, 18, 21, 17],
      N: [36, 40, 'free', 43, 37],
      G: [52, 55, 58, 54,59],
      O: [64, 73, 61, 69, 72]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
    // Rows
  ['B4', 'B7', 'B14', 'B5', 'B9'], // First row (B)
  ['I29', 'I23', 'I18', 'I21', 'I17'], // Second row (I)
  ['N36', 'N40', 'free', 'N43', 'N37'], // Third row (N)
  ['G52', 'G55', 'G58', 'G54', 'G59'], // Fourth row (G)
  ['O64', 'O73', 'O61', 'O69', 'O72'], // Fifth row (O)

  // Columns
  ['B4', 'I29', 'N36', 'G52', 'O64'], // First column
  ['B7', 'I23', 'N40', 'G55', 'O73'], // Second column
  ['B14', 'I18', 'free', 'G58', 'O61'], // Third column
  ['B5', 'I21', 'N43', 'G54', 'O69'], // Fourth column
  ['B9', 'I17', 'N37', 'G59', 'O72'], // Fifth column

  // Diagonals
  ['B4', 'I23', 'free', 'G54', 'O72'], // Top-left to bottom-right diagonal
  ['B9', 'I21', 'free', 'G55', 'O64'], // Top-right to bottom-left diagonal

  // Corners
  ['B4', 'B9', 'O64', 'O72'] // Corners
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
  winningNumbers.includes('B9') &&
  winningNumbers.includes('O64') &&
  winningNumbers.includes('O72');
  
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 3</div>
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
        <button onClick={playWinSound} className={styles.good}>
          Good Bingo
        </button>
        <button onClick={playNotwinSound} className={styles.add}>
          Not Bingo
        </button>
        <button onClick={handleGoBack} className={styles.good}>
          Additional
        </button>
        <button onClick={handleResetAndNavigate} className={styles.add}>
          New Bingo
        </button>
      </div>
    </div>
  );
}

export default Card3;