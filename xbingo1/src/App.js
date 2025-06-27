import { Route, Routes } from 'react-router-dom';
import AdminPage from './page/AdminPage';
import User from './page/User';
import SignUp from './page/SignUp';

function App() {
  return (
    <div>
     <Routes>
      <Route path='/' element={<AdminPage/>}/>
      <Route path='/adminmrxbingobingo' element={<AdminPage/>}/>
      <Route path='/user/:username' element={<User/>}/>
      <Route path='/add' element={<SignUp/>}/>
     </Routes>
    </div>
  );
}

export default App;
