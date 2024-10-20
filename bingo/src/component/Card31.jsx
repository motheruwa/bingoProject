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
      B: [3, 9, 5, 12, 4],
      I: [27, 24, 17, 18, 25],
      N: [31, 40, 'free', 38, 36],
      G: [46, 48, 55, 58, 54],
      O: [71, 67, 62, 68, 73]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B3', 'B9', 'B5', 'B12', 'B4'], // First row
        ['I27', 'I24', 'I17', 'I18', 'I25'], // Second row
        ['N31', 'N40', 'free', 'N38', 'N36'], // Third row
        ['G46', 'G48', 'G55', 'G58', 'G54'], // Fourth row
        ['O71', 'O67', 'O62', 'O68', 'O73'], // Fifth row
        ['B3', 'I24', 'free', 'G58', 'O73'], // Top-left to bottom-right diagonal
        ['O71', 'G48', 'free', 'I18', 'B4'], // Top-right to bottom-left diagonal
        ['B3', 'I27', 'N31', 'G46', 'O71'], // First column
        ['B9', 'I24', 'N40', 'G48', 'O67'], // Second column
        ['B5', 'I17', 'free', 'G55', 'O62'], // Third column
        ['B12', 'I18', 'N38', 'G58', 'O68'], // Fourth column
        ['B4', 'I25', 'N36', 'G54', 'O73'], // Fifth column
        ['B3', 'B4', 'O71', 'O73'], // corner
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