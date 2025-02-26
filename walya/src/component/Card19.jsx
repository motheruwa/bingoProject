import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card19() {
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
        B: [13, 4, 8, 9, 10],
        I: [29,24, 30, 21, 16],
        N: [44, 41, 'free', 40, 39],
        G: [53, 48, 49, 52, 55],
        O: [73, 62, 66, 68, 65]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B13', 'B4', 'B8', 'B9', 'B10'], // First row (B)
        ['I29', 'I24', 'I30', 'I21', 'I16'], // Second row (I)
        ['N44', 'N41', 'free', 'N40', 'N39'], // Third row (N)
        ['G53', 'G48', 'G49', 'G52', 'G55'], // Fourth row (G)
        ['O73', 'O62', 'O66', 'O68', 'O65'], // Fifth row (O)
        ['B13', 'I24', 'free', 'G52', 'O65'], // Top-left to bottom-right diagonal
        ['O73', 'G48', 'free', 'I21', 'B10'], // Top-right to bottom-left diagonal
        ['B13', 'I29', 'N44', 'G53', 'O73'], // First column
        ['B4', 'I24', 'N41', 'G48', 'O62'], // Second column
        ['B8', 'I30', 'free', 'G49', 'O66'], // Third column
        ['B9', 'I21', 'N40', 'G52', 'O68'], // Fourth column
        ['B10', 'I16', 'N39', 'G55', 'O65']  // Fifth column
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
    winningNumbers.includes('B11') &&
    winningNumbers.includes('B1') &&
    winningNumbers.includes('O75') &&
    winningNumbers.includes('O69');
  return (
    <div className={styles.container}>
      <Replay/>
                                              <div className={styles.current11}>
                                                  <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                                    <h3>{currentNumber}</h3>
                                                  </div>
                                                </div>
                                                <div className={styles.cont}>
                                                <div className={styles.cardnumber}>Card Number 19</div>
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

export default Card19;