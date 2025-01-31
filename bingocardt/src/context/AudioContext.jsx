import React, { createContext, useState, useEffect } from 'react';
import B1 from "../audio/B1.mp4";
import B2 from "../audio/B2.mp4";
import B3 from "../audio/B3.mp4";
import B4 from "../audio/B4.mp4";
import B5 from "../audio/B5.mp4";
import B6 from "../audio/B6.mp4";
import B7 from "../audio/B7.mp4";
import B8 from "../audio/B8.mp4";
import B9 from "../audio/B9.mp4";
import B10 from "../audio/B10.mp4";
import B11 from "../audio/B11.mp4";
import B12 from "../audio/B12.mp4";
import B13 from "../audio/B13.mp4";
import B14 from "../audio/B14.mp4";
import B15 from "../audio/B15.mp4";
import I16 from "../audio/I16.mp4";
import I17 from "../audio/I17.mp4";
import I18 from "../audio/I18.mp4";
import I19 from "../audio/I19.mp4";
import I20 from "../audio/I20.mp4";
import I21 from "../audio/I21.mp4";
import I22 from "../audio/I22.mp4";
import I23 from "../audio/I23.mp4";
import I24 from "../audio/I24.mp4";
import I25 from "../audio/I25.mp4";
import I26 from "../audio/I26.mp4";
import I27 from "../audio/I27.mp4";
import I28 from "../audio/I28.mp4";
import I29 from "../audio/I29.mp4";
import I30 from "../audio/I30.mp4";
import N31 from "../audio/N31.mp4";
import N32 from "../audio/N32.mp4";
import N33 from "../audio/N33.mp4";
import N34 from "../audio/N34.mp4";
import N35 from "../audio/N35.mp4";
import N36 from "../audio/N36.mp4";
import N37 from "../audio/N37.mp4";
import N38 from "../audio/N38.mp4";
import N39 from "../audio/N39.mp4";
import N40 from "../audio/N40.mp4";
import N41 from "../audio/N41.mp4";
import N42 from "../audio/N42.mp4";
import N43 from "../audio/N43.mp4";
import N44 from "../audio/N44.mp4";
import N45 from "../audio/N45.mp4";
import G46 from "../audio/G46.mp4";
import G47 from "../audio/G47.mp4";
import G48 from "../audio/G48.mp4";
import G49 from "../audio/G49.mp4";
import G50 from "../audio/G50.mp4";
import G51 from "../audio/G51.mp4";
import G52 from "../audio/G52.mp4";
import G53 from "../audio/G53.mp4";
import G54 from "../audio/G54.mp4";
import G55 from "../audio/G55.mp4";
import G56 from "../audio/G56.mp4";
import G57 from "../audio/G57.mp4";
import G58 from "../audio/G58.mp4";
import G59 from "../audio/G59.mp4";
import G60 from "../audio/G60.mp4";
import O61 from "../audio/O61.mp4";
import O62 from "../audio/O62.mp4";
import O63 from "../audio/O63.mp4";
import O64 from "../audio/O64.mp4";
import O65 from "../audio/O65.mp4";
import O66 from "../audio/O66.mp4";
import O67 from "../audio/O67.mp4";
import O68 from "../audio/O68.mp4";
import O69 from "../audio/O69.mp4";
import O70 from "../audio/O70.mp4";
import O71 from "../audio/O71.mp4";
import O72 from "../audio/O72.mp4";
import O73 from "../audio/O73.mp4";
import O74 from "../audio/O74.mp4";
import O75 from "../audio/O75.mp4";

