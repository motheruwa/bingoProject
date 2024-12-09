import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card20() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [8,2, 9, 4, 15],
      I: [20, 19, 25, 26, 21],
      N: [32, 39, 'free', 44, 40],
      G: [47, 48, 56, 55, 57],
      O: [61, 74, 62, 64, 72]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      // Rows
  ['B8', 'B2', 'B9', 'B4', 'B15'], // First row (B)
  ['I20', 'I19', 'I25', 'I26', 'I21'], // Second row (I)
  ['N32', 'N39', 'free', 'N44', 'N40'], // Third row (N)
  ['G47', 'G48', 'G56', 'G55', 'G57'], // Fourth row (G)
  ['O61', 'O74', 'O62', 'O64', 'O72'], // Fifth row (O)

  // Columns
  ['B8', 'I20', 'N32', 'G47', 'O61'], // First column
  ['B2', 'I19', 'N39', 'G48', 'O74'], // Second column
  ['B9', 'I25', 'free', 'G56', 'O62'], // Third column
  ['B4', 'I26', 'N44', 'G55', 'O64'], // Fourth column
  ['B15', 'I21', 'N40', 'G57', 'O72'], // Fifth column

  // Diagonals
  ['B8', 'I19', 'free', 'G55', 'O72'], // Top-left to bottom-right diagonal
  ['B15', 'I26', 'free', 'G48', 'O61'], // Top-right to bottom-left diagonal

  // Corners
  ['B8', 'B15', 'O61', 'O72'] // Corners
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
  winningNumbers.includes('B8') &&
  winningNumbers.includes('B15') &&
  winningNumbers.includes('O61') &&
  winningNumbers.includes('O72');

  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 20</div>
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

export default Card20;