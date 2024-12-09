import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card9() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [4, 12, 15, 10, 5],
      I: [24, 25, 22, 16, 21],
      N: [41,40, 'free', 43, 39],
      G: [53, 48, 59, 56, 51],
      O: [72, 68, 62, 63, 71]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      // Rows
  ['B4', 'B12', 'B15', 'B10', 'B5'], // First row (B)
  ['I24', 'I25', 'I22', 'I16', 'I21'], // Second row (I)
  ['N41', 'N40', 'free', 'N43', 'N39'], // Third row (N)
  ['G53', 'G48', 'G59', 'G56', 'G51'], // Fourth row (G)
  ['O72', 'O68', 'O62', 'O63', 'O71'], // Fifth row (O)

  // Columns
  ['B4', 'I24', 'N41', 'G53', 'O72'], // First column
  ['B12', 'I25', 'N40', 'G48', 'O68'], // Second column
  ['B15', 'I22', 'free', 'G59', 'O62'], // Third column
  ['B10', 'I16', 'N43', 'G56', 'O63'], // Fourth column
  ['B5', 'I21', 'N39', 'G51', 'O71'], // Fifth column

  // Diagonals
  ['B4', 'I25', 'free', 'G56', 'O71'], // Top-left to bottom-right diagonal
  ['B5', 'I16', 'free', 'G48', 'O72'], // Top-right to bottom-left diagonal

  // Corners
  ['B4', 'B5', 'O72', 'O71'] // Corners
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
  winningNumbers.includes('B5') &&
  winningNumbers.includes('O72') &&
  winningNumbers.includes('O71');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 9</div>
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

export default Card9;