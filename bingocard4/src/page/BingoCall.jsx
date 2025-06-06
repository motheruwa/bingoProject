import React, { useEffect, useState } from "react";
import styles from "../css/BingoCall.module.css";
import Bingocard from "../images/bingocard.jpg";
import logo from "../images/logo.jpg";
import { MdOutlineStarRate } from "react-icons/md";
import useAudio from "../hooks/useAudio";

export const BingoCall = ({ currentNumber, calledNumbers, totalAmount }) => {
  const audioInstances = useAudio();
  const [animateCurrent, setAnimateCurrent] = useState(false);
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
      case "bereket":
        playAudioForNumberBereket(currentNumber);
        break;
      case "Xbingo":
        playAudioForNumber(currentNumber);
        break;
      case "aradaw":
        playAudioForNumberaradaw(currentNumber);
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
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB1")
        );
        break;
      case "B2":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB2")
        );
        break;
      case "B3":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB3")
        );
        break;
      case "B4":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB4")
        );
        break;
      case "B5":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB5")
        );
        break;
      case "B6":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB6")
        );
        break;
      case "B7":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB7")
        );
        break;
      case "B8":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB8")
        );
        break;
      case "B9":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB9")
        );
        break;
      case "B10":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB10")
        );
        break;
      case "B11":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB11")
        );
        break;
      case "B12":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB12")
        );
        break;
      case "B13":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB13")
        );
        break;
      case "B14":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB14")
        );
        break;
      case "B15":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBB15")
        );
        break;
      case "I16":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III16")
        );
        break;
      case "I17":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III17")
        );
        break;
      case "I18":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III18")
        );
        break;
      case "I19":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III19")
        );
        break;
      case "I20":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III20")
        );
        break;
      case "I21":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III21")
        );
        break;
      case "I22":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III22")
        );
        break;
      case "I23":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III23")
        );
        break;
      case "I24":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III24")
        );
        break;
      case "I25":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III25")
        );
        break;
      case "I26":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III26")
        );
        break;
      case "I27":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III27")
        );
        break;
      case "I28":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III28")
        );
        break;
      case "I29":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III29")
        );
        break;
      case "I30":
        audio = audioInstances.find((instance) =>
          instance.src.includes("III30")
        );
        break;
      case "N31":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN31")
        );
        break;
      case "N32":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN32")
        );
        break;
      case "N33":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN33")
        );
        break;
      case "N34":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN34")
        );
        break;
      case "N35":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN35")
        );
        break;
      case "N36":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN36")
        );
        break;
      case "N37":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN37")
        );
        break;
      case "N38":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN38")
        );
        break;
      case "N39":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN39")
        );
        break;
      case "N40":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN40")
        );
        break;
      case "N41":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN41")
        );
        break;
      case "N42":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN42")
        );
        break;
      case "N43":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN43")
        );
        break;
      case "N44":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN44")
        );
        break;
      case "N45":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNN45")
        );
        break;
      case "G46":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG46")
        );
        break;
      case "G47":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG47")
        );
        break;
      case "G48":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG48")
        );
        break;
      case "G49":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG49")
        );
        break;
      case "G50":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG50")
        );
        break;
      case "G51":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG51")
        );
        break;
      case "G52":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG52")
        );
        break;
      case "G53":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG53")
        );
        break;
      case "G54":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG54")
        );
        break;
      case "G55":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG55")
        );
        break;
      case "G56":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG56")
        );
        break;
      case "G57":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG57")
        );
        break;
      case "G58":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG58")
        );
        break;
      case "G59":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG59")
        );
        break;
      case "G60":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGG60")
        );
        break;
      case "O61":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO61")
        );
        break;
      case "O62":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO62")
        );
        break;
      case "O63":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO63")
        );
        break;
      case "O64":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO64")
        );
        break;
      case "O65":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO65")
        );
        break;
      case "O66":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO66")
        );
        break;
      case "O67":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO67")
        );
        break;
      case "O68":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO68")
        );
        break;
      case "O69":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO69")
        );
        break;
      case "O70":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO70")
        );
        break;
      case "O71":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO71")
        );
        break;
      case "O72":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO72")
        );
        break;
      case "O73":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO73")
        );
        break;
      case "O74":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO74")
        );
        break;
      case "O75":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOO75")
        );
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
  const playAudioForNumberaradaw = (number) => {
    let audio;

    switch (number) {
      case "B1":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB1")
        );
        break;
      case "B2":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB2")
        );
        break;
      case "B3":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB3")
        );
        break;
      case "B4":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB4")
        );
        break;
      case "B5":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB5")
        );
        break;
      case "B6":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB6")
        );
        break;
      case "B7":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB7")
        );
        break;
      case "B8":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB8")
        );
        break;
      case "B9":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB9")
        );
        break;
      case "B10":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB10")
        );
        break;
      case "B11":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB11")
        );
        break;
      case "B12":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB12")
        );
        break;
      case "B13":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB13")
        );
        break;
      case "B14":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB14")
        );
        break;
      case "B15":
        audio = audioInstances.find((instance) =>
          instance.src.includes("BBBB15")
        );
        break;
      case "I16":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII16")
        );
        break;
      case "I17":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII17")
        );
        break;
      case "I18":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII18")
        );
        break;
      case "I19":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII19")
        );
        break;
      case "I20":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII20")
        );
        break;
      case "I21":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII21")
        );
        break;
      case "I22":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII22")
        );
        break;
      case "I23":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII23")
        );
        break;
      case "I24":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII24")
        );
        break;
      case "I25":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII25")
        );
        break;
      case "I26":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII26")
        );
        break;
      case "I27":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII27")
        );
        break;
      case "I28":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII28")
        );
        break;
      case "I29":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII29")
        );
        break;
      case "I30":
        audio = audioInstances.find((instance) =>
          instance.src.includes("IIII30")
        );
        break;
      case "N31":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN31")
        );
        break;
      case "N32":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN32")
        );
        break;
      case "N33":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN33")
        );
        break;
      case "N34":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN34")
        );
        break;
      case "N35":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN35")
        );
        break;
      case "N36":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN36")
        );
        break;
      case "N37":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN37")
        );
        break;
      case "N38":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN38")
        );
        break;
      case "N39":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN39")
        );
        break;
      case "N40":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN40")
        );
        break;
      case "N41":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN41")
        );
        break;
      case "N42":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN42")
        );
        break;
      case "N43":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN43")
        );
        break;
      case "N44":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN44")
        );
        break;
      case "N45":
        audio = audioInstances.find((instance) =>
          instance.src.includes("NNNN45")
        );
        break;
      case "G46":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG46")
        );
        break;
      case "G47":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG47")
        );
        break;
      case "G48":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG48")
        );
        break;
      case "G49":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG49")
        );
        break;
      case "G50":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG50")
        );
        break;
      case "G51":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG51")
        );
        break;
      case "G52":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG52")
        );
        break;
      case "G53":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG53")
        );
        break;
      case "G54":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG54")
        );
        break;
      case "G55":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG55")
        );
        break;
      case "G56":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG56")
        );
        break;
      case "G57":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG57")
        );
        break;
      case "G58":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG58")
        );
        break;
      case "G59":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG59")
        );
        break;
      case "G60":
        audio = audioInstances.find((instance) =>
          instance.src.includes("GGGG60")
        );
        break;
      case "O61":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO61")
        );
        break;
      case "O62":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO62")
        );
        break;
      case "O63":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO63")
        );
        break;
      case "O64":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO64")
        );
        break;
      case "O65":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO65")
        );
        break;
      case "O66":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO66")
        );
        break;
      case "O67":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO67")
        );
        break;
      case "O68":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO68")
        );
        break;
      case "O69":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO69")
        );
        break;
      case "O70":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO70")
        );
        break;
      case "O71":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO71")
        );
        break;
      case "O72":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO72")
        );
        break;
      case "O73":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO73")
        );
        break;
      case "O74":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO74")
        );
        break;
      case "O75":
        audio = audioInstances.find((instance) =>
          instance.src.includes("OOOO75")
        );
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
        audio.currentTime = 0; // Reset audio to the begiNNNNing
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
          <div className={styles.rectext}>Recent 5 Numbers:</div>
          <ul>
            {recentCalledNumbers.reverse().map((number) => (
              <li key={number} className={styles.recentNumber}>
                {number.startsWith("free") ? (
                  <MdOutlineStarRate size={"4rem"} color={"#09184B"} />
                ) : (
                  <div className={styles.no}>{number}</div>
                )}{" "}
                {/* Remove "free" if it exists */}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.derash}>
          <div className={styles.logo}>
            <img src={logo} alt="MRX" />
          </div>
          <div className={styles.de}>ደራሽ</div>
          <div>{totalAmount} ብር</div>
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
