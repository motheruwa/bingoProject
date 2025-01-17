import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card43() {
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
        B: [4, 3, 12, 15, 6],
        I: [24, 25, 18, 29, 17],
        N: [34, 35, 'free', 45, 43],
        G: [55, 48, 60, 54, 58],
        O: [66, 71, 70, 72, 67]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B4', 'B3', 'B12', 'B15', 'B6'], // First row (B)
        ['I24', 'I25', 'I18', 'I29', 'I17'], // Second row (I)
        ['N34', 'N35', 'free', 'N45', 'N43'], // Third row (N)
        ['G55', 'G48', 'G60', 'G54', 'G58'], // Fourth row (G)
        ['O66', 'O71', 'O70', 'O72', 'O67'], // Fifth row (O)
        ['B4', 'I25', 'free', 'G54', 'O67'], // Top-left to bottom-right diagonal
        ['O66', 'G48', 'free', 'I29', 'B6'], // Top-right to bottom-left diagonal
        ['B4', 'I24', 'N34', 'G55', 'O66'], // First column
        ['B3', 'I25', 'N35', 'G48', 'O71'], // Second column
        ['B12', 'I18', 'free', 'G60', 'O70'], // Third column
        ['B15', 'I29', 'N45', 'G54', 'O72'], // Fourth column
        ['B6', 'I17', 'N43', 'G58', 'O67'], // Fifth column
        ['B4', 'B6', 'O66', 'O67'], // corner
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
    winningNumbers.includes('B6') &&
    winningNumbers.includes('O66') &&
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
                                       <div className={styles.cardnumber}>Card Number 43</div>
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

export default Card43;