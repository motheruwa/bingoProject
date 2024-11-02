import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card23() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [1, 9, 7, 10, 4],
      I: [30, 27, 21, 24, 17],
      N: [38, 40, 'free', 45, 35],
      G: [53, 55, 58, 49, 48],
      O: [68, 75, 66, 73, 74]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B1', 'B9', 'B7', 'B10', 'B4'], // First row (B)
      ['I30', 'I27', 'I21', 'I24', 'I17'], // Second row (I)
      ['N38', 'N40', 'free', 'N45', 'N35'], // Third row (N)
      ['G53', 'G55', 'G58', 'G49', 'G48'], // Fourth row (G)
      ['O68', 'O75', 'O66', 'O73', 'O74'], // Fifth row (O)
      ['B1', 'I27', 'free', 'G49', 'O74'], // Top-left to bottom-right diagonal
      ['O68', 'G55', 'free', 'I24', 'B4'], // Top-right to bottom-left diagonal
      ['B1', 'I30', 'N38', 'G53', 'O68'], // First column
      ['B9', 'I27', 'N40', 'G55', 'O75'], // Second column
      ['B7', 'I21', 'free', 'G58', 'O66'], // Third column
      ['B10', 'I24', 'N45', 'G49', 'O73'], // Fourth column
      ['B4', 'I17', 'N35', 'G48', 'O74'], // Fifth column
      ['B1', 'B4', 'O68', 'O74'] // Corner
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
      <div className={styles.cardnumber}>Card Number 23</div>
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

export default Card23;