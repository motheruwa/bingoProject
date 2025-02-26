import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card45() {
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
        B: [7, 10, 14, 8, 6],
        I: [16, 20, 27, 17, 19],
        N: [42, 35, 'free', 33, 32],
        G: [52, 57, 58, 55, 59],
        O: [64, 72, 69, 63, 61]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B7', 'B10', 'B14', 'B8', 'B6'], // First row (B)
        ['I16', 'I20', 'I27', 'I17', 'I19'], // Second row (I)
        ['N42', 'N35', 'free', 'N33', 'N32'], // Third row (N)
        ['G52', 'G57', 'G58', 'G55', 'G59'], // Fourth row (G)
        ['O64', 'O72', 'O69', 'O63', 'O61'], // Fifth row (O)
        ['B7', 'I20', 'free', 'G55', 'O61'], // Top-left to bottom-right diagonal
        ['O64', 'G57', 'free', 'I17', 'B6'], // Top-right to bottom-left diagonal
        ['B7', 'I16', 'N42', 'G52', 'O64'], // First column
        ['B10', 'I20', 'N35', 'G57', 'O72'], // Second column
        ['B14', 'I27', 'free', 'G58', 'O69'], // Third column
        ['B8', 'I17', 'N33', 'G55', 'O63'], // Fourth column
        ['B6', 'I19', 'N32', 'G59', 'O61']  // Fifth column
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
    winningNumbers.includes('B4') &&
    winningNumbers.includes('B1') &&
    winningNumbers.includes('O73') &&
    winningNumbers.includes('O65');

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
                                           <div className={styles.cardnumber}>Card Number 45</div>
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

export default Card45;