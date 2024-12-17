import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card18() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [13, 7, 10, 8, 14],
      I: [27, 22, 25, 16, 23],
      N: [33, 42, 'free', 43, 38],
      G: [51, 48, 54, 52, 60],
      O: [63, 61, 65, 72, 74]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B13', 'B7', 'B10', 'B8', 'B14'], // First row (B)
        ['I27', 'I22', 'I25', 'I16', 'I23'], // Second row (I)
        ['N33', 'N42', 'free', 'N43', 'N38'], // Third row (N)
        ['G51', 'G48', 'G54', 'G52', 'G60'], // Fourth row (G)
        ['O63', 'O61', 'O65', 'O72', 'O74'], // Fifth row (O)
        ['B13', 'I22', 'free', 'G52', 'O74'], // Top-left to bottom-right diagonal
        ['O63', 'G48', 'free', 'I16', 'B14'], // Top-right to bottom-left diagonal
        ['B13', 'I27', 'N33', 'G51', 'O63'], // First column
        ['B7', 'I22', 'N42', 'G48', 'O61'], // Second column
        ['B10', 'I25', 'free', 'G54', 'O65'], // Third column
        ['B8', 'I16', 'N43', 'G52', 'O72'], // Fourth column
        ['B14', 'I23', 'N38', 'G60', 'O74'], // Fifth column
        ['B13', 'B14', 'O63', 'O74'] // Corner
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
  winningNumbers.includes('B13') &&
  winningNumbers.includes('B14') &&
  winningNumbers.includes('O63') &&
  winningNumbers.includes('O74');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 18</div>
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

export default Card18;