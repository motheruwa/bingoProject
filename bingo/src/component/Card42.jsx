import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card42() {
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
        B: [13, 15, 7, 2, 8],
        I: [25, 24, 30, 23, 26],
        N: [44, 31, 'free', 42, 32],
        G: [58, 48,50, 54, 59],
        O: [62, 67, 65, 68, 69]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B13', 'B15', 'B7', 'B2', 'B8'], // First row (B)
        ['I25', 'I24', 'I30', 'I23', 'I26'], // Second row (I)
        ['N44', 'N31', 'free', 'N42', 'N32'], // Third row (N)
        ['G58', 'G48', 'G50', 'G54', 'G59'], // Fourth row (G)
        ['O62', 'O67', 'O65', 'O68', 'O69'], // Fifth row (O)
        ['B13', 'I24', 'free', 'G54', 'O69'], // Top-left to bottom-right diagonal
        ['O62', 'G48', 'free', 'I23', 'B8'], // Top-right to bottom-left diagonal
        ['B13', 'I25', 'N44', 'G58', 'O62'], // First column
        ['B15', 'I24', 'N31', 'G48', 'O67'], // Second column
        ['B7', 'I30', 'free', 'G50', 'O65'], // Third column
        ['B2', 'I23', 'N42', 'G54', 'O68'], // Fourth column
        ['B8', 'I26', 'N32', 'G59', 'O69'], // Fifth column
        ['B13', 'B8', 'O62', 'O69'], // corner
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
    winningNumbers.includes('B13') &&
    winningNumbers.includes('B8') &&
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O69');
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
                                   <div className={styles.cardnumber}>Card Number 42</div>
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

export default Card42;