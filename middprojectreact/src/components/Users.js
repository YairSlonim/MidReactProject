import '../style/Users.css'
import react, {Component} from 'react'
import axios from 'axios';
import todos from './Todos'
import Todos from './Todos';
import User from './User';
import Posts from './Posts'
import AddNewUser from './AddNewUser';
import AddNewTodo from './AddNewTodo';
import AddNewPost from './AddNewPost';

class Users extends Component
{
  constructor()
  {
    super()
    this.state = {users: [], todos: [], posts: [], newUsers : [], userUpdate:{},showInfo: false, userTodos:'',
    userPosts:'',userId:'',addUserIndex:false,addTodoButton:false,addPostButton:false}
  }

  async componentDidMount()
  {
    if(this.state.users.length == 0){
    let users = await axios.get("https://jsonplaceholder.typicode.com/users")
    this.setState({users : users.data, newUsers: users.data})
    let todos = await axios.get("https://jsonplaceholder.typicode.com/todos")
    this.setState({todos: todos.data})
    let posts = await axios.get("https://jsonplaceholder.typicode.com/posts")
    this.setState({posts: posts.data})
    }
  }
    onSubmit =(id,name,email,street,city,zipcode) =>
  {
    let data = this.state.users.map(x=>{
      if(x.id == id){ 
        return {...x, name:name,email:email,address:{street:street, city:city, zipcode:zipcode}}
      }
      return x
    })
    this.setState({users:data})
    
    /*
    this.users[].name = name
    this.users.email = email
    this.users.address.street = street
    this.users.address.city = city
    this.users.address.zipcode = zipcode;
*/
    
   //console.log(this.state.userUpdate)
  }

  deleteUser =(id) =>
  {
    console.log(this.state.users)
    let temp =  this.state.users.filter(x => x.id != id)
    this.setState({users: temp, newUsers: temp})
    console.log(this.state.users)
  }

  checkUserDetails =(e) =>{
    this.setState({userId:e.target.value})
    let userTodos = this.state.todos.filter(todo => todo.userId == e.target.value)
    let userPosts = this.state.posts.filter(post => post.userId == e.target.value)
    this.setState({userTodos:userTodos})
    this.setState({userPosts:userPosts})

   this.setState({showInfo: true})
   this.setState({addUserIndex:false})
 }

  changeTodos = async (e) =>{
   
   await this.setState({todos: this.state.todos.map(todo => 
     todo.id == e.target.value ? {...todo , completed: !todo.completed}  : todo
  )
})
let index = this.state.todos.filter(todo => todo.id == e.target.value)
await this.setState({userTodos: this.state.userTodos.map(x => x.id == e.target.value ? index[0] : x) })
console.log(this.state.userTodos)

 }

   
 handleNewUser = (name, email) => {
   let newUser = {id: this.state.users.length+1, name, email: email}
  
  this.state.users.push(newUser)
  this.setState({newUser:this.state.users})
  
}

handleNewTodo = async (title) => {
  console.log(this.state.userTodos.length)
  let newTodo = {userId:this.state.userId,id:this.state.todos.length+1, title: title, completed:false}
  this.state.todos.push(newTodo)
  this.state.userTodos.push(newTodo)
  this.setState({addTodoButton:!this.state.addTodoButton})
  }

  handleNewPost = async (title,body) => {
    console.log(title, body)
    let newPost = {userId:this.state.userId,id:this.state.posts.length+1, title: title, body:body}
    this.state.posts.push(newPost)
    this.state.userPosts.push(newPost)
    console.log(this.state.userPosts)
    this.setState({addPostButton:!this.state.addPostButton})
    }

  render()
  {

    return (
      <div >
        <div style={{padding: "5px", margin:"5px"}}>
           Search:<input style={{padding: "5px", margin:"5px"}}  type="text" onChange={ e => {this.setState({
               newUsers: this.state.users.filter((user) =>{
               if(user.name.includes(e.target.value)||user.email.includes(e.target.value))
               return user })} )}} /> 
               <button style={{backgroundColor: "lightyellow",padding: "5px", margin:"5px" }}
               onClick={()=>{this.setState({addUserIndex:true,showInfo: false })}}>Add</button>
               </div>
               <div className='user'>
        {this.state.newUsers.map(user =>
            
            <User key={user.id} 
            user={user} 
            onSubmit={this.onSubmit} 
            deleteUser={this.deleteUser}
            checkUserDetails={this.checkUserDetails}
            todos={this.state.todos} 
            posts={this.state.posts}
            userId={this.state.showTodos? this.state.userId: ''}/>
            
            )}
            
            </div>
          <div className="user">
              {this.state.showInfo && (
                <div>
                  <button style={{backgroundColor: "lightyellow",padding: "5px", margin:"5px",right:'-98px' }}
               onClick={()=>{this.setState({addUserIndex:false,showInfo: false, addTodoButton:true, addPostButton:false })}}>Add</button>
                    <div  style={{border:' 5px solid black'}}>

                    <h3>todos of user: {this.state.userId}</h3>
                   <Todos todos={this.state.userTodos} changeTodos={this.changeTodos} />
                   </div>
                   
                   <button style={{backgroundColor: "lightyellow",padding: "5px", margin:"5px" }}
               onClick={()=>{this.setState({addUserIndex:false,showInfo: false, addTodoButton:false, addPostButton:true })}}>Add</button>
                   <div  style={{border:' 5px solid black'}}>
                   <h3> posts of user: {this.state.userId}</h3>
                   <Posts posts={this.state.userPosts}  /> 
                   </div>
               
                   </div>
              )
                }      
                {this.state.addUserIndex && (
                  <AddNewUser handleNewUser={this.handleNewUser} />
                )}
                {this.state.addTodoButton&&(
                <AddNewTodo handleNewTodo={this.handleNewTodo}/>
              )}
              {this.state.addPostButton&&(
                <AddNewPost handleNewPost={this.handleNewPost} />
              )}
</div>
    </div>
    )
    
  }
  
}

export default Users;