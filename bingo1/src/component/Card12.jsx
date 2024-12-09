import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card12() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [11, 4, 12, 9, 6],
      I: [23, 30, 28, 25, 26],
      N: [43, 35, 'free', 45, 41],
      G: [56, 52, 53, 59, 60],
      O: [63, 70, 73, 66, 64]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      // Rows
  ['B11', 'B4', 'B12', 'B9', 'B6'], // First row (B)
  ['I23', 'I30', 'I28', 'I25', 'I26'], // Second row (I)
  ['N43', 'N35', 'free', 'N45', 'N41'], // Third row (N)
  ['G56', 'G52', 'G53', 'G59', 'G60'], // Fourth row (G)
  ['O63', 'O70', 'O73', 'O66', 'O64'], // Fifth row (O)

  // Columns
  ['B11', 'I23', 'N43', 'G56', 'O63'], // First column
  ['B4', 'I30', 'N35', 'G52', 'O70'], // Second column
  ['B12', 'I28', 'free', 'G53', 'O73'], // Third column
  ['B9', 'I25', 'N45', 'G59', 'O66'], // Fourth column
  ['B6', 'I26', 'N41', 'G60', 'O64'], // Fifth column

  // Diagonals
  ['B11', 'I30', 'free', 'G59', 'O64'], // Top-left to bottom-right diagonal
  ['B6', 'I25', 'free', 'G52', 'O63'], // Top-right to bottom-left diagonal

  // Corners
  ['B11', 'B6', 'O63', 'O64'] // Corners
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
  winningNumbers.includes('B11') &&
  winningNumbers.includes('B6') &&
  winningNumbers.includes('O63') &&
  winningNumbers.includes('O64');

  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 12</div>
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

export default Card12;