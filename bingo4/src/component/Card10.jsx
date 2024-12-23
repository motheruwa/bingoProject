import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card10() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [1, 13, 6, 7, 2],
      I: [20, 18, 27, 23, 29],
      N: [34, 40, 'free', 37, 44],
      G: [58, 59, 52, 48, 57],
      O: [75, 69, 67, 70, 73]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B1', 'B13', 'B6', 'B7', 'B2'], // First row (B)
    ['I20', 'I18', 'I27', 'I23', 'I29'], // Second row (I)
    ['N34', 'N40', 'free', 'N37', 'N44'], // Third row (N)
    ['G58', 'G59', 'G52', 'G48', 'G57'], // Fourth row (G)
    ['O75', 'O69', 'O67', 'O70', 'O73'], // Fifth row (O)
    ['B1', 'I18', 'free', 'G48', 'O73'], // Top-left to bottom-right diagonal
    ['O75', 'G59', 'free', 'I23', 'B2'], // Top-right to bottom-left diagonal
    ['B1', 'I20', 'N34', 'G58', 'O75'], // First column
    ['B13', 'I18', 'N40', 'G59', 'O69'], // Second column
    ['B6', 'I27', 'free', 'G52', 'O67'], // Third column
    ['B7', 'I23', 'N37', 'G48', 'O70'], // Fourth column
    ['B2', 'I29', 'N44', 'G57', 'O73'], // Fifth column
    ['B1', 'B2', 'O75', 'O73'] // Corner
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
  winningNumbers.includes('B1') &&
  winningNumbers.includes('B2') &&
  winningNumbers.includes('O75') &&
  winningNumbers.includes('O73');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 10</div>
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

export default Card10;