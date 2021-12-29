import React from 'react';
import logo from './logo.svg';
import './App.css';
import DependenciesContainer from './dependencies-view/dependencies.container';

function App() {  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DependenciesContainer />        
      </header>
    </div>
  );
}

export default App;
