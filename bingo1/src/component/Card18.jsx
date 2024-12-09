import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card18() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [7, 14, 1, 3, 4],
      I: [24, 17, 26, 25, 23],
      N: [33, 31, 'free', 32, 45],
      G: [47, 51, 59, 54, 50],
      O: [67, 72, 62, 69, 71]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
       // Rows
  ['B7', 'B14', 'B1', 'B3', 'B4'], // First row (B)
  ['I24', 'I17', 'I26', 'I25', 'I23'], // Second row (I)
  ['N33', 'N31', 'free', 'N32', 'N45'], // Third row (N)
  ['G47', 'G51', 'G59', 'G54', 'G50'], // Fourth row (G)
  ['O67', 'O72', 'O62', 'O69', 'O71'], // Fifth row (O)

  // Columns
  ['B7', 'I24', 'N33', 'G47', 'O67'], // First column
  ['B14', 'I17', 'N31', 'G51', 'O72'], // Second column
  ['B1', 'I26', 'free', 'G59', 'O62'], // Third column
  ['B3', 'I25', 'N32', 'G54', 'O69'], // Fourth column
  ['B4', 'I23', 'N45', 'G50', 'O71'], // Fifth column

  // Diagonals
  ['B7', 'I17', 'free', 'G54', 'O71'], // Top-left to bottom-right diagonal
  ['B4', 'I25', 'free', 'G51', 'O67'], // Top-right to bottom-left diagonal

  // Corners
  ['B7', 'B4', 'O67', 'O71'] // Corners
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
  winningNumbers.includes('O67') &&
  winningNumbers.includes('O71');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 18</div>
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

export default Card18;