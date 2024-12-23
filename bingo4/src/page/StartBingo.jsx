import React, { useState, useEffect } from 'react';
import styles from '../css/start.module.css';
import { useNavigate } from 'react-router-dom';
import BingoCard from '../images/bingocard.jpg';
import startAudio from '../audio/START.mp4';
import pewwzew from '../audio/pewzew.mp4';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios'
import { supabase } from '../store/Supabase'
import { useLogout } from '../hooks/useLogout';


const StartBingo = () => {
  const { logout } = useLogout();
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  const [fetchedUser, setFetchedUser] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [round, setRound] = useState(1);
  const [remainingMoney, setRemainingMoney] = useState(0);
  // eslint-disable-next-line
  const [deductedAmount, setDeductedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userName, setUserName] = useState('');
  const [creatingReport, setCreatingReport] = useState(false);
  // eslint-disable-next-line
    const [playType, setPlayType] = useState(null);
  const navigate = useNavigate();
  const {user} = useAuthContext()

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };
  const fetchUserByUsername = async (userName) => {
    try {
      const response = await axios.get(`https://bingoproject-3.onrender.com/api/user/${userName}`);
      console.log('Fetched user by username:', response.data);
      setFetchedUser(response.data)
      // Handle the fetched user data as needed
    } catch (error) {
      console.error('Error fetching user by username:', error);
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
    const storedNumbers = localStorage.getItem('registeredNumbers');
    const storedAmount = localStorage.getItem('selectedAmount');
    const round = localStorage.getItem('roundsPlayed');

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }
    if (round) {
      setRound(Number(round));
    }
    if (storedAmount) {
      setSelectedAmount(Number(storedAmount));
    }
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
    }else if(selectedAmount === 30  && registeredNumbers.length <= 5 ){
      setDeductedAmount(30);
    }else if(selectedAmount === 30  && registeredNumbers.length >= 6 &&registeredNumbers.length <= 7){
      setDeductedAmount(40);
    }else if(selectedAmount === 30  && registeredNumbers.length >= 8 &&registeredNumbers.length <= 9){
      setDeductedAmount(50);
    }else if(selectedAmount === 30  && registeredNumbers.length === 10){
      setDeductedAmount(60);
    }else if(selectedAmount === 30  && registeredNumbers.length === 11){
      setDeductedAmount(70);
    }else if(selectedAmount === 30  && registeredNumbers.length === 12){
      setDeductedAmount(80);
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
    }else if(selectedAmount === 40  && registeredNumbers.length <= 5){
      setDeductedAmount(40);
    }else if(selectedAmount === 40  && registeredNumbers.length === 6){
      setDeductedAmount(50);
    }else if(selectedAmount === 40  && registeredNumbers.length === 7){
      setDeductedAmount(60);
    }else if(selectedAmount === 40  && registeredNumbers.length === 8){
      setDeductedAmount(70);
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
}else if (selectedAmount === 50  &&registeredNumbers.length <= 5) {
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
}else if (selectedAmount === 100  &&registeredNumbers.length <= 5) {
  setDeductedAmount(100);
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
} else if (selectedAmount === 200  &&registeredNumbers.length === 1) {
  setDeductedAmount(90);
}else if (selectedAmount === 200  &&registeredNumbers.length === 2) {
  setDeductedAmount(90);
} else if (selectedAmount === 200  &&registeredNumbers.length === 3) {
  setDeductedAmount(130);
}else if (selectedAmount === 200  &&registeredNumbers.length === 4) {
  setDeductedAmount(200);
}else if (selectedAmount === 200  &&registeredNumbers.length === 5) {
  setDeductedAmount(300);
}else if (selectedAmount === 200  &&registeredNumbers.length === 6) {
  setDeductedAmount(360);
}else if (selectedAmount === 200  &&registeredNumbers.length === 7) {
  setDeductedAmount(420);
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
}


    // Calculate the remaining money after deduction
    const remaining = totalAmount - deductedAmount;
    setRemainingMoney(remaining);
    // eslint-disable-next-line
  }, [registeredNumbers, selectedAmount, totalAmount]);
useEffect(() => {
    if (userName) {
      fetchPlayTypeByUsername(userName);
    }
  }, [userName]); 
  const fetchPlayTypeByUsername = async (username) => {
      try {
          const { data, error } = await supabase
              .from('algorithm')
              .select('playType')
              .eq('userName', username)
              .single();
          
          if (error) {
              throw error;
          }
  
          if (data) {
              const fetchedPlayType = data.playType;
              setPlayType(fetchedPlayType);
  
              // Save the fetched playType to localStorage
              localStorage.setItem('playType', fetchedPlayType);
          }
      } catch (error) {
          console.error('Error fetching playType by username:', error.message);
      }
  };
  const handleClick = async () => {
    try {
        console.log(userName);
        setCreatingReport(true);
        const newBalance = fetchedUser.balance - deductedAmount;

        const response = await axios.put(`https://bingoproject-3.onrender.com/api/user/update`, { userName, newBalance });

        if (response.status === 200) {
            console.log('Balance updated successfully');
        } else {
            return;
        }

        localStorage.setItem('remainingMoney', remainingMoney);
        await createReport();
    } catch (error) {
        console.error('Report creation failed:', error);
        // Handle the error, e.g., show a message to the user
    }
};

  const handleregisterClick = () => {
    navigate('/registerdcard');
  };
  const handleReportClick = () => {
    navigate('/report');
  };
  const handlepewzew = () => {
    const pewzew = new Audio(pewwzew);
    pewzew.play();

  };
  const resetRoundCountIfNewDay = () => {
    const lastResetDate = localStorage.getItem('lastResetDate');
    const currentDate = new Date().toLocaleDateString();

    if (lastResetDate !== currentDate) {
      localStorage.setItem('roundsPlayed', '1');
      localStorage.setItem('lastResetDate', currentDate);
    }
  };

  const createReport = async () => {
    try {
      const { data, error } = await supabase.from('report').insert([
        {
          round: round,
          selectedAmount: selectedAmount,
          deductedAmount: deductedAmount,
          userName: userName,
          winAmount: remainingMoney,
          noOfPlayer: registeredNumbers.length
        }
      ]);
  
      if (error) {
        console.error('Supabase error:', error.message);
        throw error;
      }

      console.log('Report created successfully:', data);
      const audio = new Audio(startAudio);
      audio.onended = () => {
        const roundsPlayed = JSON.parse(localStorage.getItem('roundsPlayed')) || 0;
        localStorage.setItem('roundsPlayed', roundsPlayed + 1);

        navigate('/randombingonumber');
      };

      audio.play();
      // Handle the response as needed
    } catch (error) {
      console.error('Error creating report:', error);
      // Handle errors
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <div onClickCapture={handleregisterClick}>RegisterCard</div>
        <div onClickCapture={handleReportClick}>Report</div>
        <div onClick={handleLogOut}>Logout</div>
        </div>
      <div className={styles.card}>
        <img src={BingoCard} alt="Bingo Card" />
      </div>
      <div className={styles.remaining}>
      {remainingMoney} ብር ወሳጅ
      </div>
      <div  className={styles.button}>
      <button onClick={handleClick} disabled={registeredNumbers.length === 0 || creatingReport} className={styles.lowbutton}>
        Start
      </button>
      <div onClick={handlepewzew} className={styles.pewzew}>ፐውዘው</div>
      </div>
    </div>
  );
};

export default StartBingo;