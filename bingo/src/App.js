import { Route, Routes } from 'react-router-dom';
import './App.css';
import RandomBingoNumber from './page/RandomBingoNumber';
import Card1 from './component/Card1';
import  RegisterCard  from './page/RegisterCard';
import SafeBrowserMode from './page/SafeBrowserMode';
import  StartBingo  from './page/StartBingo';
import Card26 from './component/Card26';
import Card27 from './component/Card27';
import Card46 from './component/Card46';
import Card44 from './component/Card44';
import Card38 from './component/Card38';
import Card43 from './component/Card43';
import Card47 from './component/Card47';
import Card32 from './component/Card32';
import Card36 from './component/Card36';
import Card33 from './component/Card33';
import Card40 from './component/Card40';
import Card41 from './component/Card41';
import Card30 from './component/Card30';
import Card31 from './component/Card31';
import Card49 from './component/Card49';
import Card34 from './component/Card34';
import Card48 from './component/Card48';
import Card42 from './component/Card42';
import Card39 from './component/Card39';
import Card35 from './component/Card35';
import Card28 from './component/Card28';
import Card29 from './component/Card29';
import Card50 from './component/Card50';
import Card45 from './component/Card45';
import Card37 from './component/Card37';

function App() {
  return (
    <div className="App">
<SafeBrowserMode>
      <Routes>
        <Route path="/randombingonumber"  element = {<RandomBingoNumber/>}/>
        <Route path="/registerdcard"  element = {<RegisterCard/>}/>
        <Route path="/"  element = {<StartBingo/>}/>
      <Route path="/card1" element={<Card1 />} />
      <Route path="/card26" element={<Card26 />} />
      <Route path="/card27" element={<Card27 />} />
      <Route path="/card46" element={<Card46 />} />
      <Route path="/card44" element={<Card44 />} />
      <Route path="/card38" element={<Card38 />} />
      <Route path="/card43" element={<Card43 />} />
      <Route path="/card47" element={<Card47 />} />
      <Route path="/card32" element={<Card32 />} />
      <Route path="/card36" element={<Card36 />} />
      <Route path="/card33" element={<Card33 />} />
      <Route path="/card40" element={<Card40 />} />
      <Route path="/card41" element={<Card41 />} />
      <Route path="/card30" element={<Card30 />} />
      <Route path="/card31" element={<Card31 />} />
      <Route path="/card49" element={<Card49 />} />
      <Route path="/card34" element={<Card34 />} />
      <Route path="/card48" element={<Card48 />} />
      <Route path="/card42" element={<Card42 />} />
      <Route path="/card39" element={<Card39 />} />
      <Route path="/card35" element={<Card35 />} />
      <Route path="/card28" element={<Card28 />} />
      <Route path="/card29" element={<Card29 />} />
      <Route path="/card50" element={<Card50 />} />
      <Route path="/card45" element={<Card45 />} />
      <Route path="/card37" element={<Card37 />} />
      <Route path="/startbingo" element={<StartBingo />} />
       </Routes>
       </SafeBrowserMode>
    </div>
  );
}

export default App;
