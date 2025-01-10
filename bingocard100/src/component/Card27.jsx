import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card27() {
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
      B: [11, 3, 10, 7, 13],
      I: [26, 28, 24, 18, 30],
      N: [39, 33, 'free', 45, 44],
      G: [51, 56, 58, 53, 47],
      O: [75, 67, 74, 69, 64]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B11', 'B3', 'B10', 'B7', 'B13'], // First row
        ['I26', 'I28', 'I24', 'I18', 'I30'], // Second row
        ['N39', 'N33', 'free', 'N45', 'N44'], // Third row
        ['G51', 'G56', 'G58', 'G53', 'G47'], // Fourth row
        ['O75', 'O67', 'O74', 'O69', 'O64'], // Fifth row
        ['B11', 'I28', 'free', 'G53', 'O64'], // Top-left to bottom-right diagonal
        ['O75', 'G56', 'free', 'I18', 'B13'], // Top-right to bottom-left diagonal
        ['B11', 'I26', 'N39', 'G51', 'O75'], // First column
        ['B3', 'I28', 'N33', 'G56', 'O67'], // Second column
        ['B10', 'I24', 'free', 'G58', 'O74'], // Third column
        ['B7', 'I18', 'N45', 'G53', 'O69'], // Fourth column
        ['B13', 'I30', 'N44', 'G47', 'O64'], // Fifth column
        ['B11', 'B13', 'O75', 'O64'], // corner
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
  winningNumbers.includes('B11') &&
  winningNumbers.includes('B13') &&
  winningNumbers.includes('O75') &&
  winningNumbers.includes('O64');
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
            <div className={styles.cardnumber}>Card Number 27</div>
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

export default Card27;