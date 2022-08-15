import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import { useGame } from './context/hooks';
import { GameStatus } from './context/gameReducer';
import Results from './pages/Results';

function App() {
  const [{status}] = useGame()

  if(status === GameStatus.RUNNING) {
    return <Game />
  } else if (status === GameStatus.COMPLETED) {
    return <Results />
  } else {
    return <Home/>
  }
}

export default App;
