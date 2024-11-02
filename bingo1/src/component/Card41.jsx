import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card41() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [12, 8, 5, 3, 1],
      I: [17, 28, 18, 24, 23],
      N: [38, 37, 'free', 40, 35],
      G: [50, 48, 57, 60, 47],
      O: [75, 61, 70, 64, 74]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B12', 'B8', 'B5', 'B3', 'B1'], // First row (B)
      ['I17', 'I28', 'I18', 'I24', 'I23'], // Second row (I)
      ['N38', 'N37', 'free', 'N40', 'N35'], // Third row (N)
      ['G50', 'G48', 'G57', 'G60', 'G47'], // Fourth row (G)
      ['O75', 'O61', 'O70', 'O64', 'O74'], // Fifth row (O)
      ['B12', 'I28', 'free', 'G60', 'O74'], // Top-left to bottom-right diagonal
      ['O75', 'G48', 'free', 'I24', 'B1'], // Top-right to bottom-left diagonal
      ['B12', 'I17', 'N38', 'G50', 'O75'], // First column
      ['B8', 'I28', 'N37', 'G48', 'O61'], // Second column
      ['B5', 'I18', 'free', 'G57', 'O70'], // Third column
      ['B3', 'I24', 'N40', 'G60', 'O64'], // Fourth column
      ['B1', 'I23', 'N35', 'G47', 'O74'], // Fifth column
      ['B12', 'B1', 'O75', 'O74'] // corner
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
  winningNumbers.includes('B5') &&
  winningNumbers.includes('B6') &&
  winningNumbers.includes('O62') &&
  winningNumbers.includes('O71');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 41</div>
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

export default Card41;