import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/Card.module.css"; // Import the CSS module for styling
import { useNavigate } from "react-router-dom";
import Win from "../audio/WIN.mp4";
import Notwin from "../audio/NOTWIN.mp4";

function Card68() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get("calledNumbers")));
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
      B: [10, 5, 8, 14, 3],
      I: [22, 21, 27, 25, 30],
      N: [32, 41, "free", 43, 35],
      G: [54, 57, 48, 55, 52],
      O: [62, 64, 73, 69, 70],
    };

    // Set the center cell as a free space
    bingoCard.N[2] = "free";

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
  // Rows
  ["B10", "I22", "N32", "G54", "O62"],
  ["B5", "I21", "N41", "G57", "O64"],
  ["B8", "I27", "Nfree", "G48", "O73"],
  ["B14", "I25", "N43", "G55", "O69"],
  ["B3", "I30", "N35", "G52", "O70"],

  // Columns
  ["B10", "B5", "B8", "B14", "B3"],
  ["I22", "I21", "I27", "I25", "I30"],
  ["N32", "N41", "Nfree", "N43", "N35"],
  ["G54", "G57", "G48", "G55", "G52"],
  ["O62", "O64", "O73", "O69", "O70"],

  // Diagonals
  ["B10", "I21", "Nfree", "G55", "O70"],
  ["B3", "I25", "Nfree", "G57", "O62"],

  // 4 corners
  ["B10", "B3", "O62", "O70"]

    ];

    const winningLines = [];
    for (const condition of winConditions) {
      if (condition.every((char) => calledNumbers.has(char))) {
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
    localStorage.removeItem("calledNumbers");
    localStorage.removeItem("registeredNumbers");
    localStorage.removeItem("sequenceIndex");

    navigate("/registerdcard");
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
    audioNotwin.onended = function () {
      handleGoBack();
    };
  };

  const isFourCornersWinning =
    winningNumbers.includes("B10") &&
    winningNumbers.includes("B3") &&
    winningNumbers.includes("O62") &&
    winningNumbers.includes("O70");

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
        <div className={styles.cardnumber}>Card Number 68</div>
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

export default Card68;
