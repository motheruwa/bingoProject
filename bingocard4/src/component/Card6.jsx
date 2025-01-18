import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card6() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const [animateCurrent, setAnimateCurrent] = useState(false);
          const [currentNumber, setCurrentNumber] = useState('');
          useEffect(() => {
            if (calledNumbers.size > 0) {
              setCurrentNumber(Array.from(calledNumbers).pop());
            }
            // eslint-disable-next-line
          }, []);
        
          useEffect(() => {
            setAnimateCurrent(true);
            
            
            const timeout = setTimeout(() => {
              setAnimateCurrent(false);
            }, 2000); // Duration of the 'current' animation
            
            return () => clearTimeout(timeout);
            }, [currentNumber]);
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [3, 15, 14, 6, 11],
      I: [28, 18, 20, 21, 30],
      N: [42, 36, 'free', 45, 41],
      G: [46, 53, 55, 57, 60],
      O: [70, 64, 67, 73, 62]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B3', 'B15', 'B14', 'B6', 'B11'], // First row (B)
    ['I28', 'I18', 'I20', 'I21', 'I30'], // Second row (I)
    ['N42', 'N36', 'free', 'N45', 'N41'], // Third row (N)
    ['G46', 'G53', 'G55', 'G57', 'G60'], // Fourth row (G)
    ['O70', 'O64', 'O67', 'O73', 'O62'], // Fifth row (O)
    ['B3', 'I18', 'free', 'G57', 'O62'], // Top-left to bottom-right diagonal
    ['O70', 'G53', 'free', 'I21', 'B11'], // Top-right to bottom-left diagonal
    ['B3', 'I28', 'N42', 'G46', 'O70'], // First column
    ['B15', 'I18', 'N36', 'G53', 'O64'], // Second column
    ['B14', 'I20', 'free', 'G55', 'O67'], // Third column
    ['B6', 'I21', 'N45', 'G57', 'O73'], // Fourth column
    ['B11', 'I30', 'N41', 'G60', 'O62'], // Fifth column
    ['B3', 'B11', 'O70', 'O62'] // Corner
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
    localStorage.removeItem('sequenceIndex');

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
  winningNumbers.includes('B3') &&
  winningNumbers.includes('B11') &&
  winningNumbers.includes('O70') &&
  winningNumbers.includes('O62');
  return (
     <div className={styles.container}>
      <Replay/>

                  <div className={styles.current11}>
                      <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                        <h3>{currentNumber}</h3>
                      </div>
                    </div>
                    <div className={styles.cont}>
                    <div className={styles.cardnumber}>Card Number 6</div>
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
                  
                  
                </div>
  );
}

export default Card6;