import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card48() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [13, 6, 3, 5, 9],
      I: [30, 22, 18, 23, 16],
      N: [43, 38, 'free', 31, 34],
      G: [59, 47, 46, 55, 48],
      O: [65, 63, 75, 62, 68]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B13', 'B6', 'B3', 'B5', 'B9'], // First row (B)
      ['I30', 'I22', 'I18', 'I23', 'I16'], // Second row (I)
      ['N43', 'N38', 'free', 'N31', 'N34'], // Third row (N)
      ['G59', 'G47', 'G46', 'G55', 'G48'], // Fourth row (G)
      ['O65', 'O63', 'O75', 'O62', 'O68'], // Fifth row (O)
      ['B13', 'I22', 'free', 'G55', 'O68'], // Top-left to bottom-right diagonal
      ['O65', 'G47', 'free', 'I23', 'B9'], // Top-right to bottom-left diagonal
      ['B13', 'I30', 'N43', 'G59', 'O65'], // First column
      ['B6', 'I22', 'N38', 'G47', 'O63'], // Second column
      ['B3', 'I18', 'free', 'G46', 'O75'], // Third column
      ['B5', 'I23', 'N31', 'G55', 'O62'], // Fourth column
      ['B9', 'I16', 'N34', 'G48', 'O68'], // Fifth column
      ['B13', 'B9', 'O65', 'O68'] // corner
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
  winningNumbers.includes('B4') &&
  winningNumbers.includes('B6') &&
  winningNumbers.includes('O61') &&
  winningNumbers.includes('O67');

  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 48</div>
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

export default Card48;