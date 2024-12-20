import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card44() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [1, 7, 14, 6, 5],
      I: [27, 19, 24,30, 26],
      N: [44, 45, 'free', 42, 36],
      G: [53, 52, 51, 56, 57],
      O: [62, 74, 73, 66, 69]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B1', 'B7', 'B14', 'B6', 'B5'], // First row (B)
      ['I27', 'I19', 'I24', 'I30', 'I26'], // Second row (I)
      ['N44', 'N45', 'free', 'N42', 'N36'], // Third row (N)
      ['G53', 'G52', 'G51', 'G56', 'G57'], // Fourth row (G)
      ['O62', 'O74', 'O73', 'O66', 'O69'], // Fifth row (O)
      ['B1', 'I19', 'free', 'G56', 'O69'], // Top-left to bottom-right diagonal
      ['O62', 'G52', 'free', 'I30', 'B5'], // Top-right to bottom-left diagonal
      ['B1', 'I27', 'N44', 'G53', 'O62'], // First column
      ['B7', 'I19', 'N45', 'G52', 'O74'], // Second column
      ['B14', 'I24', 'free', 'G51', 'O73'], // Third column
      ['B6', 'I30', 'N42', 'G56', 'O66'], // Fourth column
      ['B5', 'I26', 'N36', 'G57', 'O69'], // Fifth column
      ['B1', 'B5', 'O62', 'O69'], // corner
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
  winningNumbers.includes('B7') &&
  winningNumbers.includes('O72') &&
  winningNumbers.includes('O68');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 44</div>
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

export default Card44;