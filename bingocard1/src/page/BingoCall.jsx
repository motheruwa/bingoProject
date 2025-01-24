import React, { useEffect, useState } from "react";
import styles from "../css/BingoCall.module.css";
import Bingocard from "../images/bingocard.jpg";
import { MdOutlineStarRate } from "react-icons/md";
import  useAudio  from "../hooks/useAudio";

export const BingoCall = ({ currentNumber, calledNumbers, totalAmount }) => {
  const [animateCurrent, setAnimateCurrent] = useState(false);
  const audioInstances = useAudio();
  useEffect(() => {
    setAnimateCurrent(true);

    const timeout = setTimeout(() => {
      setAnimateCurrent(false);
    }, 2000); // Duration of the 'current' animation

    return () => clearTimeout(timeout);
  }, [currentNumber]);

  useEffect(() => {
    // Retrieve selectedName from localStorage
    const savedName = localStorage.getItem("selectedName");
    // Call the appropriate function based on the selected name
    switch (savedName) {
      case "ngus":
        playAudioForNumberNgus(currentNumber);
        break;
      case "bereket":
        playAudioForNumberBereket(currentNumber);
        break;
      case "Xbingo":
        playAudioForNumber(currentNumber);
        break;
      default:
        playAudioForNumber(currentNumber);
    }
    // eslint-disable-next-line
  }, [currentNumber]);

  const playAudioForNumberBereket = (number) => {
    let audio;

    switch (number) {
      case "B1":
        audio = audioInstances.find((instance) => instance.src.includes("BBB1"));
        break;
      case "B2":
        audio = audioInstances.find((instance) => instance.src.includes("BBB2"));
        break;
      case "B3":
        audio = audioInstances.find((instance) => instance.src.includes("BBB3"));
        break;
      case "B4":
        audio = audioInstances.find((instance) => instance.src.includes("BBB4"));
        break;
      case "B5":
        audio = audioInstances.find((instance) => instance.src.includes("BBB5"));
        break;
      case "B6":
        audio = audioInstances.find((instance) => instance.src.includes("BBB6"));
        break;
      case "B7":
        audio = audioInstances.find((instance) => instance.src.includes("BBB7"));
        break;
      case "B8":
        audio = audioInstances.find((instance) => instance.src.includes("BBB8"));
        break;
      case "B9":
        audio = audioInstances.find((instance) => instance.src.includes("BBB9"));
        break;
      case "B10":
        audio = audioInstances.find((instance) => instance.src.includes("BBB10"));
        break;
      case "B11":
        audio = audioInstances.find((instance) => instance.src.includes("BBB11"));
        break;
      case "B12":
        audio = audioInstances.find((instance) => instance.src.includes("BBB12"));
        break;
      case "B13":
        audio = audioInstances.find((instance) => instance.src.includes("BBB13"));
        break;
      case "B14":
        audio = audioInstances.find((instance) => instance.src.includes("BBB14"));
        break;
      case "B15":
        audio = audioInstances.find((instance) => instance.src.includes("BBB15"));
        break;
      case "I16":
        audio = audioInstances.find((instance) => instance.src.includes("III16"));
        break;
      case "I17":
        audio = audioInstances.find((instance) => instance.src.includes("III17"));
        break;
      case "I18":
        audio = audioInstances.find((instance) => instance.src.includes("III18"));
        break;
      case "I19":
        audio = audioInstances.find((instance) => instance.src.includes("III19"));
        break;
      case "I20":
        audio = audioInstances.find((instance) => instance.src.includes("III20"));
        break;
      case "I21":
        audio = audioInstances.find((instance) => instance.src.includes("III21"));
        break;
      case "I22":
        audio = audioInstances.find((instance) => instance.src.includes("III22"));
        break;
      case "I23":
        audio = audioInstances.find((instance) => instance.src.includes("III23"));
        break;
      case "I24":
        audio = audioInstances.find((instance) => instance.src.includes("III24"));
        break;
      case "I25":
        audio = audioInstances.find((instance) => instance.src.includes("III25"));
        break;
      case "I26":
        audio = audioInstances.find((instance) => instance.src.includes("III26"));
        break;
      case "I27":
        audio = audioInstances.find((instance) => instance.src.includes("III27"));
        break;
      case "I28":
        audio = audioInstances.find((instance) => instance.src.includes("III28"));
        break;
      case "I29":
        audio = audioInstances.find((instance) => instance.src.includes("III29"));
        break;
      case "I30":
        audio = audioInstances.find((instance) => instance.src.includes("III30"));
        break;
      case "N31":
        audio = audioInstances.find((instance) => instance.src.includes("NNN31"));
        break;
      case "N32":
        audio = audioInstances.find((instance) => instance.src.includes("NNN32"));
        break;
      case "N33":
        audio = audioInstances.find((instance) => instance.src.includes("NNN33"));
        break;
      case "N34":
        audio = audioInstances.find((instance) => instance.src.includes("NNN34"));
        break;
      case "N35":
        audio = audioInstances.find((instance) => instance.src.includes("NNN35"));
        break;
      case "N36":
        audio = audioInstances.find((instance) => instance.src.includes("NNN36"));
        break;
      case "N37":
        audio = audioInstances.find((instance) => instance.src.includes("NNN37"));
        break;
      case "N38":
        audio = audioInstances.find((instance) => instance.src.includes("NNN38"));
        break;
      case "N39":
        audio = audioInstances.find((instance) => instance.src.includes("NNN39"));
        break;
      case "N40":
        audio = audioInstances.find((instance) => instance.src.includes("NNN40"));
        break;
      case "N41":
        audio = audioInstances.find((instance) => instance.src.includes("NNN41"));
        break;
      case "N42":
        audio = audioInstances.find((instance) => instance.src.includes("NNN42"));
        break;
      case "N43":
        audio = audioInstances.find((instance) => instance.src.includes("NNN43"));
        break;
      case "N44":
        audio = audioInstances.find((instance) => instance.src.includes("NNN44"));
        break;
      case "N45":
        audio = audioInstances.find((instance) => instance.src.includes("NNN45"));
        break;
      case "G46":
        audio = audioInstances.find((instance) => instance.src.includes("GGG46"));
        break;
      case "G47":
        audio = audioInstances.find((instance) => instance.src.includes("GGG47"));
        break;
      case "G48":
        audio = audioInstances.find((instance) => instance.src.includes("GGG48"));
        break;
      case "G49":
        audio = audioInstances.find((instance) => instance.src.includes("GGG49"));
        break;
      case "G50":
        audio = audioInstances.find((instance) => instance.src.includes("GGG50"));
        break;
      case "G51":
        audio = audioInstances.find((instance) => instance.src.includes("GGG51"));
        break;
      case "G52":
        audio = audioInstances.find((instance) => instance.src.includes("GGG52"));
        break;
      case "G53":
        audio = audioInstances.find((instance) => instance.src.includes("GGG53"));
        break;
      case "G54":
        audio = audioInstances.find((instance) => instance.src.includes("GGG54"));
        break;
      case "G55":
        audio = audioInstances.find((instance) => instance.src.includes("GGG55"));
        break;
      case "G56":
        audio = audioInstances.find((instance) => instance.src.includes("GGG56"));
        break;
      case "G57":
        audio = audioInstances.find((instance) => instance.src.includes("GGG57"));
        break;
      case "G58":
        audio = audioInstances.find((instance) => instance.src.includes("GGG58"));
        break;
      case "G59":
        audio = audioInstances.find((instance) => instance.src.includes("GGG59"));
        break;
      case "G60":
        audio = audioInstances.find((instance) => instance.src.includes("GGG60"));
        break;
      case "O61":
        audio = audioInstances.find((instance) => instance.src.includes("OOO61"));
        break;
      case "O62":
        audio = audioInstances.find((instance) => instance.src.includes("OOO62"));
        break;
      case "O63":
        audio = audioInstances.find((instance) => instance.src.includes("OOO63"));
        break;
      case "O64":
        audio = audioInstances.find((instance) => instance.src.includes("OOO64"));
        break;
      case "O65":
        audio = audioInstances.find((instance) => instance.src.includes("OOO65"));
        break;
      case "O66":
        audio = audioInstances.find((instance) => instance.src.includes("OOO66"));
        break;
      case "O67":
        audio = audioInstances.find((instance) => instance.src.includes("OOO67"));
        break;
      case "O68":
        audio = audioInstances.find((instance) => instance.src.includes("OOO68"));
        break;
      case "O69":
        audio = audioInstances.find((instance) => instance.src.includes("OOO69"));
        break;
      case "O70":
        audio = audioInstances.find((instance) => instance.src.includes("OOO70"));
        break;
      case "O71":
        audio = audioInstances.find((instance) => instance.src.includes("OOO71"));
        break;
      case "O72":
        audio = audioInstances.find((instance) => instance.src.includes("OOO72"));
        break;
      case "O73":
        audio = audioInstances.find((instance) => instance.src.includes("OOO73"));
        break;
      case "O74":
        audio = audioInstances.find((instance) => instance.src.includes("OOO74"));
        break;
      case "O75":
        audio = audioInstances.find((instance) => instance.src.includes("OOO75"));
        break;
      default:
        // Handle cases where no audio needs to be played
        break;
    }

    if (audio) {
      audio.play();

      // Pause the audio after 3 seconds
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }, 3000); // Duration of 3 seconds
    }
  };
  const playAudioForNumberNgus = (number) => {
    let audio;

    switch (number) {
      case "B1":
        audio = audioInstances.find((instance) => instance.src.includes("BB1"));
        break;
      case "B2":
        audio = audioInstances.find((instance) => instance.src.includes("BB2"));
        break;
      case "B3":
        audio = audioInstances.find((instance) => instance.src.includes("BB3"));
        break;
      case "B4":
        audio = audioInstances.find((instance) => instance.src.includes("BB4"));
        break;
      case "B5":
        audio = audioInstances.find((instance) => instance.src.includes("BB5"));
        break;
      case "B6":
        audio = audioInstances.find((instance) => instance.src.includes("BB6"));
        break;
      case "B7":
        audio = audioInstances.find((instance) => instance.src.includes("BB7"));
        break;
      case "B8":
        audio = audioInstances.find((instance) => instance.src.includes("BB8"));
        break;
      case "B9":
        audio = audioInstances.find((instance) => instance.src.includes("BB9"));
        break;
      case "B10":
        audio = audioInstances.find((instance) => instance.src.includes("BB10"));
        break;
      case "B11":
        audio = audioInstances.find((instance) => instance.src.includes("BB11"));
        break;
      case "B12":
        audio = audioInstances.find((instance) => instance.src.includes("BB12"));
        break;
      case "B13":
        audio = audioInstances.find((instance) => instance.src.includes("BB13"));
        break;
      case "B14":
        audio = audioInstances.find((instance) => instance.src.includes("BB14"));
        break;
      case "B15":
        audio = audioInstances.find((instance) => instance.src.includes("BB15"));
        break;
      case "I16":
        audio = audioInstances.find((instance) => instance.src.includes("II16"));
        break;
      case "I17":
        audio = audioInstances.find((instance) => instance.src.includes("II17"));
        break;
      case "I18":
        audio = audioInstances.find((instance) => instance.src.includes("II18"));
        break;
      case "I19":
        audio = audioInstances.find((instance) => instance.src.includes("II19"));
        break;
      case "I20":
        audio = audioInstances.find((instance) => instance.src.includes("II20"));
        break;
      case "I21":
        audio = audioInstances.find((instance) => instance.src.includes("II21"));
        break;
      case "I22":
        audio = audioInstances.find((instance) => instance.src.includes("II22"));
        break;
      case "I23":
        audio = audioInstances.find((instance) => instance.src.includes("II23"));
        break;
      case "I24":
        audio = audioInstances.find((instance) => instance.src.includes("II24"));
        break;
      case "I25":
        audio = audioInstances.find((instance) => instance.src.includes("II25"));
        break;
      case "I26":
        audio = audioInstances.find((instance) => instance.src.includes("II26"));
        break;
      case "I27":
        audio = audioInstances.find((instance) => instance.src.includes("II27"));
        break;
      case "I28":
        audio = audioInstances.find((instance) => instance.src.includes("II28"));
        break;
      case "I29":
        audio = audioInstances.find((instance) => instance.src.includes("II29"));
        break;
      case "I30":
        audio = audioInstances.find((instance) => instance.src.includes("II30"));
        break;
      case "N31":
        audio = audioInstances.find((instance) => instance.src.includes("NN31"));
        break;
      case "N32":
        audio = audioInstances.find((instance) => instance.src.includes("NN32"));
        break;
      case "N33":
        audio = audioInstances.find((instance) => instance.src.includes("NN33"));
        break;
      case "N34":
        audio = audioInstances.find((instance) => instance.src.includes("NN34"));
        break;
      case "N35":
        audio = audioInstances.find((instance) => instance.src.includes("NN35"));
        break;
      case "N36":
        audio = audioInstances.find((instance) => instance.src.includes("NN36"));
        break;
      case "N37":
        audio = audioInstances.find((instance) => instance.src.includes("NN37"));
        break;
      case "N38":
        audio = audioInstances.find((instance) => instance.src.includes("NN38"));
        break;
      case "N39":
        audio = audioInstances.find((instance) => instance.src.includes("NN39"));
        break;
      case "N40":
        audio = audioInstances.find((instance) => instance.src.includes("NN40"));
        break;
      case "N41":
        audio = audioInstances.find((instance) => instance.src.includes("NN41"));
        break;
      case "N42":
        audio = audioInstances.find((instance) => instance.src.includes("NN42"));
        break;
      case "N43":
        audio = audioInstances.find((instance) => instance.src.includes("NN43"));
        break;
      case "N44":
        audio = audioInstances.find((instance) => instance.src.includes("NN44"));
        break;
      case "N45":
        audio = audioInstances.find((instance) => instance.src.includes("NN45"));
        break;
      case "G46":
        audio = audioInstances.find((instance) => instance.src.includes("GG46"));
        break;
      case "G47":
        audio = audioInstances.find((instance) => instance.src.includes("GG47"));
        break;
      case "G48":
        audio = audioInstances.find((instance) => instance.src.includes("GG48"));
        break;
      case "G49":
        audio = audioInstances.find((instance) => instance.src.includes("GG49"));
        break;
      case "G50":
        audio = audioInstances.find((instance) => instance.src.includes("GG50"));
        break;
      case "G51":
        audio = audioInstances.find((instance) => instance.src.includes("GG51"));
        break;
      case "G52":
        audio = audioInstances.find((instance) => instance.src.includes("GG52"));
        break;
      case "G53":
        audio = audioInstances.find((instance) => instance.src.includes("GG53"));
        break;
      case "G54":
        audio = audioInstances.find((instance) => instance.src.includes("GG54"));
        break;
      case "G55":
        audio = audioInstances.find((instance) => instance.src.includes("GG55"));
        break;
      case "G56":
        audio = audioInstances.find((instance) => instance.src.includes("GG56"));
        break;
      case "G57":
        audio = audioInstances.find((instance) => instance.src.includes("GG57"));
        break;
      case "G58":
        audio = audioInstances.find((instance) => instance.src.includes("GG58"));
        break;
      case "G59":
        audio = audioInstances.find((instance) => instance.src.includes("GG59"));
        break;
      case "G60":
        audio = audioInstances.find((instance) => instance.src.includes("GG60"));
        break;
      case "O61":
        audio = audioInstances.find((instance) => instance.src.includes("OO61"));
        break;
      case "O62":
        audio = audioInstances.find((instance) => instance.src.includes("OO62"));
        break;
      case "O63":
        audio = audioInstances.find((instance) => instance.src.includes("OO63"));
        break;
      case "O64":
        audio = audioInstances.find((instance) => instance.src.includes("OO64"));
        break;
      case "O65":
        audio = audioInstances.find((instance) => instance.src.includes("OO65"));
        break;
      case "O66":
        audio = audioInstances.find((instance) => instance.src.includes("OO66"));
        break;
      case "O67":
        audio = audioInstances.find((instance) => instance.src.includes("OO67"));
        break;
      case "O68":
        audio = audioInstances.find((instance) => instance.src.includes("OO68"));
        break;
      case "O69":
        audio = audioInstances.find((instance) => instance.src.includes("OO69"));
        break;
      case "O70":
        audio = audioInstances.find((instance) => instance.src.includes("OO70"));
        break;
      case "O71":
        audio = audioInstances.find((instance) => instance.src.includes("OO71"));
        break;
      case "O72":
        audio = audioInstances.find((instance) => instance.src.includes("OO72"));
        break;
      case "O73":
        audio = audioInstances.find((instance) => instance.src.includes("OO73"));
        break;
      case "O74":
        audio = audioInstances.find((instance) => instance.src.includes("OO74"));
        break;
      case "O75":
        audio = audioInstances.find((instance) => instance.src.includes("OO75"));
        break;
      default:
        // Handle cases where no audio needs to be played
        break;
    }

    if (audio) {
      audio.play();

      // Pause the audio after 3 seconds
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }, 3000); // Duration of 3 seconds
    }
  };
  const playAudioForNumber = (number) => {
    let audio;

    switch (number) {
      case "B1":
        audio = audioInstances.find((instance) => instance.src.includes("B1"));
        break;
      case "B2":
        audio = audioInstances.find((instance) => instance.src.includes("B2"));
        break;
      case "B3":
        audio = audioInstances.find((instance) => instance.src.includes("B3"));
        break;
      case "B4":
        audio = audioInstances.find((instance) => instance.src.includes("B4"));
        break;
      case "B5":
        audio = audioInstances.find((instance) => instance.src.includes("B5"));
        break;
      case "B6":
        audio = audioInstances.find((instance) => instance.src.includes("B6"));
        break;
      case "B7":
        audio = audioInstances.find((instance) => instance.src.includes("B7"));
        break;
      case "B8":
        audio = audioInstances.find((instance) => instance.src.includes("B8"));
        break;
      case "B9":
        audio = audioInstances.find((instance) => instance.src.includes("B9"));
        break;
      case "B10":
        audio = audioInstances.find((instance) => instance.src.includes("B10"));
        break;
      case "B11":
        audio = audioInstances.find((instance) => instance.src.includes("B11"));
        break;
      case "B12":
        audio = audioInstances.find((instance) => instance.src.includes("B12"));
        break;
      case "B13":
        audio = audioInstances.find((instance) => instance.src.includes("B13"));
        break;
      case "B14":
        audio = audioInstances.find((instance) => instance.src.includes("B14"));
        break;
      case "B15":
        audio = audioInstances.find((instance) => instance.src.includes("B15"));
        break;
      case "I16":
        audio = audioInstances.find((instance) => instance.src.includes("I16"));
        break;
      case "I17":
        audio = audioInstances.find((instance) => instance.src.includes("I17"));
        break;
      case "I18":
        audio = audioInstances.find((instance) => instance.src.includes("I18"));
        break;
      case "I19":
        audio = audioInstances.find((instance) => instance.src.includes("I19"));
        break;
      case "I20":
        audio = audioInstances.find((instance) => instance.src.includes("I20"));
        break;
      case "I21":
        audio = audioInstances.find((instance) => instance.src.includes("I21"));
        break;
      case "I22":
        audio = audioInstances.find((instance) => instance.src.includes("I22"));
        break;
      case "I23":
        audio = audioInstances.find((instance) => instance.src.includes("I23"));
        break;
      case "I24":
        audio = audioInstances.find((instance) => instance.src.includes("I24"));
        break;
      case "I25":
        audio = audioInstances.find((instance) => instance.src.includes("I25"));
        break;
      case "I26":
        audio = audioInstances.find((instance) => instance.src.includes("I26"));
        break;
      case "I27":
        audio = audioInstances.find((instance) => instance.src.includes("I27"));
        break;
      case "I28":
        audio = audioInstances.find((instance) => instance.src.includes("I28"));
        break;
      case "I29":
        audio = audioInstances.find((instance) => instance.src.includes("I29"));
        break;
      case "I30":
        audio = audioInstances.find((instance) => instance.src.includes("I30"));
        break;
      case "N31":
        audio = audioInstances.find((instance) => instance.src.includes("N31"));
        break;
      case "N32":
        audio = audioInstances.find((instance) => instance.src.includes("N32"));
        break;
      case "N33":
        audio = audioInstances.find((instance) => instance.src.includes("N33"));
        break;
      case "N34":
        audio = audioInstances.find((instance) => instance.src.includes("N34"));
        break;
      case "N35":
        audio = audioInstances.find((instance) => instance.src.includes("N35"));
        break;
      case "N36":
        audio = audioInstances.find((instance) => instance.src.includes("N36"));
        break;
      case "N37":
        audio = audioInstances.find((instance) => instance.src.includes("N37"));
        break;
      case "N38":
        audio = audioInstances.find((instance) => instance.src.includes("N38"));
        break;
      case "N39":
        audio = audioInstances.find((instance) => instance.src.includes("N39"));
        break;
      case "N40":
        audio = audioInstances.find((instance) => instance.src.includes("N40"));
        break;
      case "N41":
        audio = audioInstances.find((instance) => instance.src.includes("N41"));
        break;
      case "N42":
        audio = audioInstances.find((instance) => instance.src.includes("N42"));
        break;
      case "N43":
        audio = audioInstances.find((instance) => instance.src.includes("N43"));
        break;
      case "N44":
        audio = audioInstances.find((instance) => instance.src.includes("N44"));
        break;
      case "N45":
        audio = audioInstances.find((instance) => instance.src.includes("N45"));
        break;
      case "G46":
        audio = audioInstances.find((instance) => instance.src.includes("G46"));
        break;
      case "G47":
        audio = audioInstances.find((instance) => instance.src.includes("G47"));
        break;
      case "G48":
        audio = audioInstances.find((instance) => instance.src.includes("G48"));
        break;
      case "G49":
        audio = audioInstances.find((instance) => instance.src.includes("G49"));
        break;
      case "G50":
        audio = audioInstances.find((instance) => instance.src.includes("G50"));
        break;
      case "G51":
        audio = audioInstances.find((instance) => instance.src.includes("G51"));
        break;
      case "G52":
        audio = audioInstances.find((instance) => instance.src.includes("G52"));
        break;
      case "G53":
        audio = audioInstances.find((instance) => instance.src.includes("G53"));
        break;
      case "G54":
        audio = audioInstances.find((instance) => instance.src.includes("G54"));
        break;
      case "G55":
        audio = audioInstances.find((instance) => instance.src.includes("G55"));
        break;
      case "G56":
        audio = audioInstances.find((instance) => instance.src.includes("G56"));
        break;
      case "G57":
        audio = audioInstances.find((instance) => instance.src.includes("G57"));
        break;
      case "G58":
        audio = audioInstances.find((instance) => instance.src.includes("G58"));
        break;
      case "G59":
        audio = audioInstances.find((instance) => instance.src.includes("G59"));
        break;
      case "G60":
        audio = audioInstances.find((instance) => instance.src.includes("G60"));
        break;
      case "O61":
        audio = audioInstances.find((instance) => instance.src.includes("O61"));
        break;
      case "O62":
        audio = audioInstances.find((instance) => instance.src.includes("O62"));
        break;
      case "O63":
        audio = audioInstances.find((instance) => instance.src.includes("O63"));
        break;
      case "O64":
        audio = audioInstances.find((instance) => instance.src.includes("O64"));
        break;
      case "O65":
        audio = audioInstances.find((instance) => instance.src.includes("O65"));
        break;
      case "O66":
        audio = audioInstances.find((instance) => instance.src.includes("O66"));
        break;
      case "O67":
        audio = audioInstances.find((instance) => instance.src.includes("O67"));
        break;
      case "O68":
        audio = audioInstances.find((instance) => instance.src.includes("O68"));
        break;
      case "O69":
        audio = audioInstances.find((instance) => instance.src.includes("O69"));
        break;
      case "O70":
        audio = audioInstances.find((instance) => instance.src.includes("O70"));
        break;
      case "O71":
        audio = audioInstances.find((instance) => instance.src.includes("O71"));
        break;
      case "O72":
        audio = audioInstances.find((instance) => instance.src.includes("O72"));
        break;
      case "O73":
        audio = audioInstances.find((instance) => instance.src.includes("O73"));
        break;
      case "O74":
        audio = audioInstances.find((instance) => instance.src.includes("O74"));
        break;
      case "O75":
        audio = audioInstances.find((instance) => instance.src.includes("O75"));
        break;
      default:
        // Handle cases where no audio needs to be played
        break;
    }

    if (audio) {
      audio.play();

      // Pause the audio after 3 seconds
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }, 3000); // Duration of 3 seconds
    }
  };

  const allPossibilities = [
    ...generatePossibilities("B", 1, 15),
    ...generatePossibilities("I", 16, 30),
    ...generatePossibilities("N", 31, 45),
    ...generatePossibilities("G", 46, 60),
    ...generatePossibilities("O", 61, 75),
  ];

  function generatePossibilities(letter, start, end) {
    const possibilities = [];
    for (let i = start; i <= end; i++) {
      possibilities.push(`${letter}${i}`);
    }
    return possibilities;
  }

  const rows = {
    B: allPossibilities.slice(0, 15),
    I: allPossibilities.slice(15, 30),
    N: allPossibilities.slice(30, 45),
    G: allPossibilities.slice(45, 60),
    O: allPossibilities.slice(60, 75),
  };

  // Get the five most recent called numbers
  const recentCalledNumbers = Array.from(calledNumbers).slice(-5);

  return (
    <div className={styles.bingocall}>
      <div className={styles.currentrecent}>
        <div className={styles.current11}>
          <div
            className={`${styles.current} ${
              animateCurrent ? styles.animated : ""
            }`}
          >
            <h3>{currentNumber}</h3>
          </div>
        </div>

        <div className={styles.img}>
          <img src={Bingocard} alt="Well Bingo" />
        </div>
        {/* Display the five most recently called numbers */}
        <div className={styles.recentCalledNumbers}>
          <h4>Recent 5 Numbers:</h4>
          <ul>
            {recentCalledNumbers.reverse().map((number) => (
              <li key={number} className={styles.recentNumber}>
                {number.startsWith("free") ? (
                  <MdOutlineStarRate size={"3rem"} />
                ) : (
                  number
                )}{" "}
                {/* Remove "free" if it exists */}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.derash}>
          <div className={styles.de}>ደራሽ</div>
          <div>{totalAmount}</div>
          <div>ብር</div>
        </div>
      </div>

      <div className={styles.bingoBoardcontainer}>
        <div className={styles.bingoBoard}>
          {Object.entries(rows).map(([letter, numbers]) => (
            <div key={letter} className={styles.bingoRow}>
              <h4 className={`${styles.letter} ${styles[letter]}`}>{letter}</h4>
              <ul className={styles.ul}>
                {numbers.map((number) => {
                  const numWithoutLetter = number.slice(1); // Remove the first character (letter)
                  return (
                    <li
                      key={number}
                      className={
                        calledNumbers.has(number)
                          ? number === currentNumber
                            ? `${styles.called} ${styles.animated}`
                            : styles.called
                          : styles.uncalled
                      }
                    >
                      {numWithoutLetter}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
