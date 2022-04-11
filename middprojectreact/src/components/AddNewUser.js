import '../style/Users.css'
import react, {Component} from 'react'
import axios from 'axios';

class AddNewUser extends Component
{
  constructor()
  {
    super()
    this.state = {name:'', email:''}
  }
  handleChange = (event) =>{
    event.target.name == "name"? this.setState({name: event.target.value}):
    this.setState({email: event.target.value})
  }
     
   handleSubmit = (event) => {
     
    this.props.handleNewUser(this.state.name, this.state.email)
    
    event.preventDefault();
  }


  render()
  {
    

    return (
      <div className='addNewForm'>
       <form onSubmit={this.handleSubmit} >
                  <label>
                    Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/><br/>
                  </label>
                  <label>
                    Email:
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><br/>
                  </label>
                  <input className='AddUserButton' type="submit" value="Add" />
                </form>
    </div>
    )
  }
}

export default AddNewUser;