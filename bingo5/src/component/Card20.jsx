import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card20() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [9, 8, 4, 11, 1],
      I: [19, 23, 24, 17, 26],
      N: [35, 43, 'free', 32, 38],
      G: [54, 57, 58, 50, 49],
      O: [73, 61, 68, 62, 75]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B9', 'B8', 'B4', 'B11', 'B1'], // First row (B)
        ['I19', 'I23', 'I24', 'I17', 'I26'], // Second row (I)
        ['N35', 'N43', 'free', 'N32', 'N38'], // Third row (N)
        ['G54', 'G57', 'G58', 'G50', 'G49'], // Fourth row (G)
        ['O73', 'O61', 'O68', 'O62', 'O75'], // Fifth row (O)
        ['B9', 'I23', 'free', 'G50', 'O75'], // Top-left to bottom-right diagonal
        ['O73', 'G57', 'free', 'I17', 'B1'], // Top-right to bottom-left diagonal
        ['B9', 'I19', 'N35', 'G54', 'O73'], // First column
        ['B8', 'I23', 'N43', 'G57', 'O61'], // Second column
        ['B4', 'I24', 'free', 'G58', 'O68'], // Third column
        ['B11', 'I17', 'N32', 'G50', 'O62'], // Fourth column
        ['B1', 'I26', 'N38', 'G49', 'O75'], // Fifth column
        ['B9', 'B1', 'O73', 'O75'] // Corner
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
  winningNumbers.includes('B9') &&
  winningNumbers.includes('B1') &&
  winningNumbers.includes('O73') &&
  winningNumbers.includes('O75');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 20</div>
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

export default Card20;