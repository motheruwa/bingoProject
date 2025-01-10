import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
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
      B: [5, 6, 12, 1, 4],
      I: [17, 20, 25, 16, 26],
      N: [38, 43, 'free', 45, 35],
      G: [46, 51, 56, 60, 53],
      O: [70, 75, 61, 68, 74]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B5', 'B6', 'B12', 'B1', 'B4'], // First row
        ['I17', 'I20', 'I25', 'I16', 'I26'], // Second row
        ['N38', 'N43', 'free', 'N45', 'N35'], // Third row
        ['G46', 'G51', 'G56', 'G60', 'G53'], // Fourth row
        ['O70', 'O75', 'O61', 'O68', 'O74'], // Fifth row
        ['B5', 'I20', 'free', 'G60', 'O74'], // Top-left to bottom-right diagonal
        ['O70', 'G51', 'free', 'I16', 'B4'], // Top-right to bottom-left diagonal
        ['B5', 'I17', 'N38', 'G46', 'O70'], // First column
        ['B6', 'I20', 'N43', 'G51', 'O75'], // Second column
        ['B12', 'I25', 'free', 'G56', 'O61'], // Third column
        ['B1', 'I16', 'N45', 'G60', 'O68'], // Fourth column
        ['B4', 'I26', 'N35', 'G53', 'O74'], // Fifth column
        ['B5', 'B4', 'O70', 'O74'], // corner
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
  winningNumbers.includes('B4') &&
  winningNumbers.includes('O70') &&
  winningNumbers.includes('O74');

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