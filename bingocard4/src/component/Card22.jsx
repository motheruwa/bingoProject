import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card22() {
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
      B: [6, 13, 9, 3, 8],
      I: [26, 19, 25, 20, 27],
      N: [44, 32, 'free', 40, 31],
      G: [55, 60, 49, 46, 56],
      O: [62, 61, 75, 65, 71]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B6', 'B13', 'B9', 'B3', 'B8'], // First row (B)
        ['I26', 'I19', 'I25', 'I20', 'I27'], // Second row (I)
        ['N44', 'N32', 'free', 'N40', 'N31'], // Third row (N)
        ['G55', 'G60', 'G49', 'G46', 'G56'], // Fourth row (G)
        ['O62', 'O61', 'O75', 'O65', 'O71'], // Fifth row (O)
        ['B6', 'I19', 'free', 'G46', 'O71'], // Top-left to bottom-right diagonal
        ['O62', 'G60', 'free', 'I20', 'B8'], // Top-right to bottom-left diagonal
        ['B6', 'I26', 'N44', 'G55', 'O62'], // First column
        ['B13', 'I19', 'N32', 'G60', 'O61'], // Second column
        ['B9', 'I25', 'free', 'G49', 'O75'], // Third column
        ['B3', 'I20', 'N40', 'G46', 'O65'], // Fourth column
        ['B8', 'I27', 'N31', 'G56', 'O71'], // Fifth column
        ['B6', 'B8', 'O62', 'O71'] // Corner
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
  winningNumbers.includes('B6') &&
  winningNumbers.includes('B8') &&
  winningNumbers.includes('O62') &&
  winningNumbers.includes('O71');
  return (
    <div className={styles.container}>
      

                      <div className={styles.current11}>
                          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                            <h3>{currentNumber}</h3>
                          </div>
                        </div>
                        <div className={styles.cont}>
                        <div className={styles.cardnumber}>Card Number 22</div>
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

export default Card22;