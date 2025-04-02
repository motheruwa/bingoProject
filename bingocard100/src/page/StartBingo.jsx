import React, { useState, useEffect } from "react";
import styles from "../css/start.module.css";
import { useNavigate } from "react-router-dom";
import BingoCard from "../images/bingocard.jpg";
import startAudio from "../audio/START.mp4";
import pewwzew from "../audio/pewzew.mp4";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useLogout } from "../hooks/useLogout";
import BouncingBalls from "./BouncingBalls";

const StartBingo = () => {
  const { logout } = useLogout();
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  // eslint-disable-next-line
  const [fetchedUser, setFetchedUser] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [round, setRound] = useState(1);
  const [remainingMoney, setRemainingMoney] = useState(0);
  // eslint-disable-next-line
  const [deductedAmount, setDeductedAmount] = useState(null);
  const [previousBalance, setPreviousBalance] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userName, setUserName] = useState("");
  const [creatingReport, setCreatingReport] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };
  const fetchUserByUsername = async (userName) => {
    try {
      const response = await axios.get(
        `https://binx3.wabisecurityandcleaningservice.com/api/user/${userName}`
      );
      console.log("Fetched user by username:", response.data);
      setFetchedUser(response.data);
      setPreviousBalance(response.data.balance);
      localStorage.setItem("playType", response.data.playType);

      // Handle the fetched user data as needed
    } catch (error) {
      console.error("Error fetching user by username:", error);
      // Handle errors
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      fetchUserByUsername(user.userName);
    }
  }, [user]);

  useEffect(() => {
    const storedNumbers = localStorage.getItem("registeredNumbers");
    const storedAmount = localStorage.getItem("selectedAmount");
    const round = localStorage.getItem("roundsPlayed");

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }
    if (round) {
      setRound(Number(round));
    }
    if (storedAmount) {
      setSelectedAmount(Number(storedAmount));
    }
    if(user)
    setUserName(user.userName);

    resetRoundCountIfNewDay();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
        // Calculate the total amount
        const total = registeredNumbers.length * selectedAmount;
        setTotalAmount(total);
      
      
        // Update deduction multiplier based on the range of registered numbers
        if (selectedAmount === 10 && registeredNumbers.length <= 7) {
          setDeductedAmount(selectedAmount);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 8 &&registeredNumbers.length <= 10){
          setDeductedAmount(20);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 11 &&registeredNumbers.length <= 17){
          setDeductedAmount(30);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 18 &&registeredNumbers.length <= 22){
          setDeductedAmount(40);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 23 &&registeredNumbers.length <= 27){
          setDeductedAmount(50);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 28 &&registeredNumbers.length <= 31){
          setDeductedAmount(60);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 32 &&registeredNumbers.length <= 35){
          setDeductedAmount(70);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 36 &&registeredNumbers.length <= 38){
          setDeductedAmount(80);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 39 &&registeredNumbers.length <= 41){
          setDeductedAmount(90);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 42 &&registeredNumbers.length <= 45){
          setDeductedAmount(100);
        }else if(selectedAmount === 10  && registeredNumbers.length >= 46 &&registeredNumbers.length <= 50){
          setDeductedAmount(110);
        }else if (selectedAmount === 10  &&registeredNumbers.length >= 51 && registeredNumbers.length <= 55) {
          setDeductedAmount(120);
        } else if (selectedAmount === 10  &&registeredNumbers.length >= 56 && registeredNumbers.length <= 60) {
          setDeductedAmount(130);
        } else if (selectedAmount === 10  &&registeredNumbers.length >= 61 && registeredNumbers.length <= 65) {
          setDeductedAmount(140);
        } else if (selectedAmount === 10  &&registeredNumbers.length >= 66 && registeredNumbers.length <= 70) {
          setDeductedAmount(150);
        }else if (selectedAmount === 10  &&registeredNumbers.length >= 71 && registeredNumbers.length <= 75) {
          setDeductedAmount(160);
        } else if (selectedAmount === 10  &&registeredNumbers.length >= 76 && registeredNumbers.length <= 80) {
          setDeductedAmount(170);
        } else if (selectedAmount === 10  &&registeredNumbers.length >= 81 && registeredNumbers.length <= 85) {
          setDeductedAmount(180);
        } else if (selectedAmount === 10  &&registeredNumbers.length >= 86 && registeredNumbers.length <= 90) {
          setDeductedAmount(190);
        } else if (selectedAmount === 10  &&registeredNumbers.length >= 91 && registeredNumbers.length <= 95) {
          setDeductedAmount(200);
        } else if (selectedAmount === 10  &&registeredNumbers.length >= 96 && registeredNumbers.length <= 100) {
          setDeductedAmount(210);
        }else if(selectedAmount === 20  && registeredNumbers.length <= 6){
          setDeductedAmount(20);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 7 &&registeredNumbers.length <= 8){
          setDeductedAmount(30);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 9 &&registeredNumbers.length <= 11){
          setDeductedAmount(40);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 12 &&registeredNumbers.length <= 13){
          setDeductedAmount(50);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 14 &&registeredNumbers.length <= 15){
          setDeductedAmount(60);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 16 &&registeredNumbers.length <= 17){
          setDeductedAmount(70);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 18 &&registeredNumbers.length <= 19){
          setDeductedAmount(80);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 20 &&registeredNumbers.length <= 21){
          setDeductedAmount(90);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 22 &&registeredNumbers.length <= 23){
          setDeductedAmount(100);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 24 &&registeredNumbers.length <= 25){
          setDeductedAmount(110);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 26 &&registeredNumbers.length <= 27){
          setDeductedAmount(120);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 28 &&registeredNumbers.length <= 29){
          setDeductedAmount(130);
        }else if(selectedAmount === 20  && registeredNumbers.length >=30 &&registeredNumbers.length <= 31){
          setDeductedAmount(140);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 32 &&registeredNumbers.length <= 33){
          setDeductedAmount(150);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 34 &&registeredNumbers.length <= 35){
          setDeductedAmount(160);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 36 &&registeredNumbers.length <= 37){
          setDeductedAmount(170);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 38 &&registeredNumbers.length <= 39){
          setDeductedAmount(180);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 40 &&registeredNumbers.length <= 41){
          setDeductedAmount(190);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 42 &&registeredNumbers.length <= 43){
          setDeductedAmount(200);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 44 &&registeredNumbers.length <= 45){
          setDeductedAmount(210);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 46 &&registeredNumbers.length <= 47){
          setDeductedAmount(220);
        }else if(selectedAmount === 20  && registeredNumbers.length >= 48 &&registeredNumbers.length <= 50){
          setDeductedAmount(230);
        }else if (selectedAmount === 20  && registeredNumbers.length >= 51 && registeredNumbers.length <= 52) {
          setDeductedAmount(240);
      } else if (selectedAmount === 20  && registeredNumbers.length >= 53 && registeredNumbers.length <= 55) {
          setDeductedAmount(250);
      } else if (selectedAmount === 20  && registeredNumbers.length >= 56 && registeredNumbers.length <= 57) {
          setDeductedAmount(260);
      } else if (selectedAmount === 20  && registeredNumbers.length >= 58 && registeredNumbers.length <= 60) {
          setDeductedAmount(270);
      } else if (selectedAmount === 20  && registeredNumbers.length >= 61 && registeredNumbers.length <= 62) {
          setDeductedAmount(280);
      } else if (selectedAmount === 20  && registeredNumbers.length >= 63 && registeredNumbers.length <= 65) {
          setDeductedAmount(290);
      } else if (selectedAmount === 20  && registeredNumbers.length >= 66 && registeredNumbers.length <= 67) {
          setDeductedAmount(300);
      } else if (selectedAmount === 20  && registeredNumbers.length >= 68 && registeredNumbers.length <= 70) {
          setDeductedAmount(310);
      }else if (selectedAmount === 20  &&registeredNumbers.length >= 71 && registeredNumbers.length <= 72) {
        setDeductedAmount(320);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 73 && registeredNumbers.length <= 75) {
        setDeductedAmount(330);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 76 && registeredNumbers.length <= 77) {
        setDeductedAmount(340);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 78 && registeredNumbers.length <= 80) {
        setDeductedAmount(350);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 81 && registeredNumbers.length <= 82) {
        setDeductedAmount(360);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 83 && registeredNumbers.length <= 85) {
        setDeductedAmount(370);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 86 && registeredNumbers.length <= 87) {
        setDeductedAmount(380);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 88 && registeredNumbers.length <= 90) {
        setDeductedAmount(390);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 91 && registeredNumbers.length <= 92) {
        setDeductedAmount(400);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 93 && registeredNumbers.length <= 95) {
        setDeductedAmount(410);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 96 && registeredNumbers.length <= 97) {
        setDeductedAmount(420);
    } else if (selectedAmount === 20  &&registeredNumbers.length >= 98 && registeredNumbers.length <= 100) {
        setDeductedAmount(430);
    }else if(selectedAmount === 30  && registeredNumbers.length <= 5 ){
          setDeductedAmount(20);
        }else if(selectedAmount === 30  && registeredNumbers.length >= 6 &&registeredNumbers.length <= 7){
          setDeductedAmount(30);
        }else if(selectedAmount === 30  && registeredNumbers.length >= 8 &&registeredNumbers.length <= 9){
          setDeductedAmount(40);
        }else if(selectedAmount === 30  && registeredNumbers.length === 10){
          setDeductedAmount(50);
        }else if(selectedAmount === 30  && registeredNumbers.length === 11){
          setDeductedAmount(60);
        }else if(selectedAmount === 30  && registeredNumbers.length === 12){
          setDeductedAmount(70);
        }else if(selectedAmount === 30  && registeredNumbers.length === 13){
          setDeductedAmount(90);
        }else if(selectedAmount === 30  && registeredNumbers.length === 14){
          setDeductedAmount(100);
        }else if(selectedAmount === 30  && registeredNumbers.length === 15){
          setDeductedAmount(110);
        }else if(selectedAmount === 30  && registeredNumbers.length === 16){
          setDeductedAmount(120);
        }else if(selectedAmount === 30  && registeredNumbers.length === 17){
          setDeductedAmount(130);
        }else if(selectedAmount === 30  && registeredNumbers.length === 18){
          setDeductedAmount(140);
        }else if(selectedAmount === 30  && registeredNumbers.length === 19){
          setDeductedAmount(150);
        }else if(selectedAmount === 30  && registeredNumbers.length === 20){
          setDeductedAmount(160);
        }else if(selectedAmount === 30  && registeredNumbers.length === 21){
          setDeductedAmount(170);
        }else if(selectedAmount === 30  && registeredNumbers.length === 22){
          setDeductedAmount(180);
        }else if(selectedAmount === 30  && registeredNumbers.length === 23){
          setDeductedAmount(190);
        }else if(selectedAmount === 30  && registeredNumbers.length === 24){
          setDeductedAmount(200);
        }else if(selectedAmount === 30  && registeredNumbers.length === 25){
          setDeductedAmount(210);
        }else if(selectedAmount === 30  && registeredNumbers.length === 26){
          setDeductedAmount(220);
        }else if(selectedAmount === 30  && registeredNumbers.length === 27){
          setDeductedAmount(230);
        }else if(selectedAmount === 30  && registeredNumbers.length === 28){
          setDeductedAmount(240);
        }else if(selectedAmount === 30  && registeredNumbers.length === 29){
          setDeductedAmount(250);
        }else if(selectedAmount === 30  && registeredNumbers.length === 30){
          setDeductedAmount(260);
        }else if(selectedAmount === 30  && registeredNumbers.length === 31){
          setDeductedAmount(270);
        }else if(selectedAmount === 30  && registeredNumbers.length === 32){
          setDeductedAmount(280);
        }else if(selectedAmount === 30  && registeredNumbers.length === 33){
          setDeductedAmount(290);
        }else if(selectedAmount === 30  && registeredNumbers.length === 34){
          setDeductedAmount(300);
        }else if(selectedAmount === 30  && registeredNumbers.length === 35){
          setDeductedAmount(310);
        }else if(selectedAmount === 30  && registeredNumbers.length === 36){
          setDeductedAmount(320);
        }else if(selectedAmount === 30  && registeredNumbers.length === 37){
          setDeductedAmount(330);
        }else if(selectedAmount === 30  && registeredNumbers.length === 38){
          setDeductedAmount(340);
        }else if(selectedAmount === 30  && registeredNumbers.length === 39){
          setDeductedAmount(350);
        }else if(selectedAmount === 30  && registeredNumbers.length === 40){
          setDeductedAmount(360);
        }else if(selectedAmount === 30  && registeredNumbers.length === 41){
          setDeductedAmount(370);
        }else if(selectedAmount === 30  && registeredNumbers.length === 42){
          setDeductedAmount(380);
        }else if(selectedAmount === 30  && registeredNumbers.length === 43){
          setDeductedAmount(390);
        }else if(selectedAmount === 30  && registeredNumbers.length === 44){
          setDeductedAmount(400);
        }else if(selectedAmount === 30  && registeredNumbers.length === 45){
          setDeductedAmount(410);
        }else if(selectedAmount === 30  && registeredNumbers.length === 46){
          setDeductedAmount(420);
        }else if(selectedAmount === 30  && registeredNumbers.length === 47){
          setDeductedAmount(430);
        }else if(selectedAmount === 30  && registeredNumbers.length === 48){
          setDeductedAmount(440);
        }else if(selectedAmount === 30  && registeredNumbers.length === 49){
          setDeductedAmount(450);
        }else if(selectedAmount === 30  && registeredNumbers.length === 50){
          setDeductedAmount(460);
        }else if (selectedAmount === 30  &&registeredNumbers.length === 51) {
          setDeductedAmount(470);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 52) {
          setDeductedAmount(480);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 53) {
          setDeductedAmount(490);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 54) {
          setDeductedAmount(500);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 55) {
          setDeductedAmount(510);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 56) {
          setDeductedAmount(520);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 57) {
          setDeductedAmount(530);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 58) {
          setDeductedAmount(540);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 59) {
          setDeductedAmount(550);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 60) {
          setDeductedAmount(560);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 61) {
          setDeductedAmount(570);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 62) {
          setDeductedAmount(580);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 63) {
          setDeductedAmount(590);
      } else if (selectedAmount === 30  &&registeredNumbers.length === 64) {
          setDeductedAmount(600);
      }else if(selectedAmount === 30  &&registeredNumbers.length === 65) {
        setDeductedAmount(610);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 66) {
        setDeductedAmount(620);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 67) {
        setDeductedAmount(630);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 68) {
        setDeductedAmount(640);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 69) {
        setDeductedAmount(650);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 70) {
        setDeductedAmount(660);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 71) {
        setDeductedAmount(670);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 72) {
        setDeductedAmount(680);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 73) {
        setDeductedAmount(690);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 74) {
        setDeductedAmount(700);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 75) {
        setDeductedAmount(710);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 76) {
        setDeductedAmount(720);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 77) {
        setDeductedAmount(730);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 78) {
        setDeductedAmount(740);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 79) {
        setDeductedAmount(750);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 80) {
        setDeductedAmount(760);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 81) {
        setDeductedAmount(770);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 82) {
        setDeductedAmount(780);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 83) {
        setDeductedAmount(790);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 84) {
        setDeductedAmount(800);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 85) {
        setDeductedAmount(810);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 86) {
        setDeductedAmount(820);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 87) {
        setDeductedAmount(830);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 88) {
        setDeductedAmount(840);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 89) {
        setDeductedAmount(850);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 90) {
        setDeductedAmount(860);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 91) {
        setDeductedAmount(870);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 92) {
        setDeductedAmount(880);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 93) {
        setDeductedAmount(890);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 94) {
        setDeductedAmount(900);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 95) {
        setDeductedAmount(910);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 96) {
        setDeductedAmount(920);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 97) {
        setDeductedAmount(930);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 98) {
        setDeductedAmount(940);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 99) {
        setDeductedAmount(950);
    } else if (selectedAmount === 30  &&registeredNumbers.length === 100) {
        setDeductedAmount(960);
    }else if(selectedAmount === 40  && registeredNumbers.length <= 5){
          setDeductedAmount(20);
        }else if(selectedAmount === 40  && registeredNumbers.length === 6){
          setDeductedAmount(30);
        }else if(selectedAmount === 40  && registeredNumbers.length === 7){
          setDeductedAmount(40);
        }else if(selectedAmount === 40  && registeredNumbers.length === 8){
          setDeductedAmount(50);
        }else if (selectedAmount === 40  &&registeredNumbers.length === 9) {
          setDeductedAmount(80);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 10) {
          setDeductedAmount(90);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 11) {
          setDeductedAmount(100);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 12) {
          setDeductedAmount(110);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 13) {
          setDeductedAmount(120);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 14) {
          setDeductedAmount(130);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 15) {
          setDeductedAmount(140);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 16) {
          setDeductedAmount(150);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 17) {
          setDeductedAmount(160);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 18) {
          setDeductedAmount(170);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 19) {
          setDeductedAmount(180);
      } else if (selectedAmount === 40  &&registeredNumbers.length === 20) {
          setDeductedAmount(190);
      }else if(selectedAmount === 40  &&registeredNumbers.length === 21) {
        setDeductedAmount(200);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 22) {
        setDeductedAmount(210);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 23) {
        setDeductedAmount(220);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 24) {
        setDeductedAmount(230);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 25) {
        setDeductedAmount(240);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 26) {
        setDeductedAmount(250);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 27) {
        setDeductedAmount(260);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 28) {
        setDeductedAmount(270);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 29) {
        setDeductedAmount(280);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 30) {
        setDeductedAmount(290);
    }else  if (selectedAmount === 40  &&registeredNumbers.length === 31) {
      setDeductedAmount(300);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 32) {
      setDeductedAmount(310);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 33) {
      setDeductedAmount(320);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 34) {
      setDeductedAmount(330);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 35) {
      setDeductedAmount(340);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 36) {
      setDeductedAmount(350);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 37) {
      setDeductedAmount(360);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 38) {
      setDeductedAmount(370);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 39) {
      setDeductedAmount(380);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 40) {
      setDeductedAmount(390);
    }else if (selectedAmount === 40  &&registeredNumbers.length === 41) {
      setDeductedAmount(400);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 42) {
      setDeductedAmount(410);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 43) {
      setDeductedAmount(420);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 44) {
      setDeductedAmount(430);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 45) {
      setDeductedAmount(440);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 46) {
      setDeductedAmount(450);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 47) {
      setDeductedAmount(460);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 48) {
      setDeductedAmount(470);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 49) {
      setDeductedAmount(480);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 50) {
      setDeductedAmount(490);
    }else if (selectedAmount === 40  &&registeredNumbers.length === 51) {
      setDeductedAmount(500);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 52) {
      setDeductedAmount(510);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 53) {
      setDeductedAmount(520);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 54) {
      setDeductedAmount(530);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 55) {
      setDeductedAmount(540);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 56) {
      setDeductedAmount(550);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 57) {
      setDeductedAmount(560);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 58) {
      setDeductedAmount(570);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 59) {
      setDeductedAmount(580);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 60) {
      setDeductedAmount(590);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 61) {
      setDeductedAmount(600);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 62) {
      setDeductedAmount(610);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 63) {
      setDeductedAmount(620);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 64) {
      setDeductedAmount(630);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 65) {
      setDeductedAmount(640);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 66) {
      setDeductedAmount(650);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 67) {
      setDeductedAmount(660);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 68) {
      setDeductedAmount(670);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 69) {
      setDeductedAmount(680);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 70) {
      setDeductedAmount(690);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 71) {
      setDeductedAmount(700);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 72) {
      setDeductedAmount(710);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 73) {
      setDeductedAmount(720);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 74) {
      setDeductedAmount(730);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 75) {
      setDeductedAmount(740);
    }else if (selectedAmount === 40  &&registeredNumbers.length === 76) {
      setDeductedAmount(750);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 77) {
      setDeductedAmount(760);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 78) {
      setDeductedAmount(770);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 79) {
      setDeductedAmount(780);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 80) {
      setDeductedAmount(790);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 81) {
      setDeductedAmount(800);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 82) {
      setDeductedAmount(810);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 83) {
      setDeductedAmount(820);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 84) {
      setDeductedAmount(830);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 85) {
      setDeductedAmount(840);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 86) {
      setDeductedAmount(850);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 87) {
      setDeductedAmount(860);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 88) {
      setDeductedAmount(870);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 89) {
      setDeductedAmount(880);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 90) {
      setDeductedAmount(890);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 91) {
      setDeductedAmount(900);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 92) {
      setDeductedAmount(910);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 93) {
      setDeductedAmount(920);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 94) {
      setDeductedAmount(930);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 95) {
      setDeductedAmount(940);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 96) {
      setDeductedAmount(950);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 97) {
      setDeductedAmount(960);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 98) {
      setDeductedAmount(970);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 99) {
      setDeductedAmount(980);
    } else if (selectedAmount === 40  &&registeredNumbers.length === 100) {
      setDeductedAmount(990);
    }else if (selectedAmount === 50  &&registeredNumbers.length <= 3) {
      setDeductedAmount(20);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 4) {
      setDeductedAmount(30);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 5) {
      setDeductedAmount(50);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 6) {
      setDeductedAmount(60);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 7) {
      setDeductedAmount(80);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 8) {
      setDeductedAmount(90);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 9) {
      setDeductedAmount(100);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 10) {
      setDeductedAmount(110);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 11) {
      setDeductedAmount(120);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 12) {
      setDeductedAmount(130);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 13) {
      setDeductedAmount(140);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 14) {
      setDeductedAmount(150);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 15) {
      setDeductedAmount(160);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 16) {
      setDeductedAmount(200);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 17) {
      setDeductedAmount(210);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 18) {
      setDeductedAmount(220);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 19) {
      setDeductedAmount(250);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 20) {
      setDeductedAmount(300);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 21) {
      setDeductedAmount(310);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 22) {
      setDeductedAmount(320);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 23) {
      setDeductedAmount(350);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 24) {
      setDeductedAmount(360);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 25) {
      setDeductedAmount(380);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 26) {
      setDeductedAmount(400);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 27) {
      setDeductedAmount(420);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 28) {
      setDeductedAmount(450);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 29) {
      setDeductedAmount(460);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 30) {
      setDeductedAmount(470);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 31) {
      setDeductedAmount(480);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 32) {
      setDeductedAmount(490);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 33) {
      setDeductedAmount(500);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 34) {
      setDeductedAmount(510);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 35) {
      setDeductedAmount(520);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 36) {
      setDeductedAmount(530);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 37) {
      setDeductedAmount(540);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 38) {
      setDeductedAmount(550);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 39) {
      setDeductedAmount(560);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 40) {
      setDeductedAmount(570);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 41) {
      setDeductedAmount(600);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 42) {
      setDeductedAmount(630);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 43) {
      setDeductedAmount(650);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 44) {
      setDeductedAmount(660);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 45) {
      setDeductedAmount(670);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 46) {
      setDeductedAmount(680);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 47) {
      setDeductedAmount(690);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 48) {
      setDeductedAmount(700);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 49) {
      setDeductedAmount(750);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 50) {
      setDeductedAmount(760);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 51) {
      setDeductedAmount(770);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 52) {
      setDeductedAmount(790);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 53) {
      setDeductedAmount(810);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 54) {
      setDeductedAmount(830);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 55) {
      setDeductedAmount(850);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 56) {
      setDeductedAmount(870);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 57) {
      setDeductedAmount(890);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 58) {
      setDeductedAmount(910);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 59) {
      setDeductedAmount(930);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 60) {
      setDeductedAmount(950);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 61) {
      setDeductedAmount(970);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 62) {
      setDeductedAmount(990);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 63) {
      setDeductedAmount(1010);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 64) {
      setDeductedAmount(1030);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 65) {
      setDeductedAmount(1050);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 66) {
      setDeductedAmount(1070);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 67) {
      setDeductedAmount(1090);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 68) {
      setDeductedAmount(1110);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 69) {
      setDeductedAmount(1130);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 70) {
      setDeductedAmount(1150);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 71) {
      setDeductedAmount(1170);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 72) {
      setDeductedAmount(1190);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 73) {
      setDeductedAmount(1210);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 74) {
      setDeductedAmount(1230);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 75) {
      setDeductedAmount(1250);
    }else if (selectedAmount === 50  &&registeredNumbers.length === 76) {
      setDeductedAmount(1270);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 77) {
      setDeductedAmount(1290);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 78) {
      setDeductedAmount(1310);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 79) {
      setDeductedAmount(1330);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 80) {
      setDeductedAmount(1350);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 81) {
      setDeductedAmount(1370);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 82) {
      setDeductedAmount(1390);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 83) {
      setDeductedAmount(1410);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 84) {
      setDeductedAmount(1430);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 85) {
      setDeductedAmount(1450);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 86) {
      setDeductedAmount(1470);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 87) {
      setDeductedAmount(1490);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 88) {
      setDeductedAmount(1510);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 89) {
      setDeductedAmount(1530);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 90) {
      setDeductedAmount(1550);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 91) {
      setDeductedAmount(1570);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 92) {
      setDeductedAmount(1590);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 93) {
      setDeductedAmount(1610);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 94) {
      setDeductedAmount(1630);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 95) {
      setDeductedAmount(1650);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 96) {
      setDeductedAmount(1670);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 97) {
      setDeductedAmount(1690);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 98) {
      setDeductedAmount(1710);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 99) {
      setDeductedAmount(1730);
    } else if (selectedAmount === 50  &&registeredNumbers.length === 100) {
      setDeductedAmount(1750);
    }else if (selectedAmount === 100  &&registeredNumbers.length <= 3) {
      setDeductedAmount(20);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 4) {
      setDeductedAmount(30);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 5) {
      setDeductedAmount(50);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 6) {
      setDeductedAmount(130);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 7) {
      setDeductedAmount(150);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 8) {
      setDeductedAmount(200);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 9) {
      setDeductedAmount(250);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 10) {
      setDeductedAmount(300);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 11) {
      setDeductedAmount(330);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 12) {
      setDeductedAmount(360);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 13) {
      setDeductedAmount(390);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 14) {
      setDeductedAmount(420);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 15) {
      setDeductedAmount(460);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 16) {
      setDeductedAmount(490);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 17) {
      setDeductedAmount(520);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 18) {
      setDeductedAmount(550);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 19) {
      setDeductedAmount(570);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 20) {
      setDeductedAmount(600);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 21) {
      setDeductedAmount(630);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 22) {
      setDeductedAmount(660);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 23) {
      setDeductedAmount(690);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 24) {
      setDeductedAmount(720);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 25) {
      setDeductedAmount(750);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 26) {
      setDeductedAmount(780);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 27) {
      setDeductedAmount(810);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 28) {
      setDeductedAmount(840);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 29) {
      setDeductedAmount(870);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 30) {
      setDeductedAmount(900);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 31) {
      setDeductedAmount(930);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 32) {
      setDeductedAmount(960);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 33) {
      setDeductedAmount(990);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 34) {
      setDeductedAmount(1020);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 35) {
      setDeductedAmount(1050);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 36) {
      setDeductedAmount(1080);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 37) {
      setDeductedAmount(1110);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 38) {
      setDeductedAmount(1140);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 39) {
      setDeductedAmount(1170);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 40) {
      setDeductedAmount(1200);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 41) {
      setDeductedAmount(1230);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 42) {
      setDeductedAmount(1260);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 43) {
      setDeductedAmount(1290);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 44) {
      setDeductedAmount(1320);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 45) {
      setDeductedAmount(1350);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 46) {
      setDeductedAmount(1380);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 47) {
      setDeductedAmount(1410);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 48) {
      setDeductedAmount(1440);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 49) {
      setDeductedAmount(1470);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 50) {
      setDeductedAmount(1500);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 51) {
      setDeductedAmount(1530);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 52) {
      setDeductedAmount(1560);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 53) {
      setDeductedAmount(1590);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 54) {
      setDeductedAmount(1620);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 55) {
      setDeductedAmount(1650);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 56) {
      setDeductedAmount(1680);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 57) {
      setDeductedAmount(1710);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 58) {
      setDeductedAmount(1740);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 59) {
      setDeductedAmount(1770);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 60) {
      setDeductedAmount(1800);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 61) {
      setDeductedAmount(1830);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 62) {
      setDeductedAmount(1860);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 63) {
      setDeductedAmount(1890);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 64) {
      setDeductedAmount(1920);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 65) {
      setDeductedAmount(1950);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 66) {
      setDeductedAmount(1980);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 67) {
      setDeductedAmount(2010);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 68) {
      setDeductedAmount(2040);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 69) {
      setDeductedAmount(2070);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 70) {
      setDeductedAmount(2100);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 71) {
      setDeductedAmount(2130);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 72) {
      setDeductedAmount(2160);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 73) {
      setDeductedAmount(2190);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 74) {
      setDeductedAmount(2220);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 75) {
      setDeductedAmount(2250);
    }else if (selectedAmount === 100  &&registeredNumbers.length === 76) {
      setDeductedAmount(2280);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 77) {
      setDeductedAmount(2310);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 78) {
      setDeductedAmount(2340);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 79) {
      setDeductedAmount(2370);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 80) {
      setDeductedAmount(2400);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 81) {
      setDeductedAmount(2430);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 82) {
      setDeductedAmount(2460);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 83) {
      setDeductedAmount(2490);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 84) {
      setDeductedAmount(2520);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 85) {
      setDeductedAmount(2550);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 86) {
      setDeductedAmount(2580);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 87) {
      setDeductedAmount(2610);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 88) {
      setDeductedAmount(2640);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 89) {
      setDeductedAmount(2670);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 90) {
      setDeductedAmount(2700);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 91) {
      setDeductedAmount(2730);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 92) {
      setDeductedAmount(2760);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 93) {
      setDeductedAmount(2790);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 94) {
      setDeductedAmount(2820);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 95) {
      setDeductedAmount(2850);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 96) {
      setDeductedAmount(2880);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 97) {
      setDeductedAmount(2910);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 98) {
      setDeductedAmount(2940);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 99) {
      setDeductedAmount(2970);
    } else if (selectedAmount === 100  &&registeredNumbers.length === 100) {
      setDeductedAmount(3000);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 1) {
      setDeductedAmount(30);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 2) {
      setDeductedAmount(40);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 3) {
      setDeductedAmount(50);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 4) {
      setDeductedAmount(60);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 5) {
      setDeductedAmount(200);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 6) {
      setDeductedAmount(260);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 7) {
      setDeductedAmount(320);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 8) {
      setDeductedAmount(480);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 9) {
      setDeductedAmount(540);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 10) {
      setDeductedAmount(600);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 11) {
      setDeductedAmount(660);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 12) {
      setDeductedAmount(720);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 13) {
      setDeductedAmount(780);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 14) {
      setDeductedAmount(840);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 15) {
      setDeductedAmount(900);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 16) {
      setDeductedAmount(960);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 17) {
      setDeductedAmount(1020);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 18) {
      setDeductedAmount(1080);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 19) {
      setDeductedAmount(1140);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 20) {
      setDeductedAmount(1200);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 21) {
      setDeductedAmount(1260);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 22) {
      setDeductedAmount(1320);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 23) {
      setDeductedAmount(1380);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 24) {
      setDeductedAmount(1440);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 25) {
      setDeductedAmount(1500);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 26) {
      setDeductedAmount(1560);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 27) {
      setDeductedAmount(1620);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 28) {
      setDeductedAmount(1680);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 29) {
      setDeductedAmount(1740);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 30) {
      setDeductedAmount(1800);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 31) {
      setDeductedAmount(1860);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 32) {
      setDeductedAmount(1920);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 33) {
      setDeductedAmount(1980);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 34) {
      setDeductedAmount(2040);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 35) {
      setDeductedAmount(2100);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 36) {
      setDeductedAmount(2160);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 37) {
      setDeductedAmount(2220);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 38) {
      setDeductedAmount(2280);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 39) {
      setDeductedAmount(2340);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 40) {
      setDeductedAmount(2400);
    } else  if (selectedAmount === 200  &&registeredNumbers.length === 41) {
      setDeductedAmount(2460);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 42) {
      setDeductedAmount(2520);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 43) {
      setDeductedAmount(2580);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 44) {
      setDeductedAmount(2640);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 45) {
      setDeductedAmount(2700);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 46) {
      setDeductedAmount(2760);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 47) {
      setDeductedAmount(2820);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 48) {
      setDeductedAmount(2880);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 49) {
      setDeductedAmount(2940);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 50) {
      setDeductedAmount(3000);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 51) {
      setDeductedAmount(3060);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 52) {
      setDeductedAmount(3120);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 53) {
      setDeductedAmount(3180);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 54) {
      setDeductedAmount(3240);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 55) {
      setDeductedAmount(3300);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 56) {
      setDeductedAmount(3360);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 57) {
      setDeductedAmount(3420);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 58) {
      setDeductedAmount(3480);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 59) {
      setDeductedAmount(3540);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 60) {
      setDeductedAmount(3600);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 61) {
      setDeductedAmount(3660);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 62) {
      setDeductedAmount(3720);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 63) {
      setDeductedAmount(3780);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 64) {
      setDeductedAmount(3840);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 65) {
      setDeductedAmount(3900);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 66) {
      setDeductedAmount(3960);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 67) {
      setDeductedAmount(4020);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 68) {
      setDeductedAmount(4080);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 69) {
      setDeductedAmount(4140);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 70) {
      setDeductedAmount(4200);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 71) {
      setDeductedAmount(4260);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 72) {
      setDeductedAmount(4320);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 73) {
      setDeductedAmount(4380);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 74) {
      setDeductedAmount(4440);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 75) {
      setDeductedAmount(4500);
    }else if (selectedAmount === 200  &&registeredNumbers.length === 76) {
      setDeductedAmount(4560);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 77) {
      setDeductedAmount(4620);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 78) {
      setDeductedAmount(4680);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 79) {
      setDeductedAmount(4740);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 80) {
      setDeductedAmount(4800);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 81) {
      setDeductedAmount(4860);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 82) {
      setDeductedAmount(4920);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 83) {
      setDeductedAmount(4980);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 84) {
      setDeductedAmount(5040);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 85) {
      setDeductedAmount(5100);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 86) {
      setDeductedAmount(5160);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 87) {
      setDeductedAmount(5220);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 88) {
      setDeductedAmount(5280);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 89) {
      setDeductedAmount(5340);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 90) {
      setDeductedAmount(5400);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 91) {
      setDeductedAmount(5460);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 92) {
      setDeductedAmount(5520);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 93) {
      setDeductedAmount(5580);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 94) {
      setDeductedAmount(5640);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 95) {
      setDeductedAmount(5700);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 96) {
      setDeductedAmount(5760);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 97) {
      setDeductedAmount(5820);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 98) {
      setDeductedAmount(5880);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 99) {
      setDeductedAmount(5940);
    } else if (selectedAmount === 200  &&registeredNumbers.length === 100) {
      setDeductedAmount(6000);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 1) {
      setDeductedAmount(60);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 2) {
      setDeductedAmount(130);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 3) {
      setDeductedAmount(220);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 4) {
      setDeductedAmount(360);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 5) {
      setDeductedAmount(450);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 6) {
      setDeductedAmount(540);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 7) {
      setDeductedAmount(630);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 8) {
      setDeductedAmount(720);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 9) {
      setDeductedAmount(810);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 10) {
      setDeductedAmount(900);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 11) {
      setDeductedAmount(990);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 12) {
      setDeductedAmount(1080);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 13) {
      setDeductedAmount(1170);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 14) {
      setDeductedAmount(1260);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 15) {
      setDeductedAmount(1350);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 16) {
      setDeductedAmount(1440);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 17) {
      setDeductedAmount(1530);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 18) {
      setDeductedAmount(1620);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 19) {
      setDeductedAmount(1710);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 20) {
      setDeductedAmount(1800);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 21) {
      setDeductedAmount(1890);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 22) {
      setDeductedAmount(1980);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 23) {
      setDeductedAmount(2070);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 24) {
      setDeductedAmount(2160);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 25) {
      setDeductedAmount(2250);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 26) {
      setDeductedAmount(2340);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 27) {
      setDeductedAmount(2430);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 28) {
      setDeductedAmount(2520);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 29) {
      setDeductedAmount(2610);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 30) {
      setDeductedAmount(2700);
    }else  if (selectedAmount === 300  &&registeredNumbers.length === 31) {
      setDeductedAmount(2790);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 32) {
      setDeductedAmount(2880);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 33) {
      setDeductedAmount(2970);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 34) {
      setDeductedAmount(3060);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 35) {
      setDeductedAmount(3150);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 36) {
      setDeductedAmount(3240);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 37) {
      setDeductedAmount(3330);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 38) {
      setDeductedAmount(3420);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 39) {
      setDeductedAmount(3510);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 40) {
      setDeductedAmount(3600);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 41) {
      setDeductedAmount(3690);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 42) {
      setDeductedAmount(3780);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 43) {
      setDeductedAmount(3870);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 44) {
      setDeductedAmount(3960);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 45) {
      setDeductedAmount(4050);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 46) {
      setDeductedAmount(4140);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 47) {
      setDeductedAmount(4230);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 48) {
      setDeductedAmount(4320);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 49) {
      setDeductedAmount(4410);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 50) {
      setDeductedAmount(4500);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 51) {
      setDeductedAmount(4590);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 52) {
      setDeductedAmount(4680);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 53) {
      setDeductedAmount(4770);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 54) {
      setDeductedAmount(4860);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 55) {
      setDeductedAmount(4950);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 56) {
      setDeductedAmount(5040);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 57) {
      setDeductedAmount(5130);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 58) {
      setDeductedAmount(5220);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 59) {
      setDeductedAmount(5310);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 60) {
      setDeductedAmount(5400);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 61) {
      setDeductedAmount(5490);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 62) {
      setDeductedAmount(5580);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 63) {
      setDeductedAmount(5670);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 64) {
      setDeductedAmount(5760);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 65) {
      setDeductedAmount(5850);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 66) {
      setDeductedAmount(5940);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 67) {
      setDeductedAmount(6030);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 68) {
      setDeductedAmount(6120);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 69) {
      setDeductedAmount(6210);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 70) {
      setDeductedAmount(6300);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 71) {
      setDeductedAmount(6390);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 72) {
      setDeductedAmount(6480);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 73) {
      setDeductedAmount(6570);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 74) {
      setDeductedAmount(6660);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 75) {
      setDeductedAmount(6750);
    }else if (selectedAmount === 300  &&registeredNumbers.length === 76) {
      setDeductedAmount(6840);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 77) {
      setDeductedAmount(6930);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 78) {
      setDeductedAmount(7020);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 79) {
      setDeductedAmount(7110);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 80) {
      setDeductedAmount(7200);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 81) {
      setDeductedAmount(7290);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 82) {
      setDeductedAmount(7380);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 83) {
      setDeductedAmount(7470);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 84) {
      setDeductedAmount(7560);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 85) {
      setDeductedAmount(7650);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 86) {
      setDeductedAmount(7740);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 87) {
      setDeductedAmount(7830);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 88) {
      setDeductedAmount(7920);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 89) {
      setDeductedAmount(8010);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 90) {
      setDeductedAmount(8100);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 91) {
      setDeductedAmount(8190);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 92) {
      setDeductedAmount(8280);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 93) {
      setDeductedAmount(8370);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 94) {
      setDeductedAmount(8460);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 95) {
      setDeductedAmount(8550);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 96) {
      setDeductedAmount(8640);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 97) {
      setDeductedAmount(8730);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 98) {
      setDeductedAmount(8820);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 99) {
      setDeductedAmount(8910);
    } else if (selectedAmount === 300  &&registeredNumbers.length === 100) {
      setDeductedAmount(9000);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 1) {
      setDeductedAmount(90);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 2) {
      setDeductedAmount(200);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 3) {
      setDeductedAmount(360);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 4) {
      setDeductedAmount(480);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 5) {
      setDeductedAmount(600);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 6) {
      setDeductedAmount(720);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 7) {
      setDeductedAmount(840);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 8) {
      setDeductedAmount(960);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 9) {
      setDeductedAmount(1060);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 10) {
      setDeductedAmount(1200);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 11) {
      setDeductedAmount(1320);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 12) {
      setDeductedAmount(1440);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 13) {
      setDeductedAmount(1560);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 14) {
      setDeductedAmount(1680);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 15) {
      setDeductedAmount(1800);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 16) {
      setDeductedAmount(1920);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 17) {
      setDeductedAmount(2040);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 18) {
      setDeductedAmount(2160);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 19) {
      setDeductedAmount(2280);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 20) {
      setDeductedAmount(2400);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 21) {
      setDeductedAmount(2520);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 22) {
      setDeductedAmount(2640);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 23) {
      setDeductedAmount(2760);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 24) {
      setDeductedAmount(2880);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 25) {
      setDeductedAmount(3000);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 26) {
      setDeductedAmount(3120);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 27) {
      setDeductedAmount(3240);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 28) {
      setDeductedAmount(3360);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 29) {
      setDeductedAmount(3480);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 30) {
      setDeductedAmount(3600);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 31) {
      setDeductedAmount(3720);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 32) {
      setDeductedAmount(3840);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 33) {
      setDeductedAmount(3960);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 34) {
      setDeductedAmount(4080);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 35) {
      setDeductedAmount(4200);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 36) {
      setDeductedAmount(4320);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 37) {
      setDeductedAmount(4440);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 38) {
      setDeductedAmount(4560);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 39) {
      setDeductedAmount(4680);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 40) {
      setDeductedAmount(4800);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 41) {
      setDeductedAmount(4920);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 42) {
      setDeductedAmount(5040);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 43) {
      setDeductedAmount(5160);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 44) {
      setDeductedAmount(5280);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 45) {
      setDeductedAmount(5400);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 46) {
      setDeductedAmount(5520);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 47) {
      setDeductedAmount(5640);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 48) {
      setDeductedAmount(5760);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 49) {
      setDeductedAmount(5880);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 50) {
      setDeductedAmount(6000);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 51) {
      setDeductedAmount(6120);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 52) {
      setDeductedAmount(6240);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 53) {
      setDeductedAmount(6360);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 54) {
      setDeductedAmount(6480);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 55) {
      setDeductedAmount(6600);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 56) {
      setDeductedAmount(6720);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 57) {
      setDeductedAmount(6840);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 58) {
      setDeductedAmount(6960);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 59) {
      setDeductedAmount(7080);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 60) {
      setDeductedAmount(7200);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 61) {
      setDeductedAmount(7320);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 62) {
      setDeductedAmount(7440);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 63) {
      setDeductedAmount(7560);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 64) {
      setDeductedAmount(7680);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 65) {
      setDeductedAmount(7800);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 66) {
      setDeductedAmount(7920);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 67) {
      setDeductedAmount(8040);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 68) {
      setDeductedAmount(8160);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 69) {
      setDeductedAmount(8280);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 70) {
      setDeductedAmount(8400);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 71) {
      setDeductedAmount(8520);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 72) {
      setDeductedAmount(8640);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 73) {
      setDeductedAmount(8760);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 74) {
      setDeductedAmount(8880);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 75) {
      setDeductedAmount(9000);
    }else if (selectedAmount === 400  &&registeredNumbers.length === 76) {
      setDeductedAmount(9600);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 77) {
      setDeductedAmount(9720);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 78) {
      setDeductedAmount(9840);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 79) {
      setDeductedAmount(9960);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 80) {
      setDeductedAmount(10080);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 81) {
      setDeductedAmount(10200);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 82) {
      setDeductedAmount(10320);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 83) {
      setDeductedAmount(10440);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 84) {
      setDeductedAmount(10560);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 85) {
      setDeductedAmount(10680);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 86) {
      setDeductedAmount(10800);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 87) {
      setDeductedAmount(10920);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 88) {
      setDeductedAmount(11040);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 89) {
      setDeductedAmount(11160);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 90) {
      setDeductedAmount(11280);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 91) {
      setDeductedAmount(11400);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 92) {
      setDeductedAmount(11520);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 93) {
      setDeductedAmount(11640);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 94) {
      setDeductedAmount(11760);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 95) {
      setDeductedAmount(11880);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 96) {
      setDeductedAmount(12000);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 97) {
      setDeductedAmount(12120);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 98) {
      setDeductedAmount(12240);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 99) {
      setDeductedAmount(12360);
    } else if (selectedAmount === 400  &&registeredNumbers.length === 100) {
      setDeductedAmount(12480);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 1) {
      setDeductedAmount(110);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 2) {
      setDeductedAmount(300);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 3) {
      setDeductedAmount(450);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 4) {
      setDeductedAmount(600);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 5) {
      setDeductedAmount(750);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 6) {
      setDeductedAmount(900);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 7) {
      setDeductedAmount(1050);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 8) {
      setDeductedAmount(1200);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 9) {
      setDeductedAmount(1350);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 10) {
      setDeductedAmount(1500);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 11) {
      setDeductedAmount(1650);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 12) {
      setDeductedAmount(1800);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 13) {
      setDeductedAmount(1950);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 14) {
      setDeductedAmount(2100);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 15) {
      setDeductedAmount(2250);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 16) {
      setDeductedAmount(2400);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 17) {
      setDeductedAmount(2550);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 18) {
      setDeductedAmount(2700);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 19) {
      setDeductedAmount(2850);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 20) {
      setDeductedAmount(3000);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 21) {
      setDeductedAmount(3150);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 22) {
      setDeductedAmount(3300);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 23) {
      setDeductedAmount(3450);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 24) {
      setDeductedAmount(3600);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 25) {
      setDeductedAmount(3750);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 26) {
      setDeductedAmount(3900);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 27) {
      setDeductedAmount(4050);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 28) {
      setDeductedAmount(4200);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 29) {
      setDeductedAmount(4350);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 30) {
      setDeductedAmount(4500);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 31) {
      setDeductedAmount(4650);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 32) {
      setDeductedAmount(4800);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 33) {
      setDeductedAmount(4950);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 34) {
      setDeductedAmount(5100);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 35) {
      setDeductedAmount(5250);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 36) {
      setDeductedAmount(5400);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 37) {
      setDeductedAmount(5550);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 38) {
      setDeductedAmount(5700);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 39) {
      setDeductedAmount(5850);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 40) {
      setDeductedAmount(6000);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 41) {
      setDeductedAmount(6150);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 42) {
      setDeductedAmount(6300);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 43) {
      setDeductedAmount(6450);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 44) {
      setDeductedAmount(6600);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 45) {
      setDeductedAmount(6750);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 46) {
      setDeductedAmount(6900);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 47) {
      setDeductedAmount(7050);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 48) {
      setDeductedAmount(7200);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 49) {
      setDeductedAmount(7350);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 50) {
      setDeductedAmount(7500);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 51) {
      setDeductedAmount(7650);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 52) {
      setDeductedAmount(7800);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 53) {
      setDeductedAmount(7950);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 54) {
      setDeductedAmount(8100);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 55) {
      setDeductedAmount(8250);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 56) {
      setDeductedAmount(8400);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 57) {
      setDeductedAmount(8550);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 58) {
      setDeductedAmount(8700);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 59) {
      setDeductedAmount(8850);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 60) {
      setDeductedAmount(9000);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 61) {
      setDeductedAmount(9150);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 62) {
      setDeductedAmount(9300);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 63) {
      setDeductedAmount(9450);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 64) {
      setDeductedAmount(9600);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 65) {
      setDeductedAmount(9750);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 66) {
      setDeductedAmount(9900);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 67) {
      setDeductedAmount(10050);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 68) {
      setDeductedAmount(10200);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 69) {
      setDeductedAmount(10350);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 70) {
      setDeductedAmount(10500);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 71) {
      setDeductedAmount(10650);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 72) {
      setDeductedAmount(10800);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 73) {
      setDeductedAmount(10950);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 74) {
      setDeductedAmount(11100);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 75) {
      setDeductedAmount(11250);
    }else if (selectedAmount === 500  &&registeredNumbers.length === 76) {
      setDeductedAmount(11400);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 77) {
      setDeductedAmount(11550);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 78) {
      setDeductedAmount(11700);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 79) {
      setDeductedAmount(11850);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 80) {
      setDeductedAmount(12000);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 81) {
      setDeductedAmount(12150);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 82) {
      setDeductedAmount(12300);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 83) {
      setDeductedAmount(12450);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 84) {
      setDeductedAmount(12600);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 85) {
      setDeductedAmount(12750);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 86) {
      setDeductedAmount(12900);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 87) {
      setDeductedAmount(13050);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 88) {
      setDeductedAmount(13200);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 89) {
      setDeductedAmount(13350);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 90) {
      setDeductedAmount(13500);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 91) {
      setDeductedAmount(13650);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 92) {
      setDeductedAmount(13800);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 93) {
      setDeductedAmount(13950);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 94) {
      setDeductedAmount(14100);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 95) {
      setDeductedAmount(14250);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 96) {
      setDeductedAmount(14400);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 97) {
      setDeductedAmount(14550);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 98) {
      setDeductedAmount(14700);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 99) {
      setDeductedAmount(14850);
    } else if (selectedAmount === 500  &&registeredNumbers.length === 100) {
      setDeductedAmount(15000);
    }
    
    
        // Calculate the remaining money after deduction
        const remaining = totalAmount - deductedAmount;
        setRemainingMoney(remaining);
        // eslint-disable-next-line
      }, [registeredNumbers, selectedAmount, totalAmount]);

  const handleClick = async () => {
    try {
      if (previousBalance === null || deductedAmount === null) {
        return; // Return early if either previousBalance or deductedAmount is null
      }
      console.log(previousBalance);
      console.log(parseInt(deductedAmount))
      setCreatingReport(true);
      // Save the previous balance before deducting the amount
      const deductedAmountInt = parseInt(deductedAmount); // Ensure it's an integer
      const newBalance = previousBalance - deductedAmountInt;
  
      if (newBalance <= 0 || isNaN(newBalance) || newBalance === null) {
        return;
      }
      const response = await axios.put(
        `https://binx3.wabisecurityandcleaningservice.com/api/user/update`,
        { userName, newBalance }
      );
  
      if (response.status === 200) {
        console.log("Balance updated successfully");
      } else {
        return;
      }
  
      localStorage.setItem("remainingMoney", remainingMoney);
      localStorage.setItem("deductedAmount", deductedAmount);
      await createReport();
    } catch (error) {
      console.error("Report creation failed:", error);
      setCreatingReport(false);
   // Handle the error, e.g., show a message to the user
    }
  };

  const handleregisterClick = () => {
    navigate("/registerdcard");
  };
  const handleReportClick = () => {
    navigate("/report");
  };
  const handlepewzew = () => {
    const pewzew = new Audio(pewwzew);
    pewzew.play();
  };
  const resetRoundCountIfNewDay = () => {
    const lastResetDate = localStorage.getItem("lastResetDate");
    const currentDate = new Date().toLocaleDateString();

    if (lastResetDate !== currentDate) {
      localStorage.setItem("roundsPlayed", "1");
      localStorage.setItem("lastResetDate", currentDate);
    }
  };

  const createReport = async () => {
    try {
      const response = await axios.post("https://binx3.wabisecurityandcleaningservice.com/api/report", {
        round: round,
        selectedAmount: selectedAmount,
        deductedAmount: deductedAmount,
        userName: userName,
        winAmount: remainingMoney,
        noOfPlayer: registeredNumbers.length,
      });

      if (response.status === 200) {
        console.log("Report created successfully:", response.data);

        const audio = new Audio(startAudio);
        audio.onended = () => {
          const roundsPlayed =
            JSON.parse(localStorage.getItem("roundsPlayed")) || 0;
          localStorage.setItem("roundsPlayed", roundsPlayed + 1);

          navigate("/randombingonumber");
        };
        audio.play();

        // Handle the response as needed
      } else {
        throw new Error("Failed to create report. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error creating report:", error);
      setCreatingReport(false);
      // Handle errors
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.bounce}><BouncingBalls/></div>
      <div className={styles.link}>
          <button onClickCapture={handleregisterClick}  >RegisterCard</button>
        <button onClickCapture={handleReportClick} >Report</button>
        <button onClick={handleLogOut}  >Logout</button>
      </div>
      <div className={styles.card}>
        <img src={BingoCard} alt="Bingo Card" />
      </div>
      <div className={styles.remaining}>{remainingMoney}ብር ወሳጅ</div>
      <div className={styles.button}>
        <button
          onClick={handleClick}
          disabled={registeredNumbers.length <= 1 || creatingReport}
          className={styles.lowbutton}
        >
         Start
        </button>
        <div onClick={handlepewzew} className={styles.pewzew}>
          ፐውዘው
        </div>
      </div>
    </div>
  );
};

export default StartBingo;
