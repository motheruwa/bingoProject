import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card22() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [7, 5, 10, 2, 4],
      I: [25, 17, 27, 21, 20],
      N: [44, 40, 'free', 35, 38],
      G: [50, 58, 47, 57, 49],
      O: [75, 64, 70, 72, 63]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      // Rows
  ['B7', 'B5', 'B10', 'B2', 'B4'], // First row (B)
  ['I25', 'I17', 'I27', 'I21', 'I20'], // Second row (I)
  ['N44', 'N40', 'free', 'N35', 'N38'], // Third row (N)
  ['G50', 'G58', 'G47', 'G57', 'G49'], // Fourth row (G)
  ['O75', 'O64', 'O70', 'O72', 'O63'], // Fifth row (O)

  // Columns
  ['B7', 'I25', 'N44', 'G50', 'O75'], // First column
  ['B5', 'I17', 'N40', 'G58', 'O64'], // Second column
  ['B10', 'I27', 'free', 'G47', 'O70'], // Third column
  ['B2', 'I21', 'N35', 'G57', 'O72'], // Fourth column
  ['B4', 'I20', 'N38', 'G49', 'O63'], // Fifth column

  // Diagonals
  ['B7', 'I17', 'free', 'G57', 'O63'], // Top-left to bottom-right diagonal
  ['B4', 'I21', 'free', 'G58', 'O75'], // Top-right to bottom-left diagonal

  // Corners
  ['B7', 'B4', 'O75', 'O63'] // Corners
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
  winningNumbers.includes('B7') &&
  winningNumbers.includes('B4') &&
  winningNumbers.includes('O75') &&
  winningNumbers.includes('O63');

  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 22</div>
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

export default Card22;