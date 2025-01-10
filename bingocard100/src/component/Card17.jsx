import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card17() {
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
      B: [10, 3, 13, 2, 7],
      I: [28, 27, 24, 21, 25],
      N: [32, 40, 'free', 41, 42],
      G: [59, 47, 57, 60, 58],
      O: [72, 63, 71, 68, 65]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B10', 'B3', 'B13', 'B2', 'B7'], // First row (B)
        ['I28', 'I27', 'I24', 'I21', 'I25'], // Second row (I)
        ['N32', 'N40', 'free', 'N41', 'N42'], // Third row (N)
        ['G59', 'G47', 'G57', 'G60', 'G58'], // Fourth row (G)
        ['O72', 'O63', 'O71', 'O68', 'O65'], // Fifth row (O)
        ['B10', 'I27', 'free', 'G60', 'O65'], // Top-left to bottom-right diagonal
        ['O72', 'G47', 'free', 'I21', 'B7'], // Top-right to bottom-left diagonal
        ['B10', 'I28', 'N32', 'G59', 'O72'], // First column
        ['B3', 'I27', 'N40', 'G47', 'O63'], // Second column
        ['B13', 'I24', 'free', 'G57', 'O71'], // Third column
        ['B2', 'I21', 'N41', 'G60', 'O68'], // Fourth column
        ['B7', 'I25', 'N42', 'G58', 'O65'], // Fifth column
        ['B10', 'B7', 'O72', 'O65'] // Corner
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
  winningNumbers.includes('B10') &&
  winningNumbers.includes('B7') &&
  winningNumbers.includes('O72') &&
  winningNumbers.includes('O65');
  return (
    <div className={styles.container}>
                                          <div className={styles.current11}>
                                              <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                                <h3>{currentNumber}</h3>
                                              </div>
                                            </div>
                                            <div className={styles.cont}>
                                            <div className={styles.cardnumber}>Card Number 17</div>
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

export default Card17;