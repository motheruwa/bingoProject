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
      B: [8, 10, 6, 5,15],
      I: [29, 19, 16, 24, 26],
      N: [33, 32, 'free', 41, 43],
      G: [55, 48, 60, 54, 53],
      O: [69, 61, 64, 62, 67]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B8', 'B10', 'B6', 'B5', 'B15'], // First row (B)
      ['I29', 'I19', 'I16', 'I24', 'I26'], // Second row (I)
      ['N33', 'N32', 'free', 'N41', 'N43'], // Third row (N)
      ['G55', 'G48', 'G60', 'G54', 'G53'], // Fourth row (G)
      ['O69', 'O61', 'O64', 'O62', 'O67'], // Fifth row (O)
      ['B8', 'I19', 'free', 'G54', 'O67'], // Top-left to bottom-right diagonal
      ['O69', 'G48', 'free', 'I24', 'B15'], // Top-right to bottom-left diagonal
      ['B8', 'I29', 'N33', 'G55', 'O69'], // First column
      ['B10', 'I19', 'N32', 'G48', 'O61'], // Second column
      ['B6', 'I16', 'free', 'G60', 'O64'], // Third column
      ['B5', 'I24', 'N41', 'G54', 'O62'], // Fourth column
      ['B15', 'I26', 'N43', 'G53', 'O67'], // Fifth column
      ['B8', 'B15', 'O69', 'O67'], // corner
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