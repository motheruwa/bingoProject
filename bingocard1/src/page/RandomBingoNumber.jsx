import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BingoCall } from "./BingoCall";
import styles from "../css/RandomBingoNumber.module.css";
import notRegisteredAudio from "../audio/NOTREGISTERD.mp4";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

function RandomBingoNumber() {
  const [selectedName, setSelectedName] = useState(() => {
    const savedName = localStorage.getItem("selectedName");
    return savedName ? savedName : "Xbingo";
  });
  const [currentNumber, setCurrentNumber] = useState("");
  const [calledNumbers, setCalledNumbers] = useState(() => {
    const cachedCalledNumbers = JSON.parse(
      localStorage.getItem("calledNumbers")
    );
    const initialCalledNumbers = new Set(cachedCalledNumbers);
    if (!initialCalledNumbers.has("free")) {
      initialCalledNumbers.add("free");
    }
    return initialCalledNumbers;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [cardNumberInput, setCardNumberInput] = useState("");
  const { user } = useAuthContext();
  // eslint-disable-next-line
  const [cardNumber, setCardNumber] = useState("");
  const [secondsInterval, setSecondsInterval] = useState(() => {
    const storedInterval = localStorage.getItem("secondsInterval");
    return storedInterval ? parseInt(storedInterval) : 3;
  });
  const navigate = useNavigate();
  const registeredNumbers =
    JSON.parse(localStorage.getItem("registeredNumbers")) || [];
  const remainingMoney = localStorage.getItem("remainingMoney") || 0;
  // eslint-disable-next-line
  const [sequenceIndex, setSequenceIndex] = useState(() => {
    const storedIndex = localStorage.getItem("sequenceIndex");
    return storedIndex ? parseInt(storedIndex) : 0;
  });
  // eslint-disable-next-line
  const [playType, setPlayType] = useState(() => {
    const storedPlayType = localStorage.getItem("playType");
    return storedPlayType || "default";
  });
  useEffect(() => {
    localStorage.setItem("secondsInterval", secondsInterval);
  }, [secondsInterval]);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateNumber = (letter) => {
    switch (letter) {
      case "B":
        return `B${generateRandomNumber(1, 15)}`;
      case "I":
        return `I${generateRandomNumber(16, 30)}`;
      case "N":
        return `N${generateRandomNumber(31, 45)}`;
      case "G":
        return `G${generateRandomNumber(46, 60)}`;
      case "O":
        return `O${generateRandomNumber(61, 75)}`;
      default:
        return "";
    }
  };

  const generateRandomBingoNumber = () => {
    const letters = ["B", "I", "N", "G", "O"];
    let newRandomNumber = "";

    if (calledNumbers.size === 76) {
      setIsPlaying(false);
      return;
    }

    do {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      newRandomNumber = generateNumber(randomLetter);
    } while (calledNumbers.has(newRandomNumber));

    setCalledNumbers(new Set(calledNumbers).add(newRandomNumber));
    setCurrentNumber(newRandomNumber);
  };
  const GenerateBingoNumber1 = () => {
    const sequence = [
      "B5",
      "O64",
      "I24",
      "G53",
      "O75",
      "I16",
      "N40",
      "B8",
      "G60",
      "B10",
      "O62",
      "O73",
      "B13",
      "I28",
      "G50",
      "N34",
      "I19",
      "O66",
      "G46",
      "O72",
      "N36",
      "B12",
      "I23",
      "N38",
      "B7",
      "G56",
      "N45",
      "B14",
      "I27",
      "G55",
      "N31",
      "B2",
      "O65",
      "N37",
      "I21",
      "G57",
      "B6",
      "O61",
      "O68",
      "G51",
      "I26",
      "N42",
      "N43",
      "G59",
      "I29",
      "G52",
      "I22",
      "O71",
      "O67",
      "G54",
      "B11",
      "I30",
      "B4",
      "N35",
      "I17",
      "N41",
      "N32",
      "B15",
      "O70",
      "B9",
      "I25",
      "N33",
      "G58",
      "O63",
      "I18",
      "G49",
      "B1",
      "O69",
      "N39",
      "G48",
      "I20",
      "G47",
      "O74",
      "B3",
      "N44",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber2 = () => {
    const sequence = [
      "B3",
      "G49",
      "I30",
      "O65",
      "G51",
      "I26",
      "O69",
      "N40",
      "G50",
      "B9",
      "N36",
      "O73",
      "G59",
      "B6",
      "G54",
      "N35",
      "I17",
      "O66",
      "G46",
      "O72",
      "I20",
      "N41",
      "G52",
      "B5",
      "O63",
      "G47",
      "N45",
      "N31",
      "I21",
      "N38",
      "B4",
      "I24",
      "O62",
      "B1",
      "B15",
      "G57",
      "I28",
      "N33",
      "G55",
      "B7",
      "N43",
      "N42",
      "G58",
      "N44",
      "O71",
      "B11",
      "N32",
      "O75",
      "O67",
      "G60",
      "I29",
      "I23",
      "B14",
      "B8",
      "I19",
      "O68",
      "I27",
      "B2",
      "B13",
      "B10",
      "O61",
      "I25",
      "N34",
      "O70",
      "G53",
      "I18",
      "O64",
      "B12",
      "N39",
      "G48",
      "N37",
      "G56",
      "O74",
      "I16",
      "I22",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber3 = () => {
    const sequence = [
      "G60",
      "I16",
      "O64",
      "B3",
      "O62",
      "I27",
      "O69",
      "N40",
      "G50",
      "B9",
      "I26",
      "O63",
      "O74",
      "B12",
      "N34",
      "I28",
      "I17",
      "O66",
      "G55",
      "O65",
      "N33",
      "N43",
      "O72",
      "G49",
      "O71",
      "N39",
      "N45",
      "B7",
      "I29",
      "G54",
      "N31",
      "I22",
      "O73",
      "N37",
      "B5",
      "G59",
      "I20",
      "B1",
      "O70",
      "B8",
      "N41",
      "G56",
      "I18",
      "N42",
      "G51",
      "B6",
      "B13",
      "O75",
      "O67",
      "B15",
      "B11",
      "G52",
      "B4",
      "B10",
      "I19",
      "O68",
      "N36",
      "B2",
      "I24",
      "B14",
      "O61",
      "I21",
      "N32",
      "G58",
      "G53",
      "I25",
      "I30",
      "G46",
      "N44",
      "G48",
      "N35",
      "G47",
      "G57",
      "N38",
      "I23",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber4 = () => {
    const sequence = [
      "O72",
      "N35",
      "O64",
      "B2",
      "I25",
      "I27",
      "B5",
      "N36",
      "N43",
      "B9",
      "G48",
      "O63",
      "N40",
      "G50",
      "N45",
      "I28",
      "O62",
      "O65",
      "I26",
      "O66",
      "O69",
      "N44",
      "I22",
      "G49",
      "O67",
      "G56",
      "I16",
      "B14",
      "B1",
      "G46",
      "G52",
      "I21",
      "O73",
      "N38",
      "I24",
      "G57",
      "I20",
      "I29",
      "O70",
      "B7",
      "N41",
      "N42",
      "I22",
      "G55",
      "B13",
      "B6",
      "B15",
      "O71",
      "O75",
      "N32",
      "B3",
      "G54",
      "B4",
      "B8",
      "I19",
      "O68",
      "O74",
      "B11",
      "G47",
      "B10",
      "I17",
      "N33",
      "G58",
      "G53",
      "I18",
      "I30",
      "O61",
      "N31",
      "N39",
      "G60",
      "N37",
      "B12",
      "G59",
      "N34",
      "G51",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber5 = () => {
    const sequence = [
      "B1",
      "G56",
      "B10",
      "O62",
      "I25",
      "O61",
      "N40",
      "I26",
      "O75",
      "N37",
      "G49",
      "B4",
      "N41",
      "G59",
      "N35",
      "I18",
      "O73",
      "I23",
      "B9",
      "O65",
      "N36",
      "G58",
      "O66",
      "G48",
      "N32",
      "G57",
      "I16",
      "B13",
      "I29",
      "G46",
      "N39",
      "I21",
      "O70",
      "B2",
      "O72",
      "G55",
      "N42",
      "O63",
      "O74",
      "B7",
      "I20",
      "B5",
      "I22",
      "O69",
      "G51",
      "G47",
      "B12",
      "O71",
      "O67",
      "N44",
      "B11",
      "G52",
      "G60",
      "B8",
      "I19",
      "O68",
      "B15",
      "B3",
      "B6",
      "O64",
      "I17",
      "N33",
      "N43",
      "G53",
      "I28",
      "I30",
      "I27",
      "G54",
      "N31",
      "N45",
      "N34",
      "I24",
      "G50",
      "N38",
      "B14",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber6 = () => {
    const sequence = [
      "I28",
      "B11",
      "O62",
      "O72",
      "I25",
      "I21",
      "G46",
      "I26",
      "G60",
      "I18",
      "N41",
      "B1",
      "N40",
      "G59",
      "I30",
      "G53",
      "O73",
      "I20",
      "B2",
      "O65",
      "N44",
      "N43",
      "O66",
      "B6",
      "N34",
      "G56",
      "I19",
      "B14",
      "I29",
      "B13",
      "N31",
      "O61",
      "G57",
      "O68",
      "B15",
      "B10",
      "I23",
      "O63",
      "O70",
      "B7",
      "G48",
      "B5",
      "I22",
      "O75",
      "G54",
      "N33",
      "B12",
      "N35",
      "O67",
      "N32",
      "G55",
      "G52",
      "B4",
      "B8",
      "I16",
      "O69",
      "O74",
      "G49",
      "I24",
      "O64",
      "I17",
      "B3",
      "G58",
      "N37",
      "B9",
      "O71",
      "I27",
      "G51",
      "N39",
      "N45",
      "N36",
      "N42",
      "G50",
      "N38",
      "G47",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber7 = () => {
    const sequence = [
      "G58",
      "B15",
      "B8",
      "G50",
      "O64",
      "G49",
      "I28",
      "I21",
      "G59",
      "O68",
      "N40",
      "G48",
      "G51",
      "N36",
      "I30",
      "O71",
      "O73",
      "G54",
      "I23",
      "O65",
      "I19",
      "N43",
      "G46",
      "B13",
      "N44",
      "G56",
      "I16",
      "B7",
      "I29",
      "O66",
      "N31",
      "O61",
      "B10",
      "G60",
      "O72",
      "G57",
      "O63",
      "B14",
      "O70",
      "B1",
      "B3",
      "G53",
      "O75",
      "N45",
      "I26",
      "O69",
      "N34",
      "I22",
      "O67",
      "N32",
      "G55",
      "G52",
      "N41",
      "O62",
      "B4",
      "I18",
      "O74",
      "B5",
      "B6",
      "I25",
      "I17",
      "N33",
      "G47",
      "N37",
      "B2",
      "N35",
      "I27",
      "I20",
      "N39",
      "N42",
      "I24",
      "B12",
      "B11",
      "N38",
      "B9",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber8 = () => {
    const sequence = [
      "B7",
      "O69",
      "B8",
      "N36",
      "O64",
      "I19",
      "I28",
      "O61",
      "I26",
      "B11",
      "N40",
      "N45",
      "O67",
      "G50",
      "N39",
      "B2",
      "G53",
      "G54",
      "N43",
      "O65",
      "G49",
      "B13",
      "O66",
      "I23",
      "N44",
      "G56",
      "I16",
      "B14",
      "I29",
      "G46",
      "G59",
      "I21",
      "B10",
      "G60",
      "O72",
      "G57",
      "O63",
      "O70",
      "O68",
      "B4",
      "B5",
      "O73",
      "O75",
      "N42",
      "G48",
      "B15",
      "B9",
      "I22",
      "G51",
      "N32",
      "G55",
      "G52",
      "N41",
      "O62",
      "B1",
      "I30",
      "O74",
      "B3",
      "B6",
      "I25",
      "I17",
      "N33",
      "G47",
      "N37",
      "O71",
      "N35",
      "I27",
      "I20",
      "B12",
      "I18",
      "I24",
      "N34",
      "G58",
      "N38",
      "N31",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber9 = () => {
    const sequence = [
      "N33",
      "G55",
      "B8",
      "O62",
      "G54",
      "N44",
      "B2",
      "O72",
      "N42",
      "B11",
      "N40",
      "N45",
      "O67",
      "G50",
      "N39",
      "I28",
      "G53",
      "O65",
      "B13",
      "I18",
      "G49",
      "N43",
      "O66",
      "I23",
      "I19",
      "G56",
      "I16",
      "B14",
      "I29",
      "G58",
      "N31",
      "I21",
      "G57",
      "G60",
      "O61",
      "B10",
      "O63",
      "O70",
      "B5",
      "N38",
      "G46",
      "O73",
      "B15",
      "I26",
      "B9",
      "O75",
      "B12",
      "I22",
      "G51",
      "N32",
      "O69",
      "G52",
      "N41",
      "N36",
      "B4",
      "I30",
      "O74",
      "B3",
      "B6",
      "I25",
      "I17",
      "B7",
      "G47",
      "N37",
      "O71",
      "N35",
      "I27",
      "I20",
      "O64",
      "G48",
      "I24",
      "N34",
      "O68",
      "B1",
      "G59",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber10 = () => {
    const sequence = [
      "B7",
      "O75",
      "B8",
      "O62",
      "G54",
      "G59",
      "B2",
      "O70",
      "N42",
      "B11",
      "N38",
      "N45",
      "O67",
      "G57",
      "N37",
      "I28",
      "I23",
      "I18",
      "G49",
      "O65",
      "G48",
      "N43",
      "O66",
      "G53",
      "I19",
      "G56",
      "I16",
      "B14",
      "I29",
      "G46",
      "O73",
      "I21",
      "B10",
      "G60",
      "O69",
      "G50",
      "O63",
      "O72",
      "N44",
      "B1",
      "B5",
      "N31",
      "G55",
      "I26",
      "B9",
      "B15",
      "B12",
      "I22",
      "G51",
      "N32",
      "O61",
      "G52",
      "N41",
      "N36",
      "B4",
      "I30",
      "O74",
      "B3",
      "B6",
      "I25",
      "I17",
      "N33",
      "G47",
      "N39",
      "O71",
      "N35",
      "I27",
      "I20",
      "O64",
      "B13",
      "I24",
      "N34",
      "O68",
      "N40",
      "N44",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber11 = () => {
    const sequence = [
      "B4",
      "O73",
      "N41",
      "O72",
      "O64",
      "G59",
      "B2",
      "O70",
      "N42",
      "B11",
      "N38",
      "I24",
      "B5",
      "O71",
      "N44",
      "N37",
      "O63",
      "I18",
      "O68",
      "O62",
      "G49",
      "G58",
      "O66",
      "G53",
      "I19",
      "G56",
      "I16",
      "N43",
      "I29",
      "G46",
      "N31",
      "I21",
      "B10",
      "G60",
      "O61",
      "G50",
      "I23",
      "O65",
      "B14",
      "B1",
      "O67",
      "O75",
      "G55",
      "I26",
      "B9",
      "B15",
      "B12",
      "I22",
      "G51",
      "N32",
      "O69",
      "G52",
      "B8",
      "N36",
      "B7",
      "I30",
      "O74",
      "B3",
      "B6",
      "I25",
      "I17",
      "N33",
      "G47",
      "N39",
      "G57",
      "N35",
      "I27",
      "I20",
      "G54",
      "B13",
      "N45",
      "N34",
      "G48",
      "N40",
      "I28",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber12 = () => {
    const sequence = [
      "N35",
      "O69",
      "N42",
      "N39",
      "B9",
      "G59",
      "N38",
      "O70",
      "N41",
      "I26",
      "B13",
      "I24",
      "B5",
      "O71",
      "N44",
      "I28",
      "O63",
      "N43",
      "O68",
      "B12",
      "G49",
      "B14",
      "O66",
      "G53",
      "I19",
      "N45",
      "I16",
      "G48",
      "I29",
      "G46",
      "N31",
      "I20",
      "B10",
      "G60",
      "O61",
      "G50",
      "I23",
      "O65",
      "I22",
      "B1",
      "O67",
      "O75",
      "G55",
      "B11",
      "O64",
      "B15",
      "O62",
      "G58",
      "G51",
      "N32",
      "O73",
      "G52",
      "B8",
      "N36",
      "B7",
      "I30",
      "O74",
      "B3",
      "B6",
      "I25",
      "I17",
      "N33",
      "G47",
      "O72",
      "G57",
      "B4",
      "I27",
      "I21",
      "G54",
      "B2",
      "G56",
      "N34",
      "I18",
      "N40",
      "N37",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber13 = () => {
    const sequence = [
      "B9",
      "O68",
      "N40",
      "N45",
      "G51",
      "G59",
      "I26",
      "O70",
      "N41",
      "N38",
      "B14",
      "I24",
      "O73",
      "I28",
      "G48",
      "O71",
      "O64",
      "N43",
      "I23",
      "B12",
      "N31",
      "B13",
      "O66",
      "G53",
      "I19",
      "G56",
      "I16",
      "I18",
      "I29",
      "G46",
      "G49",
      "I21",
      "B10",
      "G60",
      "N37",
      "G50",
      "O69",
      "O65",
      "G58",
      "B1",
      "O67",
      "O75",
      "G55",
      "B11",
      "O63",
      "B15",
      "O62",
      "I22",
      "N35",
      "N32",
      "B5",
      "G52",
      "B8",
      "N36",
      "B7",
      "I30",
      "O74",
      "B3",
      "B6",
      "I25",
      "I17",
      "N33",
      "G47",
      "O72",
      "G57",
      "B4",
      "I27",
      "I20",
      "G54",
      "B2",
      "N39",
      "N34",
      "N44",
      "N42",
      "O61",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber14 = () => {
    const sequence = [
      "O67",
      "B7",
      "N40",
      "O61",
      "G51",
      "I28",
      "O71",
      "B10",
      "N41",
      "N38",
      "B14",
      "N44",
      "O73",
      "G54",
      "N45",
      "O74",
      "G57",
      "O64",
      "I23",
      "B13",
      "N31",
      "O65",
      "O66",
      "G53",
      "I19",
      "G56",
      "I16",
      "I18",
      "I29",
      "G58",
      "G49",
      "N33",
      "O70",
      "G60",
      "N37",
      "G50",
      "O69",
      "N43",
      "G46",
      "B5",
      "B9",
      "O75",
      "G55",
      "B11",
      "O63",
      "B15",
      "O62",
      "I22",
      "N35",
      "N32",
      "B1",
      "G52",
      "B8",
      "N36",
      "O68",
      "I30",
      "I26",
      "B3",
      "B6",
      "I25",
      "I17",
      "I21",
      "G47",
      "O72",
      "B12",
      "B4",
      "I27",
      "I20",
      "G59",
      "B2",
      "N39",
      "N34",
      "I24",
      "N42",
      "G48",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber15 = () => {
    const sequence = [
      "I22",
      "B7",
      "N38",
      "O61",
      "G46",
      "B12",
      "O71",
      "B10",
      "N41",
      "N40",
      "B5",
      "N44",
      "G48",
      "G54",
      "N45",
      "I23",
      "G57",
      "O66",
      "I30",
      "O65",
      "N31",
      "B13",
      "O64",
      "G55",
      "I19",
      "G56",
      "O73",
      "I18",
      "B2",
      "G51",
      "G50",
      "I21",
      "O70",
      "B9",
      "N37",
      "G49",
      "O69",
      "N43",
      "G58",
      "N39",
      "G60",
      "O75",
      "G53",
      "B11",
      "O63",
      "B15",
      "O62",
      "O67",
      "N35",
      "N32",
      "B14",
      "G52",
      "B8",
      "N36",
      "O68",
      "O74",
      "I26",
      "B3",
      "B6",
      "I25",
      "I17",
      "N33",
      "G47",
      "O72",
      "I28",
      "B4",
      "I27",
      "I20",
      "G59",
      "I29",
      "B1",
      "N34",
      "I24",
      "N42",
      "I16",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber16 = () => {
    const sequence = [
      "O62",
      "B7",
      "N38",
      "O61",
      "G46",
      "I17",
      "O71",
      "B10",
      "N41",
      "N40",
      "B13",
      "I26",
      "G48",
      "G54",
      "O72",
      "I30",
      "O75",
      "G50",
      "O67",
      "O65",
      "N31",
      "N44",
      "O64",
      "G53",
      "I19",
      "O66",
      "O73",
      "I18",
      "I29",
      "N45",
      "G49",
      "O68",
      "O70",
      "G60",
      "N37",
      "G56",
      "O69",
      "N43",
      "G58",
      "N42",
      "B9",
      "G57",
      "G55",
      "B11",
      "O63",
      "B15",
      "I22",
      "I23",
      "N35",
      "N32",
      "B14",
      "G52",
      "B8",
      "N36",
      "I21",
      "O74",
      "B5",
      "B3",
      "B6",
      "I25",
      "B12",
      "N33",
      "G47",
      "G51",
      "I28",
      "B4",
      "I27",
      "I20",
      "G59",
      "B2",
      "N39",
      "N34",
      "I24",
      "B1",
      "I16",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber17 = () => {
    const sequence = [
      "I28",
      "I21",
      "G60",
      "O61",
      "G46",
      "O72",
      "B2",
      "I27",
      "N41",
      "N35",
      "O74",
      "I26",
      "G48",
      "G54",
      "I17",
      "I30",
      "O68",
      "G50",
      "O67",
      "I25",
      "N31",
      "I24",
      "O64",
      "G59",
      "O71",
      "G56",
      "O65",
      "I18",
      "I29",
      "G51",
      "G49",
      "N42",
      "O63",
      "N32",
      "N37",
      "G58",
      "O69",
      "N43",
      "O66",
      "B1",
      "B7",
      "G57",
      "G55",
      "B11",
      "O70",
      "B15",
      "I22",
      "I23",
      "N40",
      "N38",
      "B14",
      "G52",
      "B8",
      "N36",
      "O75",
      "B13",
      "B5",
      "B3",
      "B6",
      "O73",
      "B12",
      "N33",
      "G47",
      "N45",
      "O62",
      "B4",
      "B10",
      "I20",
      "G53",
      "I19",
      "N39",
      "N34",
      "N44",
      "B9",
      "I16",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber18 = () => {
    const sequence = [
      "G52",
      "O74",
      "O70",
      "O61",
      "G46",
      "I16",
      "B8",
      "N33",
      "N41",
      "N35",
      "B13",
      "I26",
      "G48",
      "I22",
      "I17",
      "G51",
      "O68",
      "O72",
      "O67",
      "N43",
      "N31",
      "I24",
      "O64",
      "G53",
      "I19",
      "G56",
      "G54",
      "I18",
      "I29",
      "G50",
      "G49",
      "B7",
      "G60",
      "O62",
      "N37",
      "O66",
      "O69",
      "G59",
      "G58",
      "B1",
      "N42",
      "G57",
      "G55",
      "B11",
      "O63",
      "B15",
      "O73",
      "I23",
      "N40",
      "N32",
      "B14",
      "I28",
      "B2",
      "N36",
      "O75",
      "I21",
      "B5",
      "B3",
      "B6",
      "O65",
      "B12",
      "I27",
      "G47",
      "N45",
      "N38",
      "B4",
      "B10",
      "I20",
      "I25",
      "O71",
      "N39",
      "N34",
      "N44",
      "B9",
      "I30",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber19 = () => {
    const sequence = [
      "I26",
      "O74",
      "O62",
      "O61",
      "N39",
      "I25",
      "G49",
      "N33",
      "N41",
      "O67",
      "B13",
      "G52",
      "G48",
      "I22",
      "B1",
      "I19",
      "O68",
      "O72",
      "B4",
      "N43",
      "N31",
      "I24",
      "O64",
      "G53",
      "I28",
      "G56",
      "O73",
      "I18",
      "O65",
      "I30",
      "B8",
      "I23",
      "G60",
      "N38",
      "I20",
      "O66",
      "O69",
      "I16",
      "G58",
      "G47",
      "B9",
      "G57",
      "G55",
      "B11",
      "O63",
      "B15",
      "G54",
      "B8",
      "N40",
      "N32",
      "B14",
      "I17",
      "B2",
      "N36",
      "O75",
      "I21",
      "B5",
      "B3",
      "B6",
      "I29",
      "B12",
      "I27",
      "G51",
      "N45",
      "O70",
      "N35",
      "B10",
      "N37",
      "G59",
      "O71",
      "G46",
      "N34",
      "N44",
      "N42",
      "G50",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber20 = () => {
    const sequence = [
      "N35",
      "O74",
      "O62",
      "N38",
      "O71",
      "I24",
      "O68",
      "N32",
      "N41",
      "O67",
      "N44",
      "G52",
      "G48",
      "I22",
      "B4",
      "G58",
      "G59",
      "I19",
      "B1",
      "O64",
      "N31",
      "I25",
      "N43",
      "G53",
      "O72",
      "G56",
      "O73",
      "I18",
      "I29",
      "I30",
      "B8",
      "O75",
      "G60",
      "O61",
      "N37",
      "O66",
      "O69",
      "I16",
      "G47",
      "I17",
      "B9",
      "G57",
      "G55",
      "B11",
      "O63",
      "B15",
      "G54",
      "I23",
      "N40",
      "N33",
      "B14",
      "I28",
      "B2",
      "N36",
      "B13",
      "I21",
      "B5",
      "B3",
      "B6",
      "O65",
      "B12",
      "I27",
      "G51",
      "N45",
      "O70",
      "I26",
      "B10",
      "I20",
      "G49",
      "N39",
      "G46",
      "N34",
      "B7",
      "N42",
      "G50",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber21 = () => {
    const sequence = [
      "O63",
      "B15",
      "O62",
      "N38",
      "N31",
      "I18",
      "O68",
      "N32",
      "N41",
      "O67",
      "G46",
      "I27",
      "G48",
      "B6",
      "G49",
      "O61",
      "G59",
      "I19",
      "B1",
      "O75",
      "O71",
      "I25",
      "O64",
      "G57",
      "O72",
      "G56",
      "O73",
      "I24",
      "I29",
      "I30",
      "B13",
      "B7",
      "G60",
      "G58",
      "N37",
      "O66",
      "O69",
      "I16",
      "G47",
      "G53",
      "B9",
      "I17",
      "G55",
      "B11",
      "N35",
      "O74",
      "G54",
      "I23",
      "N40",
      "N33",
      "B14",
      "I28",
      "B2",
      "N36",
      "B8",
      "I21",
      "B5",
      "B3",
      "I22",
      "O65",
      "B12",
      "G52",
      "G51",
      "N45",
      "O70",
      "I26",
      "B10",
      "I20",
      "B4",
      "N39",
      "N44",
      "N34",
      "N43",
      "N42",
      "G50",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber22 = () => {
    const sequence = [
      "N44",
      "B15",
      "O62",
      "O70",
      "N31",
      "I18",
      "B3",
      "B8",
      "I20",
      "O67",
      "N34",
      "O66",
      "G48",
      "B6",
      "N35",
      "G60",
      "G59",
      "N40",
      "B1",
      "I25",
      "N41",
      "N32",
      "O64",
      "G53",
      "O72",
      "G56",
      "O73",
      "I24",
      "I29",
      "I30",
      "O75",
      "B7",
      "O61",
      "G58",
      "B13",
      "I27",
      "O69",
      "I19",
      "G47",
      "I17",
      "N42",
      "G57",
      "O71",
      "B11",
      "G49",
      "O74",
      "G54",
      "I23",
      "I16",
      "N33",
      "B14",
      "I28",
      "B2",
      "N36",
      "N37",
      "I21",
      "B5",
      "O68",
      "I22",
      "O65",
      "B12",
      "G52",
      "G51",
      "N45",
      "N38",
      "I26",
      "B10",
      "G55",
      "B4",
      "N39",
      "O63",
      "G46",
      "N43",
      "B9",
      "G50",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber23 = () => {
    const sequence = [
      "B7",
      "I27",
      "O63",
      "O70",
      "I21",
      "I18",
      "B3",
      "G48",
      "I20",
      "O67",
      "O62",
      "O69",
      "B8",
      "B6",
      "N35",
      "I16",
      "G59",
      "N40",
      "B10",
      "I23",
      "G53",
      "I25",
      "O66",
      "I17",
      "O72",
      "N38",
      "O73",
      "I24",
      "O74",
      "I30",
      "N34",
      "N44",
      "O61",
      "G58",
      "O68",
      "B9",
      "O64",
      "G60",
      "G54",
      "N41",
      "B15",
      "G57",
      "G55",
      "B1",
      "G49",
      "I29",
      "G47",
      "N32",
      "I19",
      "N33",
      "B14",
      "I28",
      "B2",
      "N36",
      "B13",
      "N31",
      "B5",
      "N37",
      "I22",
      "O65",
      "B12",
      "G52",
      "G51",
      "N45",
      "G56",
      "I26",
      "B11",
      "O71",
      "B4",
      "N39",
      "O75",
      "G46",
      "N43",
      "N42",
      "G50",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber24 = () => {
    const sequence = [
      "I19",
      "G48",
      "O63",
      "O70",
      "I26",
      "O75",
      "B8",
      "N38",
      "B13",
      "O67",
      "O62",
      "G59",
      "N43",
      "B6",
      "N35",
      "N31",
      "G46",
      "N40",
      "I21",
      "I23",
      "B9",
      "I25",
      "O64",
      "G53",
      "O72",
      "G56",
      "O73",
      "I24",
      "I29",
      "B3",
      "I18",
      "N44",
      "O61",
      "G58",
      "N37",
      "O65",
      "O66",
      "G60",
      "G47",
      "N41",
      "I17",
      "B12",
      "G55",
      "B11",
      "G49",
      "O74",
      "G54",
      "N32",
      "B10",
      "N33",
      "B14",
      "I28",
      "B2",
      "N36",
      "I20",
      "I16",
      "B5",
      "O68",
      "I22",
      "B15",
      "G57",
      "G52",
      "G51",
      "N45",
      "I27",
      "B7",
      "B1",
      "O71",
      "B4",
      "N39",
      "N34",
      "O69",
      "I30",
      "N42",
      "G50",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber25 = () => {
    const sequence = [
      "G56",
      "I27",
      "O63",
      "O70",
      "I29",
      "O74",
      "B8",
      "N38",
      "N45",
      "O67",
      "G59",
      "O69",
      "N43",
      "B6",
      "I22",
      "B3",
      "G48",
      "I30",
      "B7",
      "I23",
      "N36",
      "O68",
      "O64",
      "I28",
      "O72",
      "I19",
      "O73",
      "I24",
      "N42",
      "N40",
      "I18",
      "N44",
      "O61",
      "G58",
      "N37",
      "B15",
      "O66",
      "G51",
      "O75",
      "N41",
      "I17",
      "B14",
      "G55",
      "B1",
      "G49",
      "G47",
      "G54",
      "N32",
      "B10",
      "N33",
      "G57",
      "I25",
      "B2",
      "B9",
      "I20",
      "I16",
      "B5",
      "G53",
      "N35",
      "O65",
      "B12",
      "G52",
      "G60",
      "B13",
      "G46",
      "I21",
      "B11",
      "O71",
      "B4",
      "N39",
      "N34",
      "O62",
      "N31",
      "I26",
      "G50",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber26 = () => {
    const sequence = [
      "G56",
      "I27",
      "B14",
      "B3",
      "N39",
      "O74",
      "B6",
      "N38",
      "G58",
      "G50",
      "I20",
      "N35",
      "G60",
      "B10",
      "I22",
      "B2",
      "G53",
      "I30",
      "B7",
      "O64",
      "B9",
      "N34",
      "G57",
      "G48",
      "O72",
      "I19",
      "O73",
      "I24",
      "O67",
      "N40",
      "I18",
      "N44",
      "O61",
      "I29",
      "N37",
      "B15",
      "O66",
      "N43",
      "G47",
      "N41",
      "O70",
      "I23",
      "G55",
      "B11",
      "G49",
      "O75",
      "G54",
      "N32",
      "B8",
      "N33",
      "O63",
      "I25",
      "I17",
      "N36",
      "G59",
      "I16",
      "B5",
      "O68",
      "O69",
      "O65",
      "B12",
      "G52",
      "G51",
      "B13",
      "G46",
      "I21",
      "B1",
      "O71",
      "B4",
      "N45",
      "I28",
      "O62",
      "N31",
      "N42",
      "I26",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber27 = () => {
    const sequence = [
      "I30",
      "O64",
      "B14",
      "G51",
      "B1",
      "G53",
      "O68",
      "N38",
      "G58",
      "G50",
      "I28",
      "N35",
      "G47",
      "N31",
      "I22",
      "G56",
      "O62",
      "B10",
      "B13",
      "O67",
      "B9",
      "N44",
      "I27",
      "G48",
      "O72",
      "I19",
      "O73",
      "I24",
      "I26",
      "N40",
      "I18",
      "I20",
      "O61",
      "N45",
      "N37",
      "B15",
      "O66",
      "N43",
      "G60",
      "N41",
      "I17",
      "I23",
      "G55",
      "B11",
      "G49",
      "O75",
      "G54",
      "N32",
      "B8",
      "N33",
      "O63",
      "I25",
      "O70",
      "N36",
      "G59",
      "I16",
      "B5",
      "B6",
      "O69",
      "O65",
      "B12",
      "G52",
      "B3",
      "B7",
      "G46",
      "I21",
      "N39",
      "O71",
      "B4",
      "I29",
      "N34",
      "O74",
      "B2",
      "N42",
      "G57",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber28 = () => {
    const sequence = [
      "I24",
      "G60",
      "B3",
      "N42",
      "B1",
      "G56",
      "O62",
      "N38",
      "B14",
      "I18",
      "I28",
      "N34",
      "O69",
      "I16",
      "I22",
      "O63",
      "B7",
      "B2",
      "N33",
      "O67",
      "N39",
      "N44",
      "I27",
      "G48",
      "O72",
      "I19",
      "O73",
      "I30",
      "I26",
      "N40",
      "G50",
      "I20",
      "O61",
      "N45",
      "N37",
      "B15",
      "O66",
      "N43",
      "O64",
      "N41",
      "I17",
      "I23",
      "G55",
      "B11",
      "G49",
      "O75",
      "G54",
      "N32",
      "B8",
      "B13",
      "G53",
      "I25",
      "O70",
      "N36",
      "G59",
      "N31",
      "B5",
      "B6",
      "G47",
      "O65",
      "B12",
      "G52",
      "G58",
      "O68",
      "G46",
      "I21",
      "B9",
      "O71",
      "B4",
      "I29",
      "N35",
      "O74",
      "B10",
      "G51",
      "G57",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber29 = () => {
    const sequence = [
      "O74",
      "G60",
      "G59",
      "N42",
      "I16",
      "I25",
      "O62",
      "N38",
      "B14",
      "I18",
      "I28",
      "G47",
      "O69",
      "B1",
      "I19",
      "G51",
      "I21",
      "G57",
      "N33",
      "I26",
      "N39",
      "N44",
      "I27",
      "G48",
      "O72",
      "I22",
      "O73",
      "I30",
      "O67",
      "N40",
      "G50",
      "I20",
      "O61",
      "N45",
      "N37",
      "B15",
      "O66",
      "N43",
      "O64",
      "N41",
      "I17",
      "I23",
      "G55",
      "B11",
      "G49",
      "O75",
      "G54",
      "N32",
      "B8",
      "B13",
      "G53",
      "G56",
      "O70",
      "N36",
      "B3",
      "N31",
      "B5",
      "B6",
      "N34",
      "O65",
      "B12",
      "G52",
      "G58",
      "O68",
      "G46",
      "B7",
      "B9",
      "O71",
      "B4",
      "I29",
      "N35",
      "I24",
      "B10",
      "O63",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber30 = () => {
    const sequence = [
      "B13",
      "N40",
      "G59",
      "B8",
      "I16",
      "I25",
      "O62",
      "O72",
      "N31",
      "I18",
      "I28",
      "G47",
      "O69",
      "B9",
      "G56",
      "I22",
      "B6",
      "G57",
      "N33",
      "I26",
      "B11",
      "N44",
      "I27",
      "G48",
      "N38",
      "G51",
      "O73",
      "I30",
      "O67",
      "G60",
      "G50",
      "I20",
      "O61",
      "N45",
      "N37",
      "B15",
      "O66",
      "N43",
      "O64",
      "N41",
      "I17",
      "I23",
      "G55",
      "N39",
      "G49",
      "O75",
      "G54",
      "N32",
      "N42",
      "O74",
      "G53",
      "I19",
      "O70",
      "N36",
      "B3",
      "B14",
      "B5",
      "I21",
      "N34",
      "O65",
      "B12",
      "G52",
      "G58",
      "O68",
      "G46",
      "B7",
      "B1",
      "O71",
      "B4",
      "I29",
      "N35",
      "I24",
      "B10",
      "O63",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber40 = () => {
    const sequence = [
      "B14",
      "N40",
      "G59",
      "B8",
      "I26",
      "I25",
      "O62",
      "O75",
      "N31",
      "I18",
      "I28",
      "G47",
      "O67",
      "B9",
      "G56",
      "I24",
      "B6",
      "G57",
      "N33",
      "I20",
      "B11",
      "N44",
      "I27",
      "G48",
      "N38",
      "G51",
      "O73",
      "I30",
      "O69",
      "G60",
      "G53",
      "I16",
      "O61",
      "N43",
      "N37",
      "B2",
      "O65",
      "N45",
      "O63",
      "N41",
      "I17",
      "N34",
      "G55",
      "N39",
      "G49",
      "B12",
      "G54",
      "N36",
      "N42",
      "O74",
      "G50",
      "B10",
      "O70",
      "N32",
      "B3",
      "B13",
      "B5",
      "I21",
      "I23",
      "O66",
      "O72",
      "G52",
      "G58",
      "O68",
      "G46",
      "B7",
      "B1",
      "O71",
      "B4",
      "I29",
      "N35",
      "I22",
      "I19",
      "O64",
      "B15",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber41 = () => {
    const sequence = [
      "N31",
      "N40",
      "G59",
      "B8",
      "I18",
      "I25",
      "O62",
      "O71",
      "B13",
      "I17",
      "I28",
      "G47",
      "O69",
      "B4",
      "G56",
      "I23",
      "B6",
      "G46",
      "N33",
      "I26",
      "B11",
      "N44",
      "I20",
      "G48",
      "N38",
      "G52",
      "O73",
      "I30",
      "O67",
      "G60",
      "N43",
      "I27",
      "O61",
      "N45",
      "N37",
      "B15",
      "O65",
      "G50",
      "O64",
      "N39",
      "I16",
      "I22",
      "G55",
      "N41",
      "O75",
      "G49",
      "B14",
      "N32",
      "B2",
      "O74",
      "G53",
      "B7",
      "O70",
      "N36",
      "B3",
      "G54",
      "B5",
      "I21",
      "N34",
      "O66",
      "B12",
      "G51",
      "G58",
      "O68",
      "G57",
      "I19",
      "B1",
      "O72",
      "B9",
      "I29",
      "N35",
      "I24",
      "B10",
      "O63",
      "N42",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber42 = () => {
    const sequence = [
      "B13",
      "N40",
      "G59",
      "B8",
      "I16",
      "I25",
      "O62",
      "O72",
      "N31",
      "I18",
      "I23",
      "G47",
      "O69",
      "B9",
      "G56",
      "I22",
      "B7",
      "G50",
      "N33",
      "I26",
      "B11",
      "N44",
      "I27",
      "G48",
      "N38",
      "G54",
      "O73",
      "I30",
      "O67",
      "G60",
      "G58",
      "I20",
      "O65",
      "N42",
      "N32",
      "B15",
      "O66",
      "N43",
      "O64",
      "N41",
      "I17",
      "I24",
      "G55",
      "O68",
      "G49",
      "B2",
      "G51",
      "N37",
      "N45",
      "O74",
      "G53",
      "I19",
      "O70",
      "N36",
      "B3",
      "B14",
      "B5",
      "I21",
      "N34",
      "O61",
      "B12",
      "G52",
      "G57",
      "N39",
      "G46",
      "B6",
      "B1",
      "O71",
      "B4",
      "I29",
      "N35",
      "I28",
      "B10",
      "O63",
      "O75",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber43 = () => {
    const sequence = [
      "B4",
      "G60",
      "G59",
      "B6",
      "I18",
      "I25",
      "O62",
      "O72",
      "G54",
      "I16",
      "O66",
      "G47",
      "O67",
      "B15",
      "G58",
      "I24",
      "B8",
      "G57",
      "N43",
      "I29",
      "B11",
      "N45",
      "I27",
      "G48",
      "N38",
      "G51",
      "O73",
      "I17",
      "O69",
      "N40",
      "G55",
      "I20",
      "O71",
      "N44",
      "N35",
      "B3",
      "I28",
      "N33",
      "O64",
      "N41",
      "I30",
      "I23",
      "O70",
      "N34",
      "G49",
      "B12",
      "N31",
      "N32",
      "N42",
      "O74",
      "G53",
      "I19",
      "G50",
      "N36",
      "B9",
      "B14",
      "B5",
      "I21",
      "N39",
      "O65",
      "O75",
      "G52",
      "G56",
      "O68",
      "G46",
      "B7",
      "B1",
      "O61",
      "B13",
      "I26",
      "N37",
      "I22",
      "B10",
      "O63",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber44 = () => {
    const sequence = [
      "B1",
      "N44",
      "G57",
      "B8",
      "I16",
      "I25",
      "O62",
      "O73",
      "N31",
      "I19",
      "G51",
      "N36",
      "O69",
      "B9",
      "G56",
      "I27",
      "B6",
      "G53",
      "N33",
      "I26",
      "B5",
      "N42",
      "I22",
      "G48",
      "N38",
      "I28",
      "O72",
      "I30",
      "O67",
      "G60",
      "G52",
      "I20",
      "O66",
      "N45",
      "N37",
      "B15",
      "O61",
      "N43",
      "O64",
      "B14",
      "I17",
      "I24",
      "G55",
      "N39",
      "G49",
      "O74",
      "G54",
      "B7",
      "N40",
      "O75",
      "G59",
      "I18",
      "O70",
      "G47",
      "B3",
      "N41",
      "B11",
      "I21",
      "N34",
      "O65",
      "B12",
      "G50",
      "G58",
      "O68",
      "G46",
      "N32",
      "B13",
      "O71",
      "B4",
      "I29",
      "N35",
      "I23",
      "B10",
      "O63",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber45 = () => {
    const sequence = [
      "I18",
      "N42",
      "G60",
      "B8",
      " I19",
      "I26",
      "O65",
      "O72",
      "N31",
      "B11",
      "I28",
      "G47",
      "O64",
      "B9",
      "G52",
      "I27",
      "B4",
      "G57",
      "N33",
      "I25",
      "B13",
      "N38",
      "I22",
      "G48",
      "N44",
      "G51",
      "O73",
      "I30",
      "O67",
      "G59",
      "G50",
      "I20",
      "O61",
      "N45",
      "B2",
      "B15",
      "O66",
      "N43",
      "O69",
      "N35",
      "I17",
      "I23",
      "G55",
      "N39",
      "B7",
      "O75",
      "B1",
      "N32",
      "N40",
      "O74",
      "G53",
      "I16",
      "O70",
      "N36",
      "B3",
      "B14",
      "B5",
      "I21",
      "N34",
      "O62",
      "B12",
      "G56",
      "G58",
      "O68",
      "G46",
      "G49",
      "G54",
      "O71",
      "B6",
      "I29",
      "N41",
      "I24",
      "B10",
      "O63",
      "N37",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber46 = () => {
    const sequence = [
      "B5",
      "N40",
      "G56",
      "B8",
      "I16",
      "I25",
      "O62",
      "O72",
      "N31",
      "I18",
      "I28",
      "G47",
      "O69",
      "B9",
      "G59",
      "I22",
      "B6",
      "G50",
      "N33",
      "I26",
      "B1",
      "N44",
      "I29",
      "G48",
      "N38",
      "G51",
      "O73",
      "I30",
      "O67",
      "G60",
      "G55",
      "I20",
      "O61",
      "N34",
      "N37",
      "B15",
      "O66",
      "N39",
      "O64",
      "N41",
      "I17",
      "N36",
      "G57",
      "O65",
      "G46",
      "O75",
      "G54",
      "N32",
      "B10",
      "O74",
      "G53",
      "I19",
      "O70",
      "I23",
      "B3",
      "B14",
      "B13",
      "I21",
      "N45",
      "N43",
      "B12",
      "G52",
      "G58",
      "O68",
      "G49",
      "B7",
      "B11",
      "O71",
      "B4",
      "I27",
      "N35",
      "I24",
      "N42",
      "O63",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber47 = () => {
    const sequence = [
      "B13",
      "N40",
      "G49",
      "B9",
      "I16",
      "I26",
      "O65",
      "O72",
      "N41",
      "I19",
      "I28",
      "G48",
      "O68",
      "B3",
      "G56",
      "I23",
      "B6",
      "G57",
      "N33",
      "I25",
      "B7",
      "N44",
      "I24",
      "G60",
      "N36",
      "G51",
      "O63",
      "I30",
      "O67",
      "G50",
      "G47",
      "I20",
      "O61",
      "N45",
      "N37",
      "B15",
      "O66",
      "N43",
      "O64",
      "N31",
      "B5",
      "I22",
      "G58",
      "N39",
      "G59",
      "O75",
      "G54",
      "B12",
      "N42",
      "O74",
      "G53",
      "I18",
      "O70",
      "N38",
      "B8",
      "B14",
      "I17",
      "I21",
      "N34",
      "O62",
      "N32",
      "G52",
      "G55",
      "O69",
      "G46",
      "B11",
      "B1",
      "O71",
      "B4",
      "I29",
      "N35",
      "I27",
      "B10",
      "O73",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber48 = () => {
    const sequence = [
      "G58",
      "N40",
      "G56",
      "B6",
      "I16",
      "I25",
      "O62",
      "O73",
      "N31",
      "I19",
      "B5",
      "G47",
      "O69",
      "B9",
      "G59",
      "I17",
      "B8",
      "G57",
      "N33",
      "I26",
      "B11",
      "N44",
      "I29",
      "G48",
      "N34",
      "G51",
      "O75",
      "I30",
      "O66",
      "G60",
      "G50",
      "I22",
      "O72",
      "N45",
      "N37",
      "B15",
      "O67",
      "N43",
      "O61",
      "N41",
      "I24",
      "I23",
      "G55",
      "N39",
      "G49",
      "O64",
      "G54",
      "B14",
      "N42",
      "O74",
      "G53",
      "I18",
      "O70",
      "N36",
      "B3",
      "N32",
      "I28",
      "I21",
      "N38",
      "O65",
      "B12",
      "G52",
      "B13",
      "O68",
      "G46",
      "B7",
      "B1",
      "O71",
      "B4",
      "I27",
      "N35",
      "I20",
      "B10",
      "O63",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber49 = () => {
    const sequence = [
      "B13",
      "N40",
      "G53",
      "B8",
      "I16",
      "I25",
      "O62",
      "O72",
      "N31",
      "I18",
      "I28",
      "G47",
      "O69",
      "B9",
      "G55",
      "I22",
      "B6",
      "G57",
      "N33",
      "I26",
      "B11",
      "N44",
      "I27",
      "G48",
      "N38",
      "G51",
      "O73",
      "I30",
      "O67",
      "G60",
      "G50",
      "I24",
      "O61",
      "N45",
      "N35",
      "B15",
      "O66",
      "N43",
      "O64",
      "N41",
      "I17",
      "I23",
      "G56",
      "N39",
      "G49",
      "O71",
      "G54",
      "N32",
      "N42",
      "O63",
      "G59",
      "I19",
      "O70",
      "N36",
      "B12",
      "B14",
      "B5",
      "I21",
      "N34",
      "O65",
      "B3",
      "G52",
      "G58",
      "O68",
      "G46",
      "B7",
      "B1",
      "O75",
      "B4",
      "I29",
      "N37",
      "I20",
      "B10",
      "O74",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  const GenerateBingoNumber50 = () => {
    const sequence = [
      "G55",
      "N40",
      "G59",
      "B8",
      "I16",
      "I25",
      "N33",
      "O72",
      "N31",
      "I18",
      "I28",
      "G57",
      "O69",
      "B9",
      "G56",
      "I24",
      "B4",
      "G47",
      "O62",
      "I26",
      "B11",
      "N44",
      "I27",
      "G48",
      "N38",
      "G51",
      "O73",
      "I30",
      "O67",
      "G60",
      "G53",
      "I20",
      "O61",
      "N45",
      "N37",
      "B14",
      "O68",
      "N42",
      "O64",
      "N41",
      "I17",
      "I19",
      "B13",
      "N39",
      "G49",
      "O74",
      "G52",
      "N32",
      "N43",
      "B7",
      "G50",
      "I23",
      "O70",
      "N36",
      "B3",
      "B15",
      "B5",
      "I21",
      "N34",
      "O65",
      "B12",
      "G54",
      "G58",
      "O66",
      "G46",
      "O75",
      "B1",
      "O71",
      "B6",
      "I29",
      "N35",
      "I22",
      "B10",
      "O63",
      "B2",
    ];
    let sequenceIndex = localStorage.getItem("sequenceIndex");
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }

    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem("sequenceIndex", sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);

    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        switch (playType) {
          case "default":
            generateRandomBingoNumber();
            break;
          case "1":
            GenerateBingoNumber1();
            break;
          case "2":
            GenerateBingoNumber2();
            break;
          case "3":
            GenerateBingoNumber3();
            break;
          case "4":
            GenerateBingoNumber4();
            break;
          case "5":
            GenerateBingoNumber5();
            break;
          case "6":
            GenerateBingoNumber6();
            break;
          case "7":
            GenerateBingoNumber7();
            break;
          case "8":
            GenerateBingoNumber8();
            break;
          case "9":
            GenerateBingoNumber9();
            break;
          case "10":
            GenerateBingoNumber10();
            break;
          case "11":
            GenerateBingoNumber11();
            break;
          case "12":
            GenerateBingoNumber12();
            break;
          case "13":
            GenerateBingoNumber13();
            break;
          case "14":
            GenerateBingoNumber14();
            break;
          case "15":
            GenerateBingoNumber15();
            break;
          case "16":
            GenerateBingoNumber16();
            break;
          case "17":
            GenerateBingoNumber17();
            break;
          case "18":
            GenerateBingoNumber18();
            break;
          case "19":
            GenerateBingoNumber19();
            break;
          case "20":
            GenerateBingoNumber20();
            break;
          case "21":
            GenerateBingoNumber21();
            break;
          case "22":
            GenerateBingoNumber22();
            break;
          case "23":
            GenerateBingoNumber23();
            break;
          case "24":
            GenerateBingoNumber24();
            break;
          case "25":
            GenerateBingoNumber25();
            break;
          case "26":
            GenerateBingoNumber26();
            break;
          case "27":
            GenerateBingoNumber27();
            break;
          case "28":
            GenerateBingoNumber28();
            break;
          case "29":
            GenerateBingoNumber29();
            break;
          case "30":
            GenerateBingoNumber30();
            break;
          case "40":
            GenerateBingoNumber40();
            break;
          case "41":
            GenerateBingoNumber41();
            break;
          case "42":
            GenerateBingoNumber42();
            break;
          case "43":
            GenerateBingoNumber43();
            break;
          case "44":
            GenerateBingoNumber44();
            break;
          case "45":
            GenerateBingoNumber45();
            break;
          case "46":
            GenerateBingoNumber46();
            break;
          case "47":
            GenerateBingoNumber47();
            break;
          case "48":
            GenerateBingoNumber48();
            break;
          case "49":
            GenerateBingoNumber49();
            break;
          case "50":
            GenerateBingoNumber50();
            break;
          default:
            generateRandomBingoNumber();
            break;
        }
      }, secondsInterval * 1000);
    }

    return () => {
      clearInterval(interval);
      localStorage.setItem(
        "calledNumbers",
        JSON.stringify(Array.from(calledNumbers))
      );
    };
    // eslint-disable-next-line
  }, [calledNumbers, isPlaying]);

  const handlePlayStopToggle = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleCardNumberChange = () => {
        // Check if the entered card number is found in the registeredNumbers
        if (registeredNumbers.includes(parseInt(cardNumberInput)))  {
          setCardNumber(cardNumberInput);
      
          // Use a switch statement to navigate to the corresponding Card component based on the card number
          switch (cardNumberInput) {
            case '1':
              navigate(`/card1?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '2':
              navigate(`/card2?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '3':
              navigate(`/card3?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '4':
              navigate(`/card4?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '5':
              navigate(`/card5?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '6':
              navigate(`/card6?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '7':
              navigate(`/card7?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '8':
              navigate(`/card8?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '9':
              navigate(`/card9?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '10':
              navigate(`/card10?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '11':
              navigate(`/card11?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '12':
              navigate(`/card12?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '13':
              navigate(`/card13?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '14':
              navigate(`/card14?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '15':
              navigate(`/card15?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '16':
              navigate(`/card16?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '17':
              navigate(`/card17?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '18':
              navigate(`/card18?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '19':
              navigate(`/card19?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '20':
              navigate(`/card20?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '21':
              navigate(`/card21?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '22':
              navigate(`/card22?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '23':
              navigate(`/card23?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '24':
              navigate(`/card24?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '25':
              navigate(`/card25?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '26':
              navigate(`/card26?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
            case '27':
              navigate(`/card27?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
              case '46':
                navigate(`/card46?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
                break;
                case '44':
                  navigate(`/card44?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
                  break;
                  case '38':
                    navigate(`/card38?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
                    break;
                    case '43':
                      navigate(`/card43?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
                      break;
            case '47':
            navigate(`/card47?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '32':
            navigate(`/card32?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;  
            case '36':
            navigate(`/card36?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '33':
            navigate(`/card33?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;  
            case '40':
            navigate(`/card40?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '41':
            navigate(`/card41?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '30':
            navigate(`/card30?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '31':
            navigate(`/card31?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '49':
            navigate(`/card49?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '34':
            navigate(`/card34?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '48':
            navigate(`/card48?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '42':
            navigate(`/card42?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '39':
            navigate(`/card39?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '35':
            navigate(`/card35?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '28':
            navigate(`/card28?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '29':
            navigate(`/card29?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '50':
            navigate(`/card50?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '45':
            navigate(`/card45?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '37':
            navigate(`/card37?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '51':
            navigate(`/card51?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '52':
            navigate(`/card52?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '53':
            navigate(`/card53?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '54':
            navigate(`/card54?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '55':
            navigate(`/card55?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '56':
            navigate(`/card56?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '57':
            navigate(`/card57?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '58':
            navigate(`/card58?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '59':
            navigate(`/card59?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '60':
            navigate(`/card60?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '61':
            navigate(`/card61?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '62':
            navigate(`/card62?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '63':
            navigate(`/card63?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '64':
            navigate(`/card64?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '65':
            navigate(`/card65?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '66':
            navigate(`/card66?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '67':
            navigate(`/card67?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '68':
            navigate(`/card68?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '69':
            navigate(`/card69?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '70':
            navigate(`/card70?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '71':
            navigate(`/card71?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '72':
            navigate(`/card72?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '73':
            navigate(`/card73?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '74':
            navigate(`/card74?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '75':
            navigate(`/card75?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break; 
            case '76':
            navigate(`/card76?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '77':
            navigate(`/card77?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;                                                                                             
            case '78':
            navigate(`/card78?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '79':
            navigate(`/card79?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '80':
            navigate(`/card80?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '81':
            navigate(`/card81?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '82':
            navigate(`/card82?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '83':
            navigate(`/card83?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '84':
            navigate(`/card84?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '85':
            navigate(`/card85?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '86':
            navigate(`/card86?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '87':
            navigate(`/card87?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '88':
            navigate(`/card88?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '89':
            navigate(`/card89?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '90':
            navigate(`/card90?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '91':
            navigate(`/card91?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '92':
            navigate(`/card92?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '93':
            navigate(`/card93?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '94':
            navigate(`/card94?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '95':
            navigate(`/card95?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '96':
            navigate(`/card96?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '97':
            navigate(`/card97?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '98':
            navigate(`/card98?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '99':
            navigate(`/card99?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '100':
            navigate(`/card100?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            // Add cases for more card numbers as needed
            default:
              // Do nothing if the card number is not explicitly handled
              break;
          }
        } else {
          // Play the "not registered" audio when the card number is not found in registeredNumbers
          const audio = new Audio(notRegisteredAudio);
          audio.play();
        }
      };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setSelectedName(newName);
    localStorage.setItem("selectedName", newName);
  };

  useEffect(() => {
    const updatePlayType = async (userName, defaultPlayType) => {
      try {
        const response = await axios.put(
          `https://binx.wabisecurityandcleaningservice.com/api/user/updateplayType`,
          { userName, defaultPlayType }
        );

        if (response.status === 200) {
          console.log("playType updated successfully:", response.data);
          return response.data;
        } else {
          console.error("Failed to update playType:", response.data.error);
          throw new Error(response.data.error);
        }
      } catch (error) {
        console.error("Error updating playType:", error.message);
        throw error;
      }
    };

    // Update the playType to default when the user enters the page
    if (user) {
      updatePlayType(user.userName, "default");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.randombingonumber}>
      <BingoCall
        currentNumber={currentNumber}
        calledNumbers={calledNumbers}
        totalAmount={remainingMoney}
      />

      <div className={styles.playcard}>
        <button
          onClick={handlePlayStopToggle}
          className={isPlaying ? styles.stopbutton : styles.playbutton}
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
        <div className={styles.name}>
          <select id="amount" value={selectedName} onChange={handleNameChange}>
            <option value={"ngus"}>ngus</option>
            <option value={"bereket"}>bereket</option>
            <option value={"Xbingo"}>Xbingo</option>
            <option value={"aradaw"}>Aradaw</option>
          </select>
        </div>
        <div className={styles.sliderContainer}>
          <span>{secondsInterval} seconds</span>

          <input
            type="range"
            min="1"
            max="10"
            value={secondsInterval}
            onChange={(e) => setSecondsInterval(parseInt(e.target.value))}
            className={styles.slider}
            id="intervalSlider"
          />
        </div>
        <div className={styles.input}>
          <input
            type="text"
            value={cardNumberInput}
            onChange={(e) => setCardNumberInput(e.target.value)}
            placeholder="Enter Card Number"
          />
          <button onClick={handleCardNumberChange} className={styles.check}>
            Check
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomBingoNumber;
