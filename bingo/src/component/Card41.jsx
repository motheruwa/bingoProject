import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card41() {
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
        B: [14, 7, 4, 6, 2],
        I: [18, 17, 20, 23, 25],
        N: [31, 33, 'free', 43, 39],
        G: [52, 56, 60, 46, 59],
        O: [65, 61, 71, 75, 73]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B14', 'B7', 'B4', 'B6', 'B2'], // First row (B)
        ['I18', 'I17', 'I20', 'I23', 'I25'], // Second row (I)
        ['N31', 'N33', 'free', 'N43', 'N39'], // Third row (N)
        ['G52', 'G56', 'G60', 'G46', 'G59'], // Fourth row (G)
        ['O65', 'O61', 'O71', 'O75', 'O73'], // Fifth row (O)
        ['B14', 'I17', 'free', 'G46', 'O73'], // Top-left to bottom-right diagonal
        ['O65', 'G56', 'free', 'I23', 'B2'], // Top-right to bottom-left diagonal
        ['B14', 'I18', 'N31', 'G52', 'O65'], // First column
        ['B7', 'I17', 'N33', 'G56', 'O61'], // Second column
        ['B4', 'I20', 'free', 'G60', 'O71'], // Third column
        ['B6', 'I23', 'N43', 'G46', 'O75'], // Fourth column
        ['B2', 'I25', 'N39', 'G59', 'O73'], // Fifth column
        ['B14', 'B2', 'O65', 'O73'], // corner
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
    winningNumbers.includes('O73');
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
                                       <div className={styles.cardnumber}>Card Number 41</div>
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

export default Card41;