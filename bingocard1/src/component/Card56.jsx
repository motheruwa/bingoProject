import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/Card.module.css"; // Import the CSS module for styling
import { useNavigate } from "react-router-dom";
import Win from "../audio/WIN.mp4";
import Notwin from "../audio/NOTWIN.mp4";
import Replay from "./Replay";
import WinCelebration from "./Wincelebration";
import { motion } from "framer-motion";
function Card56() {
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
      B: [2, 11, 14, 6, 1],
      I: [23, 17, 30, 28, 20],
      N: [41, 44, "free", 36, 31],
      G: [54, 48, 47, 52, 50],
      O: [63, 61, 71, 66, 67],
    };

    // Set the center cell as a free space
    bingoCard.N[2] = "free";

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ["B2", "B11", "B14", "B6", "B1"], // First row (B)
      ["I23", "I17", "I30", "I28", "I20"], // Second row (I)
      ["N41", "N44", "free", "N36", "N31"], // Third row (N)
      ["G54", "G48", "G47", "G52", "G50"], // Fourth row (G)
      ["O63", "O61", "O71", "O66", "O67"], // Fifth row (O)
      ["B2", "I17", "free", "G52", "O67"], // Top-left to bottom-right diagonal
      ["O63", "G48", "free", "I28", "B1"], // Top-right to bottom-left diagonal
      ["B2", "I23", "N41", "G54", "O63"], // First column
      ["B11", "I17", "N44", "G48", "O61"], // Second column
      ["B14", "I30", "free", "G47", "O71"], // Third column
      ["B6", "I28", "N36", "G52", "O66"], // Fourth column
      ["B1", "I20", "N31", "G50", "O67"], // Fifth column
      ["B2", "B1", "O63", "O67"], // corner
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
    winningNumbers.includes("B2") &&
    winningNumbers.includes("B1") &&
    winningNumbers.includes("O63") &&
    winningNumbers.includes("O67");

  return (
    <div className={styles.container}>
      <Replay />
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
        <div className={styles.cardnumber}>Card Number 56</div>
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

export default Card56;
