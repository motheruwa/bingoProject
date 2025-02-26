import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
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
        B: [8, 10, 9, 11, 4],
        I: [19, 24, 30, 18, 25],
        N: [45, 35, 'free', 44, 31],
        G: [57, 49, 53, 51, 48],
        O: [69, 62, 66, 65, 68]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B8', 'B10', 'B9', 'B11', 'B4'], // First row (B)
        ['I19', 'I24', 'I30', 'I18', 'I25'], // Second row (I)
        ['N45', 'N35', 'free', 'N44', 'N31'], // Third row (N)
        ['G57', 'G49', 'G53', 'G51', 'G48'], // Fourth row (G)
        ['O69', 'O62', 'O66', 'O65', 'O68'], // Fifth row (O)
        ['B8', 'I24', 'free', 'G51', 'O68'], // Top-left to bottom-right diagonal
        ['O69', 'G49', 'free', 'I18', 'B4'], // Top-right to bottom-left diagonal
        ['B8', 'I19', 'N45', 'G57', 'O69'], // First column
        ['B10', 'I24', 'N35', 'G49', 'O62'], // Second column
        ['B9', 'I30', 'free', 'G53', 'O66'], // Third column
        ['B11', 'I18', 'N44', 'G51', 'O65'], // Fourth column
        ['B4', 'I25', 'N31', 'G48', 'O68']  // Fifth column
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