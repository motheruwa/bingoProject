import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';

function Card50() {
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
        B: [13, 15, 8, 3, 5],
        I: [27, 17, 30, 21, 25],
        N: [32, 31, 'free', 34, 37],
        G: [57, 46, 55, 60, 53],
        O: [74, 65, 63, 70, 66]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B13', 'B15', 'B8', 'B3', 'B5'],
        ['I27', 'I17', 'I30', 'I21', 'I25'],
        ['N32', 'N31', 'free', 'N34', 'N37'],
        ['G57', 'G46', 'G55', 'G60', 'G53'],
        ['O74', 'O65', 'O63', 'O70', 'O66'],
        ['B13', 'I17', 'free', 'G60', 'O66'],
        ['O74', 'G46', 'free', 'I21', 'B5'],
        ['B13', 'I27', 'N32', 'G57', 'O74'],
        ['B15', 'I17', 'N31', 'G46', 'O65'],
        ['B8', 'I30', 'free', 'G55', 'O63'],
        ['B3', 'I21', 'N34', 'G60', 'O70'],
        ['B5', 'I25', 'N37', 'G53', 'O66']
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
    winningNumbers.includes('B8') &&
    winningNumbers.includes('O64') &&
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
                                                   <div className={styles.cardnumber}>Card Number 50</div>
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

export default Card50;