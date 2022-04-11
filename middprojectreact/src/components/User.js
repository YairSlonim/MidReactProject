import '../style/Users.css'
import react, {Component} from 'react'
import axios from 'axios';

import Todos from './Todos';

class User extends Component
{
  constructor(props)
  {
    super(props)
    this.state ={IsShown: false,todos:null,
       id:this.props.user.id, name: this.props.user.name, email: this.props.user.email}
  }

  checkTasks(user,todos)
  {
    let tasks = todos.filter(x => x.userId == user.id)
    let checkCompleted = tasks.filter(y => !y.completed)
    if(checkCompleted.length>0){
        return 'userWithUncompletedTasks'
    }
    else{
        return 'userWithCompletedTasks'
    }
  }

  

  render()
  {
    return (
      <div >
        <ul style={this.props.userId == this.props.user.id?{backgroundColor:"orange"}:null}
         className={this.checkTasks(this.props.user, this.props.todos)} key={this.props.user.id}>
            <li onClick={this.props.checkUserDetails} value={this.props.user.id}>Id: {this.props.user.id}</li>
            <li>Name: <input type="text" defaultValue={this.props.user.name} onChange={e =>{this.setState({name: e.target.value})}}></input></li>
            <li>Email:<input type="text" defaultValue={this.props.user.email} onChange={e =>{this.setState({email: e.target.value})}}></input></li>
          
          <button 
            onMouseEnter={() =>this.setState({IsShown: true})}
            onMouseLeave={() => this.setState({IsShown: false})}>
                Other Data</button>
                {this.state.IsShown && (
                    <div className='dim'>
            <li>Street:<input type="text" value= {this.props.user.address.street} ></input></li>
            <li>City:<input type="text" value= {this.props.user.address.city} ></input></li>
            <li>ZipCode: <input type="text" value= {this.props.user.address.zipcode}></input></li>
             </div>
                )}
                <button onClick={() => this.props.onSubmit(this.state.id,this.state.name,this.state.email,
                  this.state.street,this.state.city,this.state.zipcode)}>Update</button>
                  <button onClick={() => this.props.deleteUser(this.props.user.id)}>Delete</button>
                 
              </ul>
                    
    </div>
    )
  }
}

export default User;