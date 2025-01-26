import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card39() {
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
        B: [6, 13, 15,9, 3],
        I: [27, 21, 18, 29, 25],
        N: [34, 42, 'free', 38, 33],
        G: [59, 53, 57, 50, 54],
        O: [61, 71, 65, 64, 62]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B6', 'B13', 'B15', 'B9', 'B3'], // First row (B)
        ['I27', 'I21', 'I18', 'I29', 'I25'], // Second row (I)
        ['N34', 'N42', 'free', 'N38', 'N33'], // Third row (N)
        ['G59', 'G53', 'G57', 'G50', 'G54'], // Fourth row (G)
        ['O61', 'O71', 'O65', 'O64', 'O62'], // Fifth row (O)
        ['B6', 'I21', 'free', 'G50', 'O62'], // Top-left to bottom-right diagonal
        ['O61', 'G53', 'free', 'I29', 'B3'], // Top-right to bottom-left diagonal
        ['B6', 'I27', 'N34', 'G59', 'O61'], // First column
        ['B13', 'I21', 'N42', 'G53', 'O71'], // Second column
        ['B15', 'I18', 'free', 'G57', 'O65'], // Third column
        ['B9', 'I29', 'N38', 'G50', 'O64'], // Fourth column
        ['B3', 'I25', 'N33', 'G54', 'O62'], // Fifth column
        ['B6', 'B3', 'O61', 'O62'], // corner
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
    winningNumbers.includes('B3') &&
    winningNumbers.includes('O61') &&
    winningNumbers.includes('O62');
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
                               <div className={styles.cardnumber}>Card Number 39</div>
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

export default Card39;