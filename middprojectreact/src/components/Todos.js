import '../style/Users.css'
import react, {Component} from 'react'
import axios from 'axios';

class Todos extends Component
{
  constructor()
  {
    super()
    this.state = {todos: []}
  }



  render()
  {
    

    return (
      <div>
        {console.log(this.props.todos)}
        {this.props.todos.map(x =>
          <ul className='todos' key={x.title}>
            <li>Title: {x.title}</li>
            <li>Completed: {x.completed + " "}
             { !x.completed? <button style={{backgroundColor: "lightyellow"}} onClick={this.props.changeTodos} value={x.id}>Mark Completed</button>:''}</li>
            </ul>
        )}
        
    </div>
    )
  }
}

export default Todos;