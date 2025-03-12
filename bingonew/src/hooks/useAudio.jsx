import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

const useAudio = () => {
    const audioInstances = useContext(AudioContext);
  
    return audioInstances;
  };
  

export default useAudio;