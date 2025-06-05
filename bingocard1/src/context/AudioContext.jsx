import React, { createContext, useState, useEffect } from 'react';
import B1 from "../audio/B1.mp3";
import B2 from "../audio/B2.mp3";
import B3 from "../audio/B3.mp3";
import B4 from "../audio/B4.mp3";
import B5 from "../audio/B5.mp3";
import B6 from "../audio/B6.mp3";
import B7 from "../audio/B7.mp3";
import B8 from "../audio/B8.mp3";
import B9 from "../audio/B9.mp3";
import B10 from "../audio/B10.mp3";
import B11 from "../audio/B11.mp3";
import B12 from "../audio/B12.mp3";
import B13 from "../audio/B13.mp3";
import B14 from "../audio/B14.mp3";
import B15 from "../audio/B15.mp3";
import I16 from "../audio/I16.mp3";
import I17 from "../audio/I17.mp3";
import I18 from "../audio/I18.mp3";
import I19 from "../audio/I19.mp3";
import I20 from "../audio/I20.mp3";
import I21 from "../audio/I21.mp3";
import I22 from "../audio/I22.mp3";
import I23 from "../audio/I23.mp3";
import I24 from "../audio/I24.mp3";
import I25 from "../audio/I25.mp3";
import I26 from "../audio/I26.mp3";
import I27 from "../audio/I27.mp3";
import I28 from "../audio/I28.mp3";
import I29 from "../audio/I29.mp3";
import I30 from "../audio/I30.mp3";
import N31 from "../audio/N31.mp3";
import N32 from "../audio/N32.mp3";
import N33 from "../audio/N33.mp3";
import N34 from "../audio/N34.mp3";
import N35 from "../audio/N35.mp3";
import N36 from "../audio/N36.mp3";
import N37 from "../audio/N37.mp3";
import N38 from "../audio/N38.mp3";
import N39 from "../audio/N39.mp3";
import N40 from "../audio/N40.mp3";
import N41 from "../audio/N41.mp3";
import N42 from "../audio/N42.mp3";
import N43 from "../audio/N43.mp3";
import N44 from "../audio/N44.mp3";
import N45 from "../audio/N45.mp3";
import G46 from "../audio/G46.mp3";
import G47 from "../audio/G47.mp3";
import G48 from "../audio/G48.mp3";
import G49 from "../audio/G49.mp3";
import G50 from "../audio/G50.mp3";
import G51 from "../audio/G51.mp3";
import G52 from "../audio/G52.mp3";
import G53 from "../audio/G53.mp3";
import G54 from "../audio/G54.mp3";
import G55 from "../audio/G55.mp3";
import G56 from "../audio/G56.mp3";
import G57 from "../audio/G57.mp3";
import G58 from "../audio/G58.mp3";
import G59 from "../audio/G59.mp3";
import G60 from "../audio/G60.mp3";
import O61 from "../audio/O61.mp3";
import O62 from "../audio/O62.mp3";
import O63 from "../audio/O63.mp3";
import O64 from "../audio/O64.mp3";
import O65 from "../audio/O65.mp3";
import O66 from "../audio/O66.mp3";
import O67 from "../audio/O67.mp3";
import O68 from "../audio/O68.mp3";
import O69 from "../audio/O69.mp3";
import O70 from "../audio/O70.mp3";
import O71 from "../audio/O71.mp3";
import O72 from "../audio/O72.mp3";
import O73 from "../audio/O73.mp3";
import O74 from "../audio/O74.mp3";
import O75 from "../audio/O75.mp3";

