import './App.css';
import react, {Component} from 'react'
import axios from 'axios';
import Users from './components/Users'

class App extends Component
{
  constructor()
  {
    super()
  }

  

 

  render()
  {
    return (
      <div>
        <Users />
    </div>
    )
  }
}

export default App;