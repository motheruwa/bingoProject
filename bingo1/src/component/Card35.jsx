import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card35() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [2, 12, 5, 11, 3],
      I: [20, 22, 23, 24, 27],
      N: [31, 40, 'free', 41, 39],
      G: [55, 54, 59, 53, 47],
      O: [66, 70, 73, 75, 63]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B2', 'B12', 'B5', 'B11', 'B3'], // First row (B)
      ['I20', 'I22', 'I23', 'I24', 'I27'], // Second row (I)
      ['N31', 'N40', 'free', 'N41', 'N39'], // Third row (N)
      ['G55', 'G54', 'G59', 'G53', 'G47'], // Fourth row (G)
      ['O66', 'O70', 'O73', 'O75', 'O63'], // Fifth row (O)
      ['B2', 'I22', 'free', 'G53', 'O63'], // Top-left to bottom-right diagonal
      ['O66', 'G54', 'free', 'I24', 'B3'], // Top-right to bottom-left diagonal
      ['B2', 'I20', 'N31', 'G55', 'O66'], // First column
      ['B12', 'I22', 'N40', 'G54', 'O70'], // Second column
      ['B5', 'I23', 'free', 'G59', 'O73'], // Third column
      ['B11', 'I24', 'N41', 'G53', 'O75'], // Fourth column
      ['B3', 'I27', 'N39', 'G47', 'O63'], // Fifth column
      ['B2', 'B3', 'O66', 'O63'] // corner
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
  winningNumbers.includes('B9') &&
  winningNumbers.includes('B4') &&
  winningNumbers.includes('O72') &&
  winningNumbers.includes('O70');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 35</div>
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

export default Card35;