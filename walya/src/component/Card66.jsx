import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';
import Replay from './Replay';

function Card66() {
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
        B: [11, 7, 1, 10, 4],
        I: [25, 27, 23, 24, 16],
        N: [37, 40, 'free', 45, 39],
        G: [59, 47, 52, 49, 60],
        O: [72, 67, 69, 66, 63]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B11', 'B7', 'B1', 'B10', 'B4'],
        ['I25', 'I27', 'I23', 'I24', 'I16'],
        ['N37', 'N40', 'free', 'N45', 'N39'],
        ['G59', 'G47', 'G52', 'G49', 'G60'],
        ['O72', 'O67', 'O69', 'O66', 'O63'],
        ['B11', 'I25', 'N37', 'G59', 'O72'],
        ['B7', 'I27', 'N40', 'G47', 'O67'],
        ['B1', 'I23', 'free', 'G52', 'O69'],
        ['B10', 'I24', 'N45', 'G49', 'O66'],
        ['B4', 'I16', 'N39', 'G60', 'O63'],
        ['B11', 'I27', 'free', 'G49', 'O63'],
        ['B4', 'I24', 'free', 'G47', 'O72']
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
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O63');
  
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
                                                   <div className={styles.cardnumber}>Card Number 66</div>
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

export default Card66;