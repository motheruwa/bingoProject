import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card15() {
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
        B: [5, 2, 6,11, 3],
        I: [26, 30, 24, 20, 19],
        N: [43, 34, 'free', 35, 39],
        G: [59, 52, 56, 49, 47],
        O: [66, 70, 62, 65, 74]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B5', 'B2', 'B6', 'B11', 'B3'], // First row (B)
        ['I26', 'I30', 'I24', 'I20', 'I19'], // Second row (I)
        ['N43', 'N34', 'free', 'N35', 'N39'], // Third row (N)
        ['G59', 'G52', 'G56', 'G49', 'G47'], // Fourth row (G)
        ['O66', 'O70', 'O62', 'O65', 'O74'], // Fifth row (O)
        ['B5', 'I30', 'free', 'G49', 'O74'], // Top-left to bottom-right diagonal
        ['O66', 'G52', 'free', 'I20', 'B3'], // Top-right to bottom-left diagonal
        ['B5', 'I26', 'N43', 'G59', 'O66'], // First column
        ['B2', 'I30', 'N34', 'G52', 'O70'], // Second column
        ['B6', 'I24', 'free', 'G56', 'O62'], // Third column
        ['B11', 'I20', 'N35', 'G49', 'O65'], // Fourth column
        ['B3', 'I19', 'N39', 'G47', 'O74']  // Fifth column
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
    winningNumbers.includes('B4') &&
    winningNumbers.includes('B12') &&
    winningNumbers.includes('O65') &&
    winningNumbers.includes('O74');
  return (
     <div className={styles.container}>
      <Replay/>
                                      <div className={styles.current11}>
                                          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                            <h3>{currentNumber}</h3>
                                          </div>
                                        </div>
                                        <div className={styles.cont}>
                                        <div className={styles.cardnumber}>Card Number 15</div>
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

export default Card15;