import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/Win.m4a'
import Notwin from '../audio/Notwin.m4a'
function Card() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [6, 12, 3, 9, 8],
      I: [19, 23, 18, 21, 27],
      N: [32, 37, 'free', 45, 39],
      G: [53, 48, 52, 56, 59],
      O: [68, 64, 62, 70, 75]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B6', 'B12', 'B3', 'B9', 'B8'], // First row
      ['I19', 'I23', 'I18', 'I21', 'I27'], // Second row
      ['N32', 'N37', 'free', 'N45', 'N39'], // Third row
      ['G53', 'G48', 'G52', 'G56', 'G59'], // Fourth row
      ['O68', 'O64', 'O62', 'O70', 'O75'], // Fifth row
      ['B6', 'I23', 'free', 'G56', 'O75'], // Top-left to bottom-right diagonal
      ['O68', 'G48', 'free', 'I21', 'B8'], // Top-right to bottom-left diagonal
      ['B6', 'I19', 'N32', 'G53', 'O68'], // First column
      ['B12', 'I23', 'N37', 'G48', 'O64'], // Second column
      ['B3', 'I18', 'free', 'G52', 'O62'], // Third column
      ['B9', 'I21', 'N45', 'G56', 'O70'], // Fourth column
      ['B8', 'I27', 'N39', 'G59', 'O75'], // Fifth column
      ['B6', 'B8', 'O68', 'O75'], // corner 
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

  return (
    <div className={styles.container}>
      <div className={styles.cardnumber}>Card Number 1</div>
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
          {Object.keys(bingoCard).map((letter) => (
            <tr key={letter}>
              {bingoCard[letter].map((number) => {
                const isCalled = calledNumbers.has(`${letter}${number}`) || (number === 'free' && calledNumbers.has('free'));
                const isWinningNumber = winningNumbers.includes(`${letter}${number}`) || (number === 'free' && winningNumbers.includes('free'));
                const cellClassName = isWinningNumber ? styles.winning : (isCalled ? styles.called : '');
                
                return (
                  <td key={number} className={cellClassName}>
                    {number}
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

export default Card;