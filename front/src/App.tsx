import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './component/navbar/Header'; 
import { MainSection } from './component/main/MainSection';
import MainSection2 from './component/main/MainSection2';
import MainSection3 from './component/main/MainSection3';
import MainSection4 from './component/main/MainSection4';
import { MainSection5 } from './component/main/MainSection5';
import { Footer } from './component/main/Footer';
import { GlobalStyle } from './GlobalStyle';
import Live from './component/live/Live';
import LiveDetail from './component/live/LiveDetail'
import Guide from './component/guide/Guide';
import Notifications from './component/notifications/Notifications';
import SignUp from './component/member/SignUp'

import './App.css';

const App = () => {
  
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <MainSection />
            <MainSection2/>
            <MainSection3/>
            <MainSection4/>
            <MainSection5/>
          </> }
        /> 
        <Route path="/live" element={
          <Live />
        }  />
        <Route path="/live/:userId" element={<LiveDetail />} /> // 사용자 상세 페이지 경로
        <Route path="/guide" element={
          <Guide />
        } />
        <Route path="/notifications" element={
          <Notifications />
        } />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
