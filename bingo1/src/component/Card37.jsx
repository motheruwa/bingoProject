import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card37() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [7, 14, 2, 8, 1],
      I: [30, 21, 17, 19, 27],
      N: [37, 32, 'free', 34, 38],
      G: [60, 46, 53, 49, 56],
      O: [61, 62, 74, 75, 63]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B7', 'B14', 'B2', 'B8', 'B1'], // First row (B)
      ['I30', 'I21', 'I17', 'I19', 'I27'], // Second row (I)
      ['N37', 'N32', 'free', 'N34', 'N38'], // Third row (N)
      ['G60', 'G46', 'G53', 'G49', 'G56'], // Fourth row (G)
      ['O61', 'O62', 'O74', 'O75', 'O63'], // Fifth row (O)
      ['B7', 'I21', 'free', 'G49', 'O63'], // Top-left to bottom-right diagonal
      ['O61', 'G46', 'free', 'I19', 'B1'], // Top-right to bottom-left diagonal
      ['B7', 'I30', 'N37', 'G60', 'O61'], // First column
      ['B14', 'I21', 'N32', 'G46', 'O62'], // Second column
      ['B2', 'I17', 'free', 'G53', 'O74'], // Third column
      ['B8', 'I19', 'N34', 'G49', 'O75'], // Fourth column
      ['B1', 'I27', 'N38', 'G56', 'O63'], // Fifth column
      ['B7', 'B1', 'O61', 'O63'] // corner
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
  winningNumbers.includes('B15') &&
  winningNumbers.includes('O65') &&
  winningNumbers.includes('O72');

  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 37</div>
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

export default Card37;