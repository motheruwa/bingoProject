import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card30() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [8, 11, 9, 6, 13],
      I: [27, 26, 19, 23, 22],
      N: [44, 31, 'free', 41, 40],
      G: [54, 55, 57, 49, 56],
      O: [70, 64, 67, 62, 72]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B8', 'B11', 'B9', 'B6', 'B13'], // First row
        ['I27', 'I26', 'I19', 'I23', 'I22'], // Second row
        ['N44', 'N31', 'free', 'N41', 'N40'], // Third row
        ['G54', 'G55', 'G57', 'G49', 'G56'], // Fourth row
        ['O70', 'O64', 'O67', 'O62', 'O72'], // Fifth row
        ['B8', 'I26', 'free', 'G49', 'O72'], // Top-left to bottom-right diagonal
        ['O70', 'G55', 'free', 'I23', 'B13'], // Top-right to bottom-left diagonal
        ['B8', 'I27', 'N44', 'G54', 'O70'], // First column
        ['B11', 'I26', 'N31', 'G55', 'O64'], // Second column
        ['B9', 'I19', 'free', 'G57', 'O67'], // Third column
        ['B6', 'I23', 'N41', 'G49', 'O62'], // Fourth column
        ['B13', 'I22', 'N40', 'G56', 'O72'], // Fifth column
        ['B8', 'B13', 'O70', 'O72'], // corner
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
  winningNumbers.includes('B8') &&
  winningNumbers.includes('B13') &&
  winningNumbers.includes('O70') &&
  winningNumbers.includes('O72');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 30</div>
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

export default Card30;