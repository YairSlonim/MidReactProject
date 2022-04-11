import '../style/Users.css'
import react, {Component} from 'react'
import axios from 'axios';

class AddNewPost extends Component
{
  constructor()
  {
    super()
    this.state = {title:'', body:''}
  }

  handleChange =(event) =>{
    event.target.name =='title'?
    this.setState({title:event.target.value}):
    this.setState({body:event.target.value})
    event.preventDefault();
  }
  handleSubmit = (event) =>{
    this.props.handleNewPost(this.state.title,this.state.body)
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
                 <label>
                   Body:
                   <input type="text" name="body" value={this.state.body} onChange={this.handleChange}/><br/>
                 </label>
                 <input className='AddUserButton' type="submit" value="Add"/>
               </form>
   </div>
    )
  }
}

export default AddNewPost;