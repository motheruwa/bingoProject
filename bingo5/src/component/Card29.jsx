import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card29() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [1, 15, 11, 4, 12],
      I: [17, 16, 25, 26, 27],
      N: [43, 45, 'free', 31, 33],
      G: [46, 55, 48, 54, 53],
      O: [74, 62, 67, 70, 75]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B1', 'B15', 'B11', 'B4', 'B12'], // First row (B)
      ['I17', 'I16', 'I25', 'I26', 'I27'], // Second row (I)
      ['N43', 'N45', 'free', 'N31', 'N33'], // Third row (N)
      ['G46', 'G55', 'G48', 'G54', 'G53'], // Fourth row (G)
      ['O74', 'O62', 'O67', 'O70', 'O75'], // Fifth row (O)
      ['B1', 'I16', 'free', 'G54', 'O75'], // Top-left to bottom-right diagonal
      ['O74', 'G55', 'free', 'I26', 'B12'], // Top-right to bottom-left diagonal
      ['B1', 'I17', 'N43', 'G46', 'O74'], // First column
      ['B15', 'I16', 'N45', 'G55', 'O62'], // Second column
      ['B11', 'I25', 'free', 'G48', 'O67'], // Third column
      ['B4', 'I26', 'N31', 'G54', 'O70'], // Fourth column
      ['B12', 'I27', 'N33', 'G53', 'O75'], // Fifth column
      ['B1', 'B12', 'O74', 'O75'] // corner
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
  winningNumbers.includes('B14') &&
  winningNumbers.includes('B1') &&
  winningNumbers.includes('O74') &&
  winningNumbers.includes('O64');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 29</div>
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

export default Card29;