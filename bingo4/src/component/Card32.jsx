import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css';
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';

function Card32() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();

  const generateBingoCard = () => {
    const bingoCard = {
      B: [10, 15, 9, 5, 14],
      I: [20, 28, 24, 25, 23],
      N: [32, 34, 'free', 37, 31],
      G: [58, 56, 50, 46, 51],
      O: [73, 61, 75, 67, 65]
    };

    bingoCard.N[2] = 'free'; // Set the center cell as a free space

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B10', 'B15', 'B9', 'B5', 'B14'], // First row
      ['I20', 'I28', 'I24', 'I25', 'I23'], // Second row
      ['N32', 'N34', 'free', 'N37', 'N31'], // Third row
      ['G58', 'G56', 'G50', 'G46', 'G51'], // Fourth row
      ['O73', 'O61', 'O75', 'O67', 'O65'], // Fifth row
      ['B10', 'I28', 'free', 'G46', 'O65'], // Top-left to bottom-right diagonal
      ['O73', 'G56', 'free', 'I25', 'B14'], // Top-right to bottom-left diagonal
      ['B10', 'I20', 'N32', 'G58', 'O73'], // First column
      ['B15', 'I28', 'N34', 'G56', 'O61'], // Second column
      ['B9', 'I24', 'free', 'G50', 'O75'], // Third column
      ['B5', 'I25', 'N37', 'G46', 'O67'], // Fourth column
      ['B14', 'I23', 'N31', 'G51', 'O65'], // Fifth column
      ['B10', 'B14', 'O73', 'O65'], // Corner
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
  winningNumbers.includes('B10') &&
  winningNumbers.includes('B14') &&
  winningNumbers.includes('O73') &&
  winningNumbers.includes('O65');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 32</div>
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
        <button onClick={handleGoBack} className={styles.good}>Additional</button>
        <button onClick={handleResetAndNavigate} className={styles.add}>New Bingo</button>
      </div>
    </div>
  );
}

export default Card32;