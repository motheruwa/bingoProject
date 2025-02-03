import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card47() {
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
        B: [7, 9, 12, 3, 5],
        I: [16, 26, 19, 24, 23],
        N: [43, 37, 'free', 36, 41],
        G: [50, 58, 48, 49, 60],
        O: [65, 72, 68, 63, 61]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B7', 'B9', 'B12', 'B3', 'B5'], // First row (B)
        ['I16', 'I26', 'I19', 'I24', 'I23'], // Second row (I)
        ['N43', 'N37', 'free', 'N36', 'N41'], // Third row (N)
        ['G50', 'G58', 'G48', 'G49', 'G60'], // Fourth row (G)
        ['O65', 'O72', 'O68', 'O63', 'O61'], // Fifth row (O)
        ['B7', 'I26', 'free', 'G49', 'O61'], // Top-left to bottom-right diagonal
        ['O65', 'G58', 'free', 'I24', 'B5'], // Top-right to bottom-left diagonal
        ['B7', 'I16', 'N43', 'G50', 'O65'], // First column
        ['B9', 'I26', 'N37', 'G58', 'O72'], // Second column
        ['B12', 'I19', 'free', 'G48', 'O68'], // Third column
        ['B3', 'I24', 'N36', 'G49', 'O63'], // Fourth column
        ['B5', 'I23', 'N41', 'G60', 'O61'], // Fifth column
        ['B7', 'B5', 'O65', 'O61'], // corner
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
    winningNumbers.includes('B7') &&
    winningNumbers.includes('B5') &&
    winningNumbers.includes('O65') &&
    winningNumbers.includes('O61');

  return (
    <div className={styles.container}>
      <Replay/>

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
                                               <div className={styles.cardnumber}>Card Number 47</div>
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

export default Card47;