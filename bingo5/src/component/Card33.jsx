import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card33() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [2, 14, 5, 3, 15],
      I: [19, 28, 29, 23, 27],
      N: [33, 34, 'free', 35, 37],
      G: [48, 54, 57, 46, 49],
      O: [62, 63, 65, 69, 66]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B2', 'B14', 'B5', 'B3', 'B15'], // First row (B)
      ['I19', 'I28', 'I29', 'I23', 'I27'], // Second row (I)
      ['N33', 'N34', 'free', 'N35', 'N37'], // Third row (N)
      ['G48', 'G54', 'G57', 'G46', 'G49'], // Fourth row (G)
      ['O62', 'O63', 'O65', 'O69', 'O66'], // Fifth row (O)
      ['B2', 'I28', 'free', 'G46', 'O66'], // Top-left to bottom-right diagonal
      ['O62', 'G54', 'free', 'I23', 'B15'], // Top-right to bottom-left diagonal
      ['B2', 'I19', 'N33', 'G48', 'O62'], // First column
      ['B14', 'I28', 'N34', 'G54', 'O63'], // Second column
      ['B5', 'I29', 'free', 'G57', 'O65'], // Third column
      ['B3', 'I23', 'N35', 'G46', 'O69'], // Fourth column
      ['B15', 'I27', 'N37', 'G49', 'O66'], // Fifth column
      ['B2', 'B15', 'O62', 'O66'], // corner
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
  winningNumbers.includes('B7') &&
  winningNumbers.includes('B8') &&
  winningNumbers.includes('O69') &&
  winningNumbers.includes('O68');
  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 33</div>
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

export default Card33;