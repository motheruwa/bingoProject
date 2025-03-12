import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card46() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));const [animateCurrent, setAnimateCurrent] = useState(false);
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
        B: [5, 8, 1, 10, 9],
        I: [30, 16, 22, 29, 20],
        N: [44, 34, 'free', 36, 39],
        G: [46, 50, 48, 56, 55],
        O: [75, 65, 73, 61, 62]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B5', 'B8', 'B1', 'B10', 'B9'], // First row (B)
        ['I30', 'I16', 'I22', 'I29', 'I20'], // Second row (I)
        ['N44', 'N34', 'free', 'N36', 'N39'], // Third row (N)
        ['G46', 'G50', 'G48', 'G56', 'G55'], // Fourth row (G)
        ['O75', 'O65', 'O73', 'O61', 'O62'], // Fifth row (O)
        ['B5', 'I16', 'free', 'G56', 'O62'], // Top-left to bottom-right diagonal
        ['O75', 'G50', 'free', 'I29', 'B9'], // Top-right to bottom-left diagonal
        ['B5', 'I30', 'N44', 'G46', 'O75'], // First column
        ['B8', 'I16', 'N34', 'G50', 'O65'], // Second column
        ['B1', 'I22', 'free', 'G48', 'O73'], // Third column
        ['B10', 'I29', 'N36', 'G56', 'O61'], // Fourth column
        ['B9', 'I20', 'N39', 'G55', 'O62'], // Fifth column
        ['B5', 'B9', 'O75', 'O62'], // corner
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
    winningNumbers.includes('B9') &&
    winningNumbers.includes('O75') &&
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
                                           <div className={styles.cardnumber}>Card Number 46</div>
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

export default Card46;