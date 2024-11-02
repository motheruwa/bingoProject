import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card39() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [14, 6, 1, 4, 12],
      I: [23, 16, 21, 26, 17],
      N: [38, 36, 'free', 32, 31],
      G: [46, 58, 60, 54, 47],
      O: [68, 71, 67, 64, 62]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B14', 'B6', 'B1', 'B4', 'B12'], // First row (B)
      ['I23', 'I16', 'I21', 'I26', 'I17'], // Second row (I)
      ['N38', 'N36', 'free', 'N32', 'N31'], // Third row (N)
      ['G46', 'G58', 'G60', 'G54', 'G47'], // Fourth row (G)
      ['O68', 'O71', 'O67', 'O64', 'O62'], // Fifth row (O)
      ['B14', 'I16', 'free', 'G54', 'O62'], // Top-left to bottom-right diagonal
      ['O68', 'G58', 'free', 'I26', 'B12'], // Top-right to bottom-left diagonal
      ['B14', 'I23', 'N38', 'G46', 'O68'], // First column
      ['B6', 'I16', 'N36', 'G58', 'O71'], // Second column
      ['B1', 'I21', 'free', 'G60', 'O67'], // Third column
      ['B4', 'I26', 'N32', 'G54', 'O64'], // Fourth column
      ['B12', 'I17', 'N31', 'G47', 'O62'], // Fifth column
      ['B14', 'B12', 'O68', 'O62'] // corner
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
  winningNumbers.includes('B10') &&
  winningNumbers.includes('B13') &&
  winningNumbers.includes('O61') &&
  winningNumbers.includes('O68');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 39</div>
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

export default Card39;