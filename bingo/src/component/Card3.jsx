import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card3() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [5, 7, 12, 8, 3],
      I: [16, 27, 18, 22, 28],
      N: [39, 33, 'free', 34, 40],
      G: [59, 54, 56, 60, 51],
      O: [65, 64, 63, 74, 71]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B5', 'B7', 'B12', 'B8', 'B3'], // First row (B)
      ['I16', 'I27', 'I18', 'I22', 'I28'], // Second row (I)
      ['N39', 'N33', 'free', 'N34', 'N40'], // Third row (N)
      ['G59', 'G54', 'G56', 'G60', 'G51'], // Fourth row (G)
      ['O65', 'O64', 'O63', 'O74', 'O71'], // Fifth row (O)
      ['B5', 'I27', 'free', 'G60', 'O71'], // Top-left to bottom-right diagonal
      ['O65', 'G54', 'free', 'I22', 'B3'], // Top-right to bottom-left diagonal
      ['B5', 'I16', 'N39', 'G59', 'O65'], // First column
      ['B7', 'I27', 'N33', 'G54', 'O64'], // Second column
      ['B12', 'I18', 'free', 'G56', 'O63'], // Third column
      ['B8', 'I22', 'N34', 'G60', 'O74'], // Fourth column
      ['B3', 'I28', 'N40', 'G51', 'O71'], // Fifth column
      ['B5', 'B3', 'O65', 'O71'] // Corner
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
  winningNumbers.includes('B3') &&
  winningNumbers.includes('O65') &&
  winningNumbers.includes('O67');
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
      <button onClick={playWinSound} className={styles.good}>Good Bingo</button>
      <button onClick={playNotwinSound} className={styles.add}>Not Bingo</button>
      <button onClick={ handleGoBack} className={styles.good}>Additional</button>
      <button onClick={handleResetAndNavigate} className={styles.add}>New Bingo</button>
      </div>
      
    </div>
  );
}

export default Card3;