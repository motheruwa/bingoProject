import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card31() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [3, 2, 4, 1, 15],
      I: [20, 29, 19, 16, 18],
      N: [42, 45, 'free', 35, 41],
      G: [49, 52, 53, 55, 54],
      O: [65, 73, 74, 75, 72]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B3', 'B2', 'B4', 'B1', 'B15'], // First row (B)
      ['I20', 'I29', 'I19', 'I16', 'I18'], // Second row (I)
      ['N42', 'N45', 'free', 'N35', 'N41'], // Third row (N)
      ['G49', 'G52', 'G53', 'G55', 'G54'], // Fourth row (G)
      ['O65', 'O73', 'O74', 'O75', 'O72'], // Fifth row (O)
      ['B3', 'I29', 'free', 'G55', 'O72'], // Top-left to bottom-right diagonal
      ['O65', 'G52', 'free', 'I16', 'B15'], // Top-right to bottom-left diagonal
      ['B3', 'I20', 'N42', 'G49', 'O65'], // First column
      ['B2', 'I29', 'N45', 'G52', 'O73'], // Second column
      ['B4', 'I19', 'free', 'G53', 'O74'], // Third column
      ['B1', 'I16', 'N35', 'G55', 'O75'], // Fourth column
      ['B15', 'I18', 'N41', 'G54', 'O72'], // Fifth column
      ['B3', 'B15', 'O65', 'O72'] // corner
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
  winningNumbers.includes('B3') &&
  winningNumbers.includes('B4') &&
  winningNumbers.includes('O71') &&
  winningNumbers.includes('O73');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 31</div>
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

export default Card31;