import BBB1 from "../audio/BBB1.mp3";
import BBB2 from "../audio/BBB2.mp3";
import BBB3 from "../audio/BBB3.mp3";
import BBB4 from "../audio/BBB4.mp3";
import BBB5 from "../audio/BBB5.mp3";
import BBB6 from "../audio/BBB6.mp3";
import BBB7 from "../audio/BBB7.mp3";
import BBB8 from "../audio/BBB8.mp3";
import BBB9 from "../audio/BBB9.mp3";
import BBB10 from "../audio/BBB10.mp3";
import BBB11 from "../audio/BBB11.mp3";
import BBB12 from "../audio/BBB12.mp3";
import BBB13 from "../audio/BBB13.mp3";
import BBB14 from "../audio/BBB14.mp3";
import BBB15 from "../audio/BBB15.mp3";
import III16 from "../audio/III16.mp3";
import III17 from "../audio/III17.mp3";
import III18 from "../audio/III18.mp3";
import III19 from "../audio/III19.mp3";
import III20 from "../audio/III20.mp3";
import III21 from "../audio/III21.mp3";
import III22 from "../audio/III22.mp3";
import III23 from "../audio/III23.mp3";
import III24 from "../audio/III24.mp3";
import III25 from "../audio/III25.mp3";
import III26 from "../audio/III26.mp3";
import III27 from "../audio/III27.mp3";
import III28 from "../audio/III28.mp3";
import III29 from "../audio/III29.mp3";
import III30 from "../audio/III30.mp3";
import NNN31 from "../audio/NNN31.mp3";
import NNN32 from "../audio/NNN32.mp3";
import NNN33 from "../audio/NNN33.mp3";
import NNN34 from "../audio/NNN34.mp3";
import NNN35 from "../audio/NNN35.mp3";
import NNN36 from "../audio/NNN36.mp3";
import NNN37 from "../audio/NNN37.mp3";
import NNN38 from "../audio/NNN38.mp3";
import NNN39 from "../audio/NNN39.mp3";
import NNN40 from "../audio/NNN40.mp3";
import NNN41 from "../audio/NNN41.mp3";
import NNN42 from "../audio/NNN42.mp3";
import NNN43 from "../audio/NNN43.mp3";
import NNN44 from "../audio/NNN44.mp3";
import NNN45 from "../audio/NNN45.mp3";
import GGG46 from "../audio/GGG46.mp3";
import GGG47 from "../audio/GGG47.mp3";
import GGG48 from "../audio/GGG48.mp3";
import GGG49 from "../audio/GGG49.mp3";
import GGG50 from "../audio/GGG50.mp3";
import GGG51 from "../audio/GGG51.mp3";
import GGG52 from "../audio/GGG52.mp3";
import GGG53 from "../audio/GGG53.mp3";
import GGG54 from "../audio/GGG54.mp3";
import GGG55 from "../audio/GGG55.mp3";
import GGG56 from "../audio/GGG56.mp3";
import GGG57 from "../audio/GGG57.mp3";
import GGG58 from "../audio/GGG58.mp3";
import GGG59 from "../audio/GGG59.mp3";
import GGG60 from "../audio/GGG60.mp3";
import OOO61 from "../audio/OOO61.mp3";
import OOO62 from "../audio/OOO62.mp3";
import OOO63 from "../audio/OOO63.mp3";
import OOO64 from "../audio/OOO64.mp3";
import OOO65 from "../audio/OOO65.mp3";
import OOO66 from "../audio/OOO66.mp3";
import OOO67 from "../audio/OOO67.mp3";
import OOO68 from "../audio/OOO68.mp3";
import OOO69 from "../audio/OOO69.mp3";
import OOO70 from "../audio/OOO70.mp3";
import OOO71 from "../audio/OOO71.mp3";
import OOO72 from "../audio/OOO72.mp3";
import OOO73 from "../audio/OOO73.mp3";
import OOO74 from "../audio/OOO74.mp3";
import OOO75 from "../audio/OOO75.mp3";

