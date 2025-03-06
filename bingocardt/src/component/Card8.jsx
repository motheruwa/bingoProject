import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card8() {
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
      B: [7, 13, 9, 4, 2],
      I: [20, 19, 21, 18, 27],
      N: [32, 36, 'free', 38, 45],
      G: [47, 53, 57, 59, 51],
      O: [61, 67, 66, 68, 69]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B7', 'B13', 'B9', 'B4', 'B2'], // First row (B)
    ['I20', 'I19', 'I21', 'I18', 'I27'], // Second row (I)
    ['N32', 'N36', 'free', 'N38', 'N45'], // Third row (N)
    ['G47', 'G53', 'G57', 'G59', 'G51'], // Fourth row (G)
    ['O61', 'O67', 'O66', 'O68', 'O69'], // Fifth row (O)
    ['B7', 'I19', 'free', 'G59', 'O69'], // Top-left to bottom-right diagonal
    ['O61', 'G53', 'free', 'I18', 'B2'], // Top-right to bottom-left diagonal
    ['B7', 'I20', 'N32', 'G47', 'O61'], // First column
    ['B13', 'I19', 'N36', 'G53', 'O67'], // Second column
    ['B9', 'I21', 'free', 'G57', 'O66'], // Third column
    ['B4', 'I18', 'N38', 'G59', 'O68'], // Fourth column
    ['B2', 'I27', 'N45', 'G51', 'O69'], // Fifth column
    ['B7', 'B2', 'O61', 'O69'] // Corner
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
  winningNumbers.includes('B7') &&
  winningNumbers.includes('B2') &&
  winningNumbers.includes('O61') &&
  winningNumbers.includes('O69');
  return (
    <div className={styles.container}>
      

                      <div className={styles.current11}>
                          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                            <h3>{currentNumber}</h3>
                          </div>
                        </div>
                        <div className={styles.cont}>
                        <div className={styles.cardnumber}>Card Number 8</div>
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

export default Card8;