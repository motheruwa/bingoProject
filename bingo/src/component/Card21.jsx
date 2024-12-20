import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card21() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [4, 9, 15, 5, 1],
      I: [16, 20, 17, 22, 18],
      N: [40, 35, 'free', 34, 33],
      G: [54, 58, 57, 51, 48],
      O: [68, 65, 62, 63, 66]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B4', 'B9', 'B15', 'B5', 'B1'], // First row (B)
      ['I16', 'I20', 'I17', 'I22', 'I18'], // Second row (I)
      ['N40', 'N35', 'free', 'N34', 'N33'], // Third row (N)
      ['G54', 'G58', 'G57', 'G51', 'G48'], // Fourth row (G)
      ['O68', 'O65', 'O62', 'O63', 'O66'], // Fifth row (O)
      ['B4', 'I20', 'free', 'G51', 'O66'], // Top-left to bottom-right diagonal
      ['O68', 'G58', 'free', 'I22', 'B1'], // Top-right to bottom-left diagonal
      ['B4', 'I16', 'N40', 'G54', 'O68'], // First column
      ['B9', 'I20', 'N35', 'G58', 'O65'], // Second column
      ['B15', 'I17', 'free', 'G57', 'O62'], // Third column
      ['B5', 'I22', 'N34', 'G51', 'O63'], // Fourth column
      ['B1', 'I18', 'N33', 'G48', 'O66'], // Fifth column
      ['B4', 'B1', 'O68', 'O66'] // Corner
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
      <div className={styles.cardnumber}>Card Number 21</div>
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

export default Card21;