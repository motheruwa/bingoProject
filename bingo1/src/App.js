import { Route, Routes } from 'react-router-dom';
import './App.css';
import RandomBingoNumber from './page/RandomBingoNumber';
import  RegisterCard  from './page/RegisterCard';
import SafeBrowserMode from './page/SafeBrowserMode';
import  StartBingo  from './page/StartBingo';
import PreventBrowserNavigation from './page/PreventBrowserNavigation';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Report from './page/Report';
import Card1 from './component/Card1';
import Card2 from './component/Card2';
import Card3 from './component/Card3';
import Card4 from './component/Card4';
import Card5 from './component/Card5';
import Card6 from './component/Card6';
import Card7 from './component/Card7';
import Card8 from './component/Card8';
import Card9 from './component/Card9';
import Card10 from './component/Card10';
import Card11 from './component/Card11';
import Card12 from './component/Card12';
import Card13 from './component/Card13';
import Card14 from './component/Card14';
import Card15 from './component/Card15';
import Card16 from './component/Card16';
import Card17 from './component/Card17';
import Card18 from './component/Card18';
import Card19 from './component/Card19';
import Card20 from './component/Card20';
import Card21 from './component/Card21';
import Card22 from './component/Card22';
import Card23 from './component/Card23';
import Card24 from './component/Card24';
import Card25 from './component/Card25';
import Card26 from './component/Card26';
import Card27 from './component/Card27';
import Card28 from './component/Card28';
import Card29 from './component/Card29';
import Card30 from './component/Card30';
import Card34 from './component/Card34';


function App() {
  return (
    <div className="App">
      <PreventBrowserNavigation>
<SafeBrowserMode>
      <Routes>
        <Route path="/randombingonumber"  element = {<RandomBingoNumber/>}/>
        <Route path="/registerdcard"  element = {<RegisterCard/>}/>
        <Route path="/"  element = {<Login/>}/>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      <Route path="/card1" element={<Card1/>} />
      <Route path="/card2" element={<Card2/>} />
      <Route path="/card3" element={<Card3/>} />
      <Route path="/card4" element={<Card4/>} />
      <Route path="/card5" element={<Card5/>} />
      <Route path="/card6" element={<Card6/>} />
      <Route path="/card7" element={<Card7/>} />
      <Route path="/card8" element={<Card8/>} />
      <Route path="/card9" element={<Card9/>} />
      <Route path="/card10" element={<Card10/>} />
      <Route path="/card11" element={<Card11/>} />
      <Route path="/card12" element={<Card12/>} />
      <Route path="/card13" element={<Card13/>} />
      <Route path="/card14" element={<Card14/>} />
      <Route path="/card15" element={<Card15/>} />
      <Route path="/card16" element={<Card16/>} />
      <Route path="/card17" element={<Card17/>} />
      <Route path="/card18" element={<Card18/>} />
      <Route path="/card19" element={<Card19/>} />
      <Route path="/card20" element={<Card20/>} />
      <Route path="/card21" element={<Card21/>} />
      <Route path="/card22" element={<Card22/>} />
      <Route path="/card23" element={<Card23/>} />
      <Route path="/card24" element={<Card24/>} />
      <Route path="/card25" element={<Card25/>} />
      <Route path="/card26" element={<Card26/>} />
      <Route path="/card27" element={<Card27/>} />
      <Route path="/card28" element={<Card28/>} />
      <Route path="/card29" element={<Card29/>} />
      <Route path="/card30" element={<Card30/>} />
      <Route path="/card34" element={<Card34/>} />
      
      <Route path="/startbingo" element={<StartBingo />} />
      <Route path="/report" element={<Report/>} />
       </Routes>
       </SafeBrowserMode>
       </PreventBrowserNavigation>
    </div>
  );
}

export default App;
