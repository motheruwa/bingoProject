import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card16() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [7, 3, 12, 4, 13],
      I: [23, 27, 21, 24, 17],
      N: [45, 42, 'free', 41, 44],
      G: [55, 60, 57, 49, 50],
      O: [62, 71, 66, 68, 75]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B7', 'B3', 'B12', 'B4', 'B13'], // First row (B)
    ['I23', 'I27', 'I21', 'I24', 'I17'], // Second row (I)
    ['N45', 'N42', 'free', 'N41', 'N44'], // Third row (N)
    ['G55', 'G60', 'G57', 'G49', 'G50'], // Fourth row (G)
    ['O62', 'O71', 'O66', 'O68', 'O75'], // Fifth row (O)
    ['B7', 'I27', 'free', 'G49', 'O75'], // Top-left to bottom-right diagonal
    ['O62', 'G60', 'free', 'I24', 'B13'], // Top-right to bottom-left diagonal
    ['B7', 'I23', 'N45', 'G55', 'O62'], // First column
    ['B3', 'I27', 'N42', 'G60', 'O71'], // Second column
    ['B12', 'I21', 'free', 'G57', 'O66'], // Third column
    ['B4', 'I24', 'N41', 'G49', 'O68'], // Fourth column
    ['B13', 'I17', 'N44', 'G50', 'O75'], // Fifth column
    ['B7', 'B13', 'O62', 'O75'] // Corner
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
    localStorage.removeItem('sequenceIndex');

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
  winningNumbers.includes('B13') &&
  winningNumbers.includes('O62') &&
  winningNumbers.includes('O75');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 16</div>
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

export default Card16;