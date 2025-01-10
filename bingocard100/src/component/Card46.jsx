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
      B: [5, 15, 11, 4, 2],
      I: [17, 18, 21, 23, 25],
      N: [43, 42, 'free', 39, 33],
      G: [47, 48, 56, 54, 49],
      O: [74, 63, 64, 66, 65]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B5', 'B15', 'B11', 'B4', 'B2'], // First row
        ['I17', 'I18', 'I21', 'I23', 'I25'], // Second row
        ['N43', 'N42', 'free', 'N39', 'N33'], // Third row
        ['G47', 'G48', 'G56', 'G54', 'G49'], // Fourth row
        ['O74', 'O63', 'O64', 'O66', 'O65'], // Fifth row
        ['B5', 'I18', 'free', 'G54', 'O65'], // Top-left to bottom-right diagonal
        ['O74', 'G48', 'free', 'I23', 'B2'], // Top-right to bottom-left diagonal
        ['B5', 'I17', 'N43', 'G47', 'O74'], // First column
        ['B15', 'I18', 'N42', 'G48', 'O63'], // Second column
        ['B11', 'I21', 'free', 'G56', 'O64'], // Third column
        ['B4', 'I23', 'N39', 'G54', 'O66'], // Fourth column
        ['B2', 'I25', 'N33', 'G49', 'O65'], // Fifth column
        ['B5', 'B2', 'O74', 'O65'], // corner
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
  winningNumbers.includes('B2') &&
  winningNumbers.includes('O74') &&
  winningNumbers.includes('O65');

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