import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card42() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [8, 10, 15, 13, 3],
      I: [21, 23, 18, 29, 25],
      N: [44, 33, 'free', 35, 38],
      G: [54, 53, 49, 52, 48],
      O: [75, 63, 67, 74, 69]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B8', 'B10', 'B15', 'B13', 'B3'], // First row (B)
      ['I21', 'I23', 'I18', 'I29', 'I25'], // Second row (I)
      ['N44', 'N33', 'free', 'N35', 'N38'], // Third row (N)
      ['G54', 'G53', 'G49', 'G52', 'G48'], // Fourth row (G)
      ['O75', 'O63', 'O67', 'O74', 'O69'], // Fifth row (O)
      ['B8', 'I23', 'free', 'G52', 'O69'], // Top-left to bottom-right diagonal
      ['O75', 'G53', 'free', 'I29', 'B3'], // Top-right to bottom-left diagonal
      ['B8', 'I21', 'N44', 'G54', 'O75'], // First column
      ['B10', 'I23', 'N33', 'G53', 'O63'], // Second column
      ['B15', 'I18', 'free', 'G49', 'O67'], // Third column
      ['B13', 'I29', 'N35', 'G52', 'O74'], // Fourth column
      ['B3', 'I25', 'N38', 'G48', 'O69'], // Fifth column
      ['B8', 'B3', 'O75', 'O69'] // corner
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
  winningNumbers.includes('B2') &&
  winningNumbers.includes('O75') &&
  winningNumbers.includes('O64');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 42</div>
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

export default Card42;