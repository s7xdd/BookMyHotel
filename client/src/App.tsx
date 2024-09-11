import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Productpage from './pages/Productpage'
import Uniquepage from './pages/Uniquepage'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={Homepage}/>
          <Route path='/Unique stays' Component={Uniquepage}/>
          <Route path='/:title' Component={Productpage}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
