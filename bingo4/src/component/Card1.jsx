import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card1() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [15, 11, 12, 3, 10],
      I: [16, 28, 20, 30, 24],
      N: [39, 40, 'free', 35, 37],
      G: [59, 51, 56, 60, 53],
      O: [66, 68, 67, 72, 64]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B15', 'B11', 'B12', 'B3', 'B10'], // First row (B)
    ['I16', 'I28', 'I20', 'I30', 'I24'], // Second row (I)
    ['N39', 'N40', 'free', 'N35', 'N37'], // Third row (N)
    ['G59', 'G51', 'G56', 'G60', 'G53'], // Fourth row (G)
    ['O66', 'O68', 'O67', 'O72', 'O64'], // Fifth row (O)
    ['B15', 'I28', 'free', 'G60', 'O64'], // Top-left to bottom-right diagonal
    ['O66', 'G51', 'free', 'I30', 'B10'], // Top-right to bottom-left diagonal
    ['B15', 'I16', 'N39', 'G59', 'O66'], // First column
    ['B11', 'I28', 'N40', 'G51', 'O68'], // Second column
    ['B12', 'I20', 'free', 'G56', 'O67'], // Third column
    ['B3', 'I30', 'N35', 'G60', 'O72'], // Fourth column
    ['B10', 'I24', 'N37', 'G53', 'O64'], // Fifth column
    ['B15', 'B10', 'O66', 'O64'] // Corner
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
  winningNumbers.includes('B15') &&
  winningNumbers.includes('B10') &&
  winningNumbers.includes('O66') &&
  winningNumbers.includes('O64');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 1</div>
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

export default Card1;