import BBBB1 from "../audio/BBBB1.mp3";
import BBBB2 from "../audio/BBBB2.mp3";
import BBBB3 from "../audio/BBBB3.mp3";
import BBBB4 from "../audio/BBBB4.mp3";
import BBBB5 from "../audio/BBBB5.mp3";
import BBBB6 from "../audio/BBBB6.mp3";
import BBBB7 from "../audio/BBBB7.mp3";
import BBBB8 from "../audio/BBBB8.mp3";
import BBBB9 from "../audio/BBBB9.mp3";
import BBBB10 from "../audio/BBBB10.mp3";
import BBBB11 from "../audio/BBBB11.mp3";
import BBBB12 from "../audio/BBBB12.mp3";
import BBBB13 from "../audio/BBBB13.mp3";
import BBBB14 from "../audio/BBBB14.mp3";
import BBBB15 from "../audio/BBBB15.mp3";
import IIII16 from "../audio/IIII16.mp3";
import IIII17 from "../audio/IIII17.mp3";
import IIII18 from "../audio/IIII18.mp3";
import IIII19 from "../audio/IIII19.mp3";
import IIII20 from "../audio/IIII20.mp3";
import IIII21 from "../audio/IIII21.mp3";
import IIII22 from "../audio/IIII22.mp3";
import IIII23 from "../audio/IIII23.mp3";
import IIII24 from "../audio/IIII24.mp3";
import IIII25 from "../audio/IIII25.mp3";
import IIII26 from "../audio/IIII26.mp3";
import IIII27 from "../audio/IIII27.mp3";
import IIII28 from "../audio/IIII28.mp3";
import IIII29 from "../audio/IIII29.mp3";
import IIII30 from "../audio/IIII30.mp3";
import NNNN31 from "../audio/NNNN31.mp3";
import NNNN32 from "../audio/NNNN32.mp3";
import NNNN33 from "../audio/NNNN33.mp3";
import NNNN34 from "../audio/NNNN34.mp3";
import NNNN35 from "../audio/NNNN35.mp3";
import NNNN36 from "../audio/NNNN36.mp3";
import NNNN37 from "../audio/NNNN37.mp3";
import NNNN38 from "../audio/NNNN38.mp3";
import NNNN39 from "../audio/NNNN39.mp3";
import NNNN40 from "../audio/NNNN40.mp3";
import NNNN41 from "../audio/NNNN41.mp3";
import NNNN42 from "../audio/NNNN42.mp3";
import NNNN43 from "../audio/NNNN43.mp3";
import NNNN44 from "../audio/NNNN44.mp3";
import NNNN45 from "../audio/NNNN45.mp3";
import GGGG46 from "../audio/GGGG46.mp3";
import GGGG47 from "../audio/GGGG47.mp3";
import GGGG48 from "../audio/GGGG48.mp3";
import GGGG49 from "../audio/GGGG49.mp3";
import GGGG50 from "../audio/GGGG50.mp3";
import GGGG51 from "../audio/GGGG51.mp3";
import GGGG52 from "../audio/GGGG52.mp3";
import GGGG53 from "../audio/GGGG53.mp3";
import GGGG54 from "../audio/GGGG54.mp3";
import GGGG55 from "../audio/GGGG55.mp3";
import GGGG56 from "../audio/GGGG56.mp3";
import GGGG57 from "../audio/GGGG57.mp3";
import GGGG58 from "../audio/GGGG58.mp3";
import GGGG59 from "../audio/GGGG59.mp3";
import GGGG60 from "../audio/GGGG60.mp3";
import OOOO61 from "../audio/OOOO61.mp3";
import OOOO62 from "../audio/OOOO62.mp3";
import OOOO63 from "../audio/OOOO63.mp3";
import OOOO64 from "../audio/OOOO64.mp3";
import OOOO65 from "../audio/OOOO65.mp3";
import OOOO66 from "../audio/OOOO66.mp3";
import OOOO67 from "../audio/OOOO67.mp3";
import OOOO68 from "../audio/OOOO68.mp3";
import OOOO69 from "../audio/OOOO69.mp3";
import OOOO70 from "../audio/OOOO70.mp3";
import OOOO71 from "../audio/OOOO71.mp3";
import OOOO72 from "../audio/OOOO72.mp3";
import OOOO73 from "../audio/OOOO73.mp3";
import OOOO74 from "../audio/OOOO74.mp3";
import OOOO75 from "../audio/OOOO75.mp3";
const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const [audioInstances, setAudioInstances] = useState([]);
  
