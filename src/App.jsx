import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';

function App() {

  return (
    <Router>
      <MainRouter />
    </Router>
  )
}

export default App
