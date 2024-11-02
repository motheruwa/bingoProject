import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card17() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [4, 7, 13, 10, 8],
      I: [26, 25, 23, 29, 18],
      N: [41, 39, 'free', 38, 34],
      G: [48, 55, 53, 59, 56],
      O: [74, 64, 69, 67, 73]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B4', 'B7', 'B13', 'B10', 'B8'], // First row (B)
      ['I26', 'I25', 'I23', 'I29', 'I18'], // Second row (I)
      ['N41', 'N39', 'free', 'N38', 'N34'], // Third row (N)
      ['G48', 'G55', 'G53', 'G59', 'G56'], // Fourth row (G)
      ['O74', 'O64', 'O69', 'O67', 'O73'], // Fifth row (O)
      ['B4', 'I25', 'free', 'G59', 'O73'], // Top-left to bottom-right diagonal
      ['O74', 'G55', 'free', 'I29', 'B8'], // Top-right to bottom-left diagonal
      ['B4', 'I26', 'N41', 'G48', 'O74'], // First column
      ['B7', 'I25', 'N39', 'G55', 'O64'], // Second column
      ['B13', 'I23', 'free', 'G53', 'O69'], // Third column
      ['B10', 'I29', 'N38', 'G59', 'O67'], // Fourth column
      ['B8', 'I18', 'N34', 'G56', 'O73'], // Fifth column
      ['B4', 'B8', 'O74', 'O73'] // Corner
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
      <div className={styles.cardnumber}>Card Number 17</div>
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

export default Card17;