import BB1 from "../audio/BB1.mp4";
import BB2 from "../audio/BB2.mp4";
import BB3 from "../audio/BB3.mp4";
import BB4 from "../audio/BB4.mp4";
import BB5 from "../audio/BB5.mp4";
import BB6 from "../audio/BB6.mp4";
import BB7 from "../audio/BB7.mp4";
import BB8 from "../audio/BB8.mp4";
import BB9 from "../audio/BB9.mp4";
import BB10 from "../audio/BB10.mp4";
import BB11 from "../audio/BB11.mp4";
import BB12 from "../audio/BB12.mp4";
import BB13 from "../audio/BB13.mp4";
import BB14 from "../audio/BB14.mp4";
import BB15 from "../audio/BB15.mp4";
import II16 from "../audio/II16.mp4";
import II17 from "../audio/II17.mp4";
import II18 from "../audio/II18.mp4";
import II19 from "../audio/II19.mp4";
import II20 from "../audio/II20.mp4";
import II21 from "../audio/II21.mp4";
import II22 from "../audio/II22.mp4";
import II23 from "../audio/II23.mp4";
import II24 from "../audio/II24.mp4";
import II25 from "../audio/II25.mp4";
import II26 from "../audio/II26.mp4";
import II27 from "../audio/II27.mp4";
import II28 from "../audio/II28.mp4";
import II29 from "../audio/II29.mp4";
import II30 from "../audio/II30.mp4";
import NN31 from "../audio/NN31.mp4";
import NN32 from "../audio/NN32.mp4";
import NN33 from "../audio/NN33.mp4";
import NN34 from "../audio/NN34.mp4";
import NN35 from "../audio/NN35.mp4";
import NN36 from "../audio/NN36.mp4";
import NN37 from "../audio/NN37.mp4";
import NN38 from "../audio/NN38.mp4";
import NN39 from "../audio/NN39.mp4";
import NN40 from "../audio/NN40.mp4";
import NN41 from "../audio/NN41.mp4";
import NN42 from "../audio/NN42.mp4";
import NN43 from "../audio/NN43.mp4";
import NN44 from "../audio/NN44.mp4";
import NN45 from "../audio/NN45.mp4";
import GG46 from "../audio/GG46.mp4";
import GG47 from "../audio/GG47.mp4";
import GG48 from "../audio/GG48.mp4";
import GG49 from "../audio/GG49.mp4";
import GG50 from "../audio/GG50.mp4";
import GG51 from "../audio/GG51.mp4";
import GG52 from "../audio/GG52.mp4";
import GG53 from "../audio/GG53.mp4";
import GG54 from "../audio/GG54.mp4";
import GG55 from "../audio/GG55.mp4";
import GG56 from "../audio/GG56.mp4";
import GG57 from "../audio/GG57.mp4";
import GG58 from "../audio/GG58.mp4";
import GG59 from "../audio/GG59.mp4";
import GG60 from "../audio/GG60.mp4";
import OO61 from "../audio/OO61.mp4";
import OO62 from "../audio/OO62.mp4";
import OO63 from "../audio/OO63.mp4";
import OO64 from "../audio/OO64.mp4";
import OO65 from "../audio/OO65.mp4";
import OO66 from "../audio/OO66.mp4";
import OO67 from "../audio/OO67.mp4";
import OO68 from "../audio/OO68.mp4";
import OO69 from "../audio/OO69.mp4";
import OO70 from "../audio/OO70.mp4";
import OO71 from "../audio/OO71.mp4";
import OO72 from "../audio/OO72.mp4";
import OO73 from "../audio/OO73.mp4";
import OO74 from "../audio/OO74.mp4";
import OO75 from "../audio/OO75.mp4";

