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
        B: [1, 4, 9, 3, 6],
        I: [29, 23, 30, 20, 24],
        N: [36, 33, 'free', 45, 42],
        G: [52, 47, 60, 55, 46],
        O: [66, 73, 63, 69, 74]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B1', 'B4', 'B9', 'B3', 'B6'], // First row (B)
        ['I29', 'I23', 'I30', 'I20', 'I24'], // Second row (I)
        ['N36', 'N33', 'free', 'N45', 'N42'], // Third row (N)
        ['G52', 'G47', 'G60', 'G55', 'G46'], // Fourth row (G)
        ['O66', 'O73', 'O63', 'O69', 'O74'], // Fifth row (O)
        ['B1', 'I23', 'free', 'G55', 'O74'], // Top-left to bottom-right diagonal
        ['O66', 'G47', 'free', 'I20', 'B6'], // Top-right to bottom-left diagonal
        ['B1', 'I29', 'N36', 'G52', 'O66'], // First column
        ['B4', 'I23', 'N33', 'G47', 'O73'], // Second column
        ['B9', 'I30', 'free', 'G60', 'O63'], // Third column
        ['B3', 'I20', 'N45', 'G55', 'O69'], // Fourth column
        ['B6', 'I24', 'N42', 'G46', 'O74']  // Fifth column
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