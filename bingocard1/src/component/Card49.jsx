import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card49() {
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
        B: [13, 12, 15, 6, 9],
        I: [27, 16, 24, 18, 26],
        N: [33, 38, 'free', 40, 35],
        G: [57, 47, 60, 55, 53],
        O: [73, 63, 72, 71, 61]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B13', 'B12', 'B15', 'B6', 'B9'], // First row (B)
        ['I27', 'I16', 'I24', 'I18', 'I26'], // Second row (I)
        ['N33', 'N38', 'free', 'N40', 'N35'], // Third row (N)
        ['G57', 'G47', 'G60', 'G55', 'G53'], // Fourth row (G)
        ['O73', 'O63', 'O72', 'O71', 'O61'], // Fifth row (O)
        ['B13', 'I16', 'free', 'G55', 'O61'], // Top-left to bottom-right diagonal
        ['O73', 'G47', 'free', 'I18', 'B9'], // Top-right to bottom-left diagonal
        ['B13', 'I27', 'N33', 'G57', 'O73'], // First column
        ['B12', 'I16', 'N38', 'G47', 'O63'], // Second column
        ['B15', 'I24', 'free', 'G60', 'O72'], // Third column
        ['B6', 'I18', 'N40', 'G55', 'O71'], // Fourth column
        ['B9', 'I26', 'N35', 'G53', 'O61'], // Fifth column
        ['B13', 'B9', 'O73', 'O61'], // corner
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
    winningNumbers.includes('B13') &&
    winningNumbers.includes('B9') &&
    winningNumbers.includes('O73') &&
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
                                                   <div className={styles.cardnumber}>Card Number 49</div>
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

export default Card49;