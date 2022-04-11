import '../style/Users.css'
import react, {Component} from 'react'
import axios from 'axios';

class AddNewTodo extends Component
{
  constructor()
  {
    super()
    this.state = {title:'', completed:false}
  }

  handleChange =(event) =>{
    this.setState({title:event.target.value})
    event.preventDefault();
  }
  handleSubmit = (event) =>{
    this.props.handleNewTodo(this.state.title)
    event.preventDefault();
  }


  render()
  {
    

    return (
      <div className='addNewForm'>
       <form onSubmit={this.handleSubmit} >
                  <label>
                    Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/><br/>
                  </label>
                  <input className='AddUserButton' type="submit" value="Add"/>
                </form>
    </div>
    )
  }
}

export default AddNewTodo;