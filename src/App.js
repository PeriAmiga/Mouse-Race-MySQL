import logo from './logo.jpg';
import './App.css';
import Game from './Game'


function App() {
  return (
    <div className="App">
        <div className="gameHead">
            <img src={logo} className="gameLogo" alt="logo" />
            <h1 className="gameHeadline">Mouse Race</h1>
        </div>
        <div className="gameBody"><Game/></div>
    </div>
  );
}

export default App;
