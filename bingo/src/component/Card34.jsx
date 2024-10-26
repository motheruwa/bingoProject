import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card34() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [4, 8, 9, 11, 3],
      I: [17, 29, 24, 27, 22],
      N: [31, 37, 'free', 34, 36],
      G: [46, 57, 59, 55, 48],
      O: [70, 65, 67, 63, 73]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B4', 'B8', 'B9', 'B11', 'B3'], // First row
        ['I17', 'I29', 'I24', 'I27', 'I22'], // Second row
        ['N31', 'N37', 'free', 'N34', 'N36'], // Third row
        ['G46', 'G57', 'G59', 'G55', 'G48'], // Fourth row
        ['O70', 'O65', 'O67', 'O63', 'O73'], // Fifth row
        ['B4', 'I29', 'free', 'G55', 'O73'], // Top-left to bottom-right diagonal
        ['O70', 'G57', 'free', 'I27', 'B3'], // Top-right to bottom-left diagonal
        ['B4', 'I17', 'N31', 'G46', 'O70'], // First column
        ['B8', 'I29', 'N37', 'G57', 'O65'], // Second column
        ['B9', 'I24', 'free', 'G59', 'O67'], // Third column
        ['B11', 'I27', 'N34', 'G55', 'O63'], // Fourth column
        ['B3', 'I22', 'N36', 'G48', 'O73'], // Fifth column
        ['B4', 'B3', 'O70', 'O73'], // corner
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
  winningNumbers.includes('B3') &&
  winningNumbers.includes('O70') &&
  winningNumbers.includes('O73');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 34</div>
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

export default Card34;