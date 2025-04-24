import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/Card.module.css"; // Import the CSS module for styling
import { useNavigate } from "react-router-dom";
import Win from "../audio/WIN.mp4";
import Notwin from "../audio/NOTWIN.mp4";
import WinCelebration from "./Wincelebration";
import { motion } from "framer-motion";
function Card58() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get("calledNumbers")));
  const [showCelebration, setShowCelebration] = useState(false);
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
      B: [7, 11, 6, 15, 8],
      I: [29, 19, 24, 20, 21],
      N: [33, 34, "free", 39, 37],
      G: [57, 54, 47, 58, 49],
      O: [70, 61, 62, 73, 68],
    };

    // Set the center cell as a free space
    bingoCard.N[2] = "free";

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ["B7", "I29", "N33", "G57", "O70"],
      ["B11", "I19", "N34", "G54", "O61"],
      ["B6", "I24", "free", "G47", "O62"],
      ["B15", "I20", "N39", "G58", "O73"],
      ["B8", "I21", "N37", "G49", "O68"],

      // Columns
      ["B7", "B11", "B6", "B15", "B8"],
      ["I29", "I19", "I24", "I20", "I21"],
      ["N33", "N34", "free", "N39", "N37"],
      ["G57", "G54", "G47", "G58", "G49"],
      ["O70", "O61", "O62", "O73", "O68"],

      // Diagonals
      ["B7", "I19", "free", "G58", "O68"],
      ["B8", "I20", "free", "G54", "O70"],

      // 4 corners
      ["B7", "B8", "O70", "O68"],
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
    setShowCelebration(true);
    audioWin.play();
    setTimeout(() => setShowCelebration(false), 30000);
  };

  const playNotwinSound = () => {
    audioNotwin.play();
    audioNotwin.onended = function () {
      handleGoBack();
    };
  };

  const isFourCornersWinning =
    winningNumbers.includes("B7") &&
    winningNumbers.includes("B8") &&
    winningNumbers.includes("O70") &&
    winningNumbers.includes("O68");

  return (
    <div className={styles.container}>
      {showCelebration && <WinCelebration />}
      <div className={styles.celeb}>
        {" "}
        {showCelebration && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[20px] z-50"
          >
            🎉 BINGO! YOU WIN! 🎉
          </motion.div>
        )}
      </div>
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
        <div className={styles.cardnumber}>Card Number 58</div>
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

export default Card58;
