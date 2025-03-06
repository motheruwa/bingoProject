import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card38() {
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
        B: [10, 1, 2, 6, 8],
        I: [21, 18, 19, 27, 29],
        N: [32, 41, 'free', 37, 35],
        G: [49, 48, 60, 53, 55],
        O: [74, 75, 62, 67, 68]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B10', 'B1', 'B2', 'B6', 'B8'], // First row (B)
        ['I21', 'I18', 'I19', 'I27', 'I29'], // Second row (I)
        ['N32', 'N41', 'free', 'N37', 'N35'], // Third row (N)
        ['G49', 'G48', 'G60', 'G53', 'G55'], // Fourth row (G)
        ['O74', 'O75', 'O62', 'O67', 'O68'], // Fifth row (O)
        ['B10', 'I18', 'free', 'G53', 'O68'], // Top-left to bottom-right diagonal
        ['O74', 'G48', 'free', 'I27', 'B8'], // Top-right to bottom-left diagonal
        ['B10', 'I21', 'N32', 'G49', 'O74'], // First column
        ['B1', 'I18', 'N41', 'G48', 'O75'], // Second column
        ['B2', 'I19', 'free', 'G60', 'O62'], // Third column
        ['B6', 'I27', 'N37', 'G53', 'O67'], // Fourth column
        ['B8', 'I29', 'N35', 'G55', 'O68']  // Fifth column
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
    winningNumbers.includes('B6') &&
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
                           <div className={styles.cardnumber}>Card Number 38</div>
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

export default Card38;