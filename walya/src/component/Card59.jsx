import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';

function Card59() {
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
        B: [13, 1, 4, 7, 5],
        I: [19, 25, 18, 21, 30],
        N: [39, 37, 'free', 44, 41],
        G: [52, 50, 55, 47, 49],
        O: [71, 74, 61, 64, 66]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B13', 'B1', 'B4', 'B7', 'B5'],
        ['I19', 'I25', 'I18', 'I21', 'I30'],
        ['N39', 'N37', 'free', 'N44', 'N41'],
        ['G52', 'G50', 'G55', 'G47', 'G49'],
        ['O71', 'O74', 'O61', 'O64', 'O66'],
        ['B13', 'I25', 'free', 'G47', 'O66'],
        ['O71', 'G50', 'free', 'I21', 'B5'],
        ['B13', 'I19', 'N39', 'G52', 'O71'],
        ['B1', 'I25', 'N37', 'G50', 'O74'],
        ['B4', 'I18', 'free', 'G55', 'O61'],
        ['B7', 'I21', 'N44', 'G47', 'O64'],
        ['B5', 'I30', 'N41', 'G49', 'O66']
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
    winningNumbers.includes('B10') &&
    winningNumbers.includes('O67') &&
    winningNumbers.includes('O75');
  
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
                                                   <div className={styles.cardnumber}>Card Number 59</div>
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

export default Card59;