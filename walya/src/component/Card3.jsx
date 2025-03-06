import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card3() {
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
        B: [13, 5, 6, 9, 10],
        I: [17, 18, 16, 27, 19],
        N: [44, 35, 'free', 45, 34],
        G: [55, 50, 54, 51, 57],
        O: [75, 64, 68, 70, 61]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B13', 'B5', 'B6', 'B9', 'B10'], // First row (B)
        ['I17', 'I18', 'I16', 'I27', 'I19'], // Second row (I)
        ['N44', 'N35', 'free', 'N45', 'N34'], // Third row (N)
        ['G55', 'G50', 'G54', 'G51', 'G57'], // Fourth row (G)
        ['O75', 'O64', 'O68', 'O70', 'O61'], // Fifth row (O)
        ['B13', 'I18', 'free', 'G51', 'O61'], // Top-left to bottom-right diagonal
        ['O75', 'G50', 'free', 'I27', 'B10'], // Top-right to bottom-left diagonal
        ['B13', 'I17', 'N44', 'G55', 'O75'], // First column
        ['B5', 'I18', 'N35', 'G50', 'O64'], // Second column
        ['B6', 'I16', 'free', 'G54', 'O68'], // Third column
        ['B9', 'I27', 'N45', 'G51', 'O70'], // Fourth column
        ['B10', 'I19', 'N34', 'G57', 'O61']  // Fifth column
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
    winningNumbers.includes('B5') &&
    winningNumbers.includes('B3') &&
    winningNumbers.includes('O65') &&
    winningNumbers.includes('O71');
  return (
    <div className={styles.container}>
      
          <div className={styles.current11}>
              <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                <h3>{currentNumber}</h3>
              </div>
            </div>
            <div className={styles.cont}>
            <div className={styles.cardnumber}>Card Number 3</div>
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

export default Card3;