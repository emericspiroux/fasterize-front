import React from 'react';
import './App.scss';

import SideBarContent from './Components/SideBarContent/SideBarContent'
import TitleHeader from './Components/TitleHeader/TitleHeader';
import BigTitle from './Components/BigTitle/BigTitle';
import PageContainer from './Components/PageContainer/PageContainer';
import ContentArea from './Components/ContentArea/ContentArea';
import DebugComponent from './Components/DebugComponent/DebugComponent';
import DebugHistory from './Components/DebugHistory/DebugHistory';
import PopupsContainer from './Components/PopupsContainer/PopupsContainer';

// Home Page app
function App() {
  return (
    <div className="App">
      <SideBarContent>
        <TitleHeader title="Fasterize Debug"/>
        <PageContainer>
          <BigTitle className="s-top">HEADER DEBUGGER</BigTitle>
          <ContentArea className="s-top">
            <h2 className="App_contentArea_title">Url to check</h2>
            <DebugComponent />
          </ContentArea>
          <BigTitle className="s-top">HISTORY</BigTitle>
          <DebugHistory />
        </PageContainer>
      </SideBarContent>
      <PopupsContainer />
    </div>
  );
}

export default App;
