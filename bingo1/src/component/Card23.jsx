import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card23() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [11, 3, 5, 10, 4],
      I: [26, 21, 22, 18, 16],
      N: [40, 39, 'free', 35, 31],
      G: [55, 59, 52, 49, 60],
      O: [70, 72, 71, 62, 67]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      // Rows
  ['B11', 'B3', 'B5', 'B10', 'B4'], // First row (B)
  ['I26', 'I21', 'I22', 'I18', 'I16'], // Second row (I)
  ['N40', 'N39', 'free', 'N35', 'N31'], // Third row (N)
  ['G55', 'G59', 'G52', 'G49', 'G60'], // Fourth row (G)
  ['O70', 'O72', 'O71', 'O62', 'O67'], // Fifth row (O)

  // Columns
  ['B11', 'I26', 'N40', 'G55', 'O70'], // First column
  ['B3', 'I21', 'N39', 'G59', 'O72'], // Second column
  ['B5', 'I22', 'free', 'G52', 'O71'], // Third column
  ['B10', 'I18', 'N35', 'G49', 'O62'], // Fourth column
  ['B4', 'I16', 'N31', 'G60', 'O67'], // Fifth column

  // Diagonals
  ['B11', 'I21', 'free', 'G49', 'O67'], // Top-left to bottom-right diagonal
  ['B4', 'I18', 'free', 'G59', 'O70'], // Top-right to bottom-left diagonal

  // Corners
  ['B11', 'B4', 'O70', 'O67'] // Corners
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
  winningNumbers.includes('B4') &&
  winningNumbers.includes('O70') &&
  winningNumbers.includes('O67');

  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 23</div>
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

export default Card23;