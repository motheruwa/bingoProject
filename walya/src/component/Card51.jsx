import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';
import Replay from './Replay';

function Card51() {
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
        B: [15, 14, 9, 11, 4],
        I: [16, 30, 20, 25, 26],
        N: [43, 32, 'free', 44, 34],
        G: [56, 49, 51, 52, 48],
        O: [63, 65, 62, 69, 70]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B15', 'B14', 'B9', 'B11', 'B4'],
        ['I16', 'I30', 'I20', 'I25', 'I26'],
        ['N43', 'N32', 'free', 'N44', 'N34'],
        ['G56', 'G49', 'G51', 'G52', 'G48'],
        ['O63', 'O65', 'O62', 'O69', 'O70'],
        ['B15', 'I16', 'N43', 'G56', 'O63'],
        ['B14', 'I30', 'N32', 'G49', 'O65'],
        ['B9', 'I20', 'free', 'G51', 'O62'],
        ['B11', 'I25', 'N44', 'G52', 'O69'],
        ['B4', 'I26', 'N34', 'G48', 'O70'],
        ['B15', 'I30', 'free', 'G52', 'O70'],
        ['B4', 'I26', 'free', 'G49', 'O63']
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
    winningNumbers.includes('B8') &&
    winningNumbers.includes('O67') &&
    winningNumbers.includes('O72');
  
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
                                                   <div className={styles.cardnumber}>Card Number 51</div>
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

export default Card51;