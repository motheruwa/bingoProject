import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card28() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [8, 13, 9, 3, 14],
      I: [29, 16, 23, 20, 22],
      N: [40, 35, 'free', 38, 33],
      G: [46, 47, 53, 55, 57],
      O: [66, 62, 68, 64, 75]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B8', 'B13', 'B9', 'B3', 'B14'], // First row (B)
      ['I29', 'I16', 'I23', 'I20', 'I22'], // Second row (I)
      ['N40', 'N35', 'free', 'N38', 'N33'], // Third row (N)
      ['G46', 'G47', 'G53', 'G55', 'G57'], // Fourth row (G)
      ['O66', 'O62', 'O68', 'O64', 'O75'], // Fifth row (O)
      ['B8', 'I16', 'free', 'G55', 'O75'], // Top-left to bottom-right diagonal
      ['O66', 'G47', 'free', 'I20', 'B14'], // Top-right to bottom-left diagonal
      ['B8', 'I29', 'N40', 'G46', 'O66'], // First column
      ['B13', 'I16', 'N35', 'G47', 'O62'], // Second column
      ['B9', 'I23', 'free', 'G53', 'O68'], // Third column
      ['B3', 'I20', 'N38', 'G55', 'O64'], // Fourth column
      ['B14', 'I22', 'N33', 'G57', 'O75'], // Fifth column
      ['B8', 'B14', 'O66', 'O75'] // corner
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
  winningNumbers.includes('B8') &&
  winningNumbers.includes('B15') &&
  winningNumbers.includes('O74') &&
  winningNumbers.includes('O70');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 28</div>
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

export default Card28;