import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card38() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [1, 9, 7, 12, 11],
      I: [30, 24, 20, 17, 18],
      N: [45, 42, 'free', 36, 35],
      G: [49, 56, 52, 60, 54],
      O: [66, 69, 74, 62, 63]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B1', 'B9', 'B7', 'B12', 'B11'], // First row
        ['I30', 'I24', 'I20', 'I17', 'I18'], // Second row
        ['N45', 'N42', 'free', 'N36', 'N35'], // Third row
        ['G49', 'G56', 'G52', 'G60', 'G54'], // Fourth row
        ['O66', 'O69', 'O74', 'O62', 'O63'], // Fifth row
        ['B1', 'I24', 'free', 'G60', 'O63'], // Top-left to bottom-right diagonal
        ['O66', 'G56', 'free', 'I17', 'B11'], // Top-right to bottom-left diagonal
        ['B1', 'I30', 'N45', 'G49', 'O66'], // First column
        ['B9', 'I24', 'N42', 'G56', 'O69'], // Second column
        ['B7', 'I20', 'free', 'G52', 'O74'], // Third column
        ['B12', 'I17', 'N36', 'G60', 'O62'], // Fourth column
        ['B11', 'I18', 'N35', 'G54', 'O63'], // Fifth column
        ['B1', 'B11', 'O66', 'O63'], // corner
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
  winningNumbers.includes('B1') &&
  winningNumbers.includes('B11') &&
  winningNumbers.includes('O66') &&
  winningNumbers.includes('O63');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 38</div>
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

export default Card38;