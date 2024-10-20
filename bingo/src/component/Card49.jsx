import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card49() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [1, 3, 10, 8, 6],
      I: [21, 29, 24, 26, 19],
      N: [34, 41, 'free', 35, 31],
      G: [52, 54, 57, 53, 58],
      O: [67, 69, 70, 72, 64]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B1', 'B3', 'B10', 'B8', 'B6'], // First row
        ['I21', 'I29', 'I24', 'I26', 'I19'], // Second row
        ['N34', 'N41', 'free', 'N35', 'N31'], // Third row
        ['G52', 'G54', 'G57', 'G53', 'G58'], // Fourth row
        ['O67', 'O69', 'O70', 'O72', 'O64'], // Fifth row
        ['B1', 'I29', 'free', 'G53', 'O64'], // Top-left to bottom-right diagonal
        ['O67', 'G54', 'free', 'I26', 'B6'], // Top-right to bottom-left diagonal
        ['B1', 'I21', 'N34', 'G52', 'O67'], // First column
        ['B3', 'I29', 'N41', 'G54', 'O69'], // Second column
        ['B10', 'I24', 'free', 'G57', 'O70'], // Third column
        ['B8', 'I26', 'N35', 'G53', 'O72'], // Fourth column
        ['B6', 'I19', 'N31', 'G58', 'O64'], // Fifth column
        ['B1', 'B6', 'O67', 'O64'], // corner
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
  winningNumbers.includes('B1') &&
  winningNumbers.includes('B6') &&
  winningNumbers.includes('O67') &&
  winningNumbers.includes('O64');

  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 49</div>
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

export default Card49;