import BBB1 from "../audio/BBB1.mp4";
import BBB2 from "../audio/BBB2.mp4";
import BBB3 from "../audio/BBB3.mp4";
import BBB4 from "../audio/BBB4.mp4";
import BBB5 from "../audio/BBB5.mp4";
import BBB6 from "../audio/BBB6.mp4";
import BBB7 from "../audio/BBB7.mp4";
import BBB8 from "../audio/BBB8.mp4";
import BBB9 from "../audio/BBB9.mp4";
import BBB10 from "../audio/BBB10.mp4";
import BBB11 from "../audio/BBB11.mp4";
import BBB12 from "../audio/BBB12.mp4";
import BBB13 from "../audio/BBB13.mp4";
import BBB14 from "../audio/BBB14.mp4";
import BBB15 from "../audio/BBB15.mp4";
import III16 from "../audio/III16.mp4";
import III17 from "../audio/III17.mp4";
import III18 from "../audio/III18.mp4";
import III19 from "../audio/III19.mp4";
import III20 from "../audio/III20.mp4";
import III21 from "../audio/III21.mp4";
import III22 from "../audio/III22.mp4";
import III23 from "../audio/III23.mp4";
import III24 from "../audio/III24.mp4";
import III25 from "../audio/III25.mp4";
import III26 from "../audio/III26.mp4";
import III27 from "../audio/III27.mp4";
import III28 from "../audio/III28.mp4";
import III29 from "../audio/III29.mp4";
import III30 from "../audio/III30.mp4";
import NNN31 from "../audio/NNN31.mp4";
import NNN32 from "../audio/NNN32.mp4";
import NNN33 from "../audio/NNN33.mp4";
import NNN34 from "../audio/NNN34.mp4";
import NNN35 from "../audio/NNN35.mp4";
import NNN36 from "../audio/NNN36.mp4";
import NNN37 from "../audio/NNN37.mp4";
import NNN38 from "../audio/NNN38.mp4";
import NNN39 from "../audio/NNN39.mp4";
import NNN40 from "../audio/NNN40.mp4";
import NNN41 from "../audio/NNN41.mp4";
import NNN42 from "../audio/NNN42.mp4";
import NNN43 from "../audio/NNN43.mp4";
import NNN44 from "../audio/NNN44.mp4";
import NNN45 from "../audio/NNN45.mp4";
import GGG46 from "../audio/GGG46.mp4";
import GGG47 from "../audio/GGG47.mp4";
import GGG48 from "../audio/GGG48.mp4";
import GGG49 from "../audio/GGG49.mp4";
import GGG50 from "../audio/GGG50.mp4";
import GGG51 from "../audio/GGG51.mp4";
import GGG52 from "../audio/GGG52.mp4";
import GGG53 from "../audio/GGG53.mp4";
import GGG54 from "../audio/GGG54.mp4";
import GGG55 from "../audio/GGG55.mp4";
import GGG56 from "../audio/GGG56.mp4";
import GGG57 from "../audio/GGG57.mp4";
import GGG58 from "../audio/GGG58.mp4";
import GGG59 from "../audio/GGG59.mp4";
import GGG60 from "../audio/GGG60.mp4";
import OOO61 from "../audio/OOO61.mp4";
import OOO62 from "../audio/OOO62.mp4";
import OOO63 from "../audio/OOO63.mp4";
import OOO64 from "../audio/OOO64.mp4";
import OOO65 from "../audio/OOO65.mp4";
import OOO66 from "../audio/OOO66.mp4";
import OOO67 from "../audio/OOO67.mp4";
import OOO68 from "../audio/OOO68.mp4";
import OOO69 from "../audio/OOO69.mp4";
import OOO70 from "../audio/OOO70.mp4";
import OOO71 from "../audio/OOO71.mp4";
import OOO72 from "../audio/OOO72.mp4";
import OOO73 from "../audio/OOO73.mp4";
import OOO74 from "../audio/OOO74.mp4";
import OOO75 from "../audio/OOO75.mp4";

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const [audioInstances, setAudioInstances] = useState([]);
  const [selectedName, setSelectedName] = useState();
  const changeSelectedName = (name) => {
    setSelectedName(name);
    localStorage.setItem('selectedName', name);
  };
  useEffect(() => {
    setSelectedName(localStorage.getItem('selectedName'));
    let audioFiles = [];
    if (selectedName === 'Xbingo') {
      audioFiles = [B1, B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,
        I16, I17, I18, I19, I20, I21, I22, I23, I24, I25, I26, I27, I28, I29, I30,
        N31, N32, N33, N34, N35, N36, N37, N38, N39, N40, N41, N42, N43, N44, N45,
        G46, G47, G48, G49, G50, G51, G52, G53, G54, G55, G56, G57, G58, G59, G60,
        O61, O62, O63, O64, O65, O66, O67, O68, O69, O70, O71, O72, O73, O74, O75];
    } else if (selectedName === 'bereket') {
      audioFiles = [  BBB1, BBB2,BBB3,BBB4,BBB5,BBB6,BBB7,BBB8,BBB9,BBB10,BBB11,BBB12,BBB13,BBB14,BBB15,
          III16,III17,III18,III19,III20,III21,III22,III23,III24,III25,III26,III27,III28,III29,III30,
           NNN31, NNN32, NNN33, NNN34, NNN35, NNN36, NNN37, NNN38, NNN39, NNN40, NNN41, NNN42, NNN43, NNN44, NNN45,
           GGG46, GGG47, GGG48, GGG49, GGG50, GGG51, GGG52, GGG53, GGG54, GGG55, GGG56, GGG57, GGG58, GGG59, GGG60,
           OOO61, OOO62, OOO63, OOO64, OOO65, OOO66, OOO67, OOO68, OOO69, OOO70, OOO71, OOO72, OOO73, OOO74, OOO75,];
    } else if (selectedName === 'ngus') {
      audioFiles = [BB1, BB2,BB3,BB4,BB5,BB6,BB7,BB8,BB9,BB10,BB11,BB12,BB13,BB14,BB15,
        II16, II17, II18, II19, II20, II21, II22, II23, II24, II25, II26, II27, II28, II29, II30,
        NN31, NN32, NN33, NN34, NN35, NN36, NN37, NN38, NN39, NN40, NN41, NN42, NN43, NN44, NN45,
        GG46, GG47, GG48, GG49, GG50, GG51, GG52, GG53, GG54, GG55, GG56, GG57, GG58, GG59, GG60,
        OO61, OO62, OO63, OO64, OO65, OO66, OO67, OO68, OO69, OO70, OO71, OO72, OO73, OO74, OO75,];
    }
    else {
      audioFiles = [B1, B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,
        I16, I17, I18, I19, I20, I21, I22, I23, I24, I25, I26, I27, I28, I29, I30,
        N31, N32, N33, N34, N35, N36, N37, N38, N39, N40, N41, N42, N43, N44, N45,
        G46, G47, G48, G49, G50, G51, G52, G53, G54, G55, G56, G57, G58, G59, G60,
        O61, O62, O63, O64, O65, O66, O67, O68, O69, O70, O71, O72, O73, O74, O75]
    }
    const instances = audioFiles.map((file) => {
      const audio = new Audio(file);
      audio.preload = 'auto';
      audio.load();
      return audio;
    });

    setAudioInstances(instances);
    console.log(`Loaded audio for: ${selectedName}`, instances);
  }, []);

  return <AudioContext.Provider value={ audioInstances}>{children}</AudioContext.Provider>;
};

export { AudioContext, AudioProvider };