useEffect(() => {
    let audioFiles = [];
    audioFiles = [
      B1, B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,
        I16, I17, I18, I19, I20, I21, I22, I23, I24, I25, I26, I27, I28, I29, I30,
        N31, N32, N33, N34, N35, N36, N37, N38, N39, N40, N41, N42, N43, N44, N45,
        G46, G47, G48, G49, G50, G51, G52, G53, G54, G55, G56, G57, G58, G59, G60,
        O61, O62, O63, O64, O65, O66, O67, O68, O69, O70, O71, O72, O73, O74, O75,

        BBB1, BBB2,BBB3,BBB4,BBB5,BBB6,BBB7,BBB8,BBB9,BBB10,BBB11,BBB12,BBB13,BBB14,BBB15,
          III16,III17,III18,III19,III20,III21,III22,III23,III24,III25,III26,III27,III28,III29,III30,
           NNN31, NNN32, NNN33, NNN34, NNN35, NNN36, NNN37, NNN38, NNN39, NNN40, NNN41, NNN42, NNN43, NNN44, NNN45,
           GGG46, GGG47, GGG48, GGG49, GGG50, GGG51, GGG52, GGG53, GGG54, GGG55, GGG56, GGG57, GGG58, GGG59, GGG60,
           OOO61, OOO62, OOO63, OOO64, OOO65, OOO66, OOO67, OOO68, OOO69, OOO70, OOO71, OOO72, OOO73, OOO74, OOO75,

        BBBB1, BBBB2, BBBB3, BBBB4, BBBB5, BBBB6, BBBB7, BBBB8, BBBB9, BBBB10, BBBB11, BBBB12, BBBB13, BBBB14, BBBB15,
        IIII16, IIII17, IIII18, IIII19, IIII20, IIII21, IIII22, IIII23, IIII24, IIII25, IIII26, IIII27, IIII28, IIII29, IIII30,
        NNNN31, NNNN32, NNNN33, NNNN34, NNNN35, NNNN36, NNNN37, NNNN38, NNNN39, NNNN40, NNNN41, NNNN42, NNNN43, NNNN44, NNNN45,
        GGGG46, GGGG47, GGGG48, GGGG49, GGGG50, GGGG51, GGGG52, GGGG53, GGGG54, GGGG55, GGGG56, GGGG57, GGGG58, GGGG59, GGGG60,
        OOOO61, OOOO62, OOOO63, OOOO64, OOOO65, OOOO66, OOOO67, OOOO68, OOOO69, OOOO70, OOOO71, OOOO72, OOOO73, OOOO74, OOOO75,
    ]
    // if (selectedName === 'Xbingo') {
    //   audioFiles = [B1, B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,
    //     I16, I17, I18, I19, I20, I21, I22, I23, I24, I25, I26, I27, I28, I29, I30,
    //     N31, N32, N33, N34, N35, N36, N37, N38, N39, N40, N41, N42, N43, N44, N45,
    //     G46, G47, G48, G49, G50, G51, G52, G53, G54, G55, G56, G57, G58, G59, G60,
    //     O61, O62, O63, O64, O65, O66, O67, O68, O69, O70, O71, O72, O73, O74, O75];
    // } else if (selectedName === 'bereket') {
    //   audioFiles = [  BBB1, BBB2,BBB3,BBB4,BBB5,BBB6,BBB7,BBB8,BBB9,BBB10,BBB11,BBB12,BBB13,BBB14,BBB15,
    //       III16,III17,III18,III19,III20,III21,III22,III23,III24,III25,III26,III27,III28,III29,III30,
    //        NNN31, NNN32, NNN33, NNN34, NNN35, NNN36, NNN37, NNN38, NNN39, NNN40, NNN41, NNN42, NNN43, NNN44, NNN45,
    //        GGG46, GGG47, GGG48, GGG49, GGG50, GGG51, GGG52, GGG53, GGG54, GGG55, GGG56, GGG57, GGG58, GGG59, GGG60,
    //        OOO61, OOO62, OOO63, OOO64, OOO65, OOO66, OOO67, OOO68, OOO69, OOO70, OOO71, OOO72, OOO73, OOO74, OOO75,];
    // } else if (selectedName === 'ngus') {
    //   audioFiles = [BB1, BB2,BB3,BB4,BB5,BB6,BB7,BB8,BB9,BB10,BB11,BB12,BB13,BB14,BB15,
    //     II16, II17, II18, II19, II20, II21, II22, II23, II24, II25, II26, II27, II28, II29, II30,
    //     NN31, NN32, NN33, NN34, NN35, NN36, NN37, NN38, NN39, NN40, NN41, NN42, NN43, NN44, NN45,
    //     GG46, GG47, GG48, GG49, GG50, GG51, GG52, GG53, GG54, GG55, GG56, GG57, GG58, GG59, GG60,
    //     OO61, OO62, OO63, OO64, OO65, OO66, OO67, OO68, OO69, OO70, OO71, OO72, OO73, OO74, OO75,];
    // }
    // else if (selectedName === 'aradaw') {
    //   audioFiles = [BBBB1, BBBB2, BBBB3, BBBB4, BBBB5, BBBB6, BBBB7, BBBB8, BBBB9, BBBB10, BBBB11, BBBB12, BBBB13, BBBB14, BBBB15,
    //     IIII16, IIII17, IIII18, IIII19, IIII20, IIII21, IIII22, IIII23, IIII24, IIII25, IIII26, IIII27, IIII28, IIII29, IIII30,
    //     NNNN31, NNNN32, NNNN33, NNNN34, NNNN35, NNNN36, NNNN37, NNNN38, NNNN39, NNNN40, NNNN41, NNNN42, NNNN43, NNNN44, NNNN45,
    //     GGGG46, GGGG47, GGGG48, GGGG49, GGGG50, GGGG51, GGGG52, GGGG53, GGGG54, GGGG55, GGGG56, GGGG57, GGGG58, GGGG59, GGGG60,
    //     OOOO61, OOOO62, OOOO63, OOOO64, OOOO65, OOOO66, OOOO67, OOOO68, OOOO69, OOOO70, OOOO71, OOOO72, OOOO73, OOOO74, OOOO75,];
    // }
    // else {
    //   audioFiles = [B1, B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,
    //     I16, I17, I18, I19, I20, I21, I22, I23, I24, I25, I26, I27, I28, I29, I30,
    //     N31, N32, N33, N34, N35, N36, N37, N38, N39, N40, N41, N42, N43, N44, N45,
    //     G46, G47, G48, G49, G50, G51, G52, G53, G54, G55, G56, G57, G58, G59, G60,
    //     O61, O62, O63, O64, O65, O66, O67, O68, O69, O70, O71, O72, O73, O74, O75]
    // }
    const instances = audioFiles.map((file) => {
      const audio = new Audio(file);
      audio.preload = 'auto';
      audio.load();
      return audio;
    });

    setAudioInstances(instances);
    console.log( instances);
  }, []);

    return <AudioContext.Provider value={ audioInstances}>{children}</AudioContext.Provider>;
  
};

export { AudioContext, AudioProvider };