import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card36() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const [animateCurrent, setAnimateCurrent] = useState(false);
            const [currentNumber, setCurrentNumber] = useState("");
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
        B: [10, 8, 9, 13, 5],
        I: [28, 26, 20, 18, 19],
        N: [42, 40, 'free', 41, 43],
        G: [49, 59, 51, 47, 52],
        O: [66, 75, 63, 61, 64]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B10', 'B8', 'B9', 'B13', 'B5'], // First row (B)
        ['I28', 'I26', 'I20', 'I18', 'I19'], // Second row (I)
        ['N42', 'N40', 'free', 'N41', 'N43'], // Third row (N)
        ['G49', 'G59', 'G51', 'G47', 'G52'], // Fourth row (G)
        ['O66', 'O75', 'O63', 'O61', 'O64'], // Fifth row (O)
        ['B10', 'I26', 'free', 'G47', 'O64'], // Top-left to bottom-right diagonal
        ['O66', 'G59', 'free', 'I18', 'B5'], // Top-right to bottom-left diagonal
        ['B10', 'I28', 'N42', 'G49', 'O66'], // First column
        ['B8', 'I26', 'N40', 'G59', 'O75'], // Second column
        ['B9', 'I20', 'free', 'G51', 'O63'], // Third column
        ['B13', 'I18', 'N41', 'G47', 'O61'], // Fourth column
        ['B5', 'I19', 'N43', 'G52', 'O64'], // Fifth column
        ['B10', 'B5', 'O66', 'O64'], // corner
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
    winningNumbers.includes('B5') &&
    winningNumbers.includes('O66') &&
    winningNumbers.includes('O64');
  return (
    <div className={styles.container}>
      

                     <div className={styles.current11}>
                       <div
                         className={`${styles.current} ${
                           animateCurrent ? styles.animated : ""
                         }`}
                       >
                         <h3>{currentNumber}</h3>
                       </div>
                     </div>
                     <div className={styles.cont}>
                       <div className={styles.cardnumber}>Card Number 36</div>
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
                                 const isCalled =
                                   calledNumbers.has(`${letter}${number}`) ||
                                   (number === "free" && calledNumbers.has("free"));
                                 const isWinningNumber =
                                   winningNumbers.includes(`${letter}${number}`) ||
                                   (number === "free" && winningNumbers.includes("free"));
                                 const isCornerWinning =
                                   isFourCornersWinning &&
                                   (letter === "B" || letter === "O") &&
                                   (index === 0 || index === 4);
               
                                 const cellClassName = isWinningNumber
                                   ? isCornerWinning
                                     ? styles.cornerwinning
                                     : styles.winning
                                   : isCalled
                                   ? styles.called
                                   : "";
                                 return (
                                   <td>
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
                         <button onClick={playWinSound} className={styles.good}>
                           Good Bingo
                         </button>
                         <button onClick={playNotwinSound} className={styles.add}>
                           Not Bingo
                         </button>
                         <button onClick={handleGoBack} className={styles.good}>
                           Additional
                         </button>
                         <button onClick={handleResetAndNavigate} className={styles.add}>
                           New Bingo
                         </button>
                       </div>
                     </div>
                   </div>
  );
}

export default Card36;