import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card43() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [5, 2, 13, 15, 4],
      I: [28, 17, 27, 19, 21],
      N: [33, 40, 'free', 42, 35],
      G: [56, 53, 54, 51, 48],
      O: [69, 72, 60, 73, 75]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B5', 'B2', 'B13', 'B15', 'B4'], // First row (B)
      ['I28', 'I17', 'I27', 'I19', 'I21'], // Second row (I)
      ['N33', 'N40', 'free', 'N42', 'N35'], // Third row (N)
      ['G56', 'G53', 'G54', 'G51', 'G48'], // Fourth row (G)
      ['O69', 'O72', 'O60', 'O73', 'O75'], // Fifth row (O)
      ['B5', 'I17', 'free', 'G51', 'O75'], // Top-left to bottom-right diagonal
      ['O69', 'G53', 'free', 'I19', 'B4'], // Top-right to bottom-left diagonal
      ['B5', 'I28', 'N33', 'G56', 'O69'], // First column
      ['B2', 'I17', 'N40', 'G53', 'O72'], // Second column
      ['B13', 'I27', 'free', 'G54', 'O60'], // Third column
      ['B15', 'I19', 'N42', 'G51', 'O73'], // Fourth column
      ['B4', 'I21', 'N35', 'G48', 'O75'], // Fifth column
      ['B5', 'B4', 'O69', 'O75'] // corner
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
  winningNumbers.includes('B15') &&
  winningNumbers.includes('B7') &&
  winningNumbers.includes('O69') &&
  winningNumbers.includes('O72');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 43</div>
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

export default Card43;