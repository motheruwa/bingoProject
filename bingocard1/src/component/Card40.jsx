import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card40() {
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
        B: [14, 12, 8, 10, 2],
        I: [27, 26, 24, 28, 20],
        N: [36, 34, 'free', 43, 38],
        G: [53, 57, 49, 51, 59],
        O: [65, 61, 63, 75, 67]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B14', 'B12', 'B8', 'B10', 'B2'], // First row (B)
        ['I27', 'I26', 'I24', 'I28', 'I20'], // Second row (I)
        ['N36', 'N34', 'free', 'N43', 'N38'], // Third row (N)
        ['G53', 'G57', 'G49', 'G51', 'G59'], // Fourth row (G)
        ['O65', 'O61', 'O63', 'O75', 'O67'], // Fifth row (O)
        ['B14', 'I26', 'free', 'G51', 'O67'], // Top-left to bottom-right diagonal
        ['O65', 'G57', 'free', 'I28', 'B2'], // Top-right to bottom-left diagonal
        ['B14', 'I27', 'N36', 'G53', 'O65'], // First column
        ['B12', 'I26', 'N34', 'G57', 'O61'], // Second column
        ['B8', 'I24', 'free', 'G49', 'O63'], // Third column
        ['B10', 'I28', 'N43', 'G51', 'O75'], // Fourth column
        ['B2', 'I20', 'N38', 'G59', 'O67'], // Fifth column
        ['B14', 'B2', 'O65', 'O67'], // corner
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
    winningNumbers.includes('B14') &&
    winningNumbers.includes('B2') &&
    winningNumbers.includes('O65') &&
    winningNumbers.includes('O67');
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
                               <div className={styles.cardnumber}>Card Number 40</div>
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

export default Card40;