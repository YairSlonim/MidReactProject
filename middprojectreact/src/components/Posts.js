import '../style/Users.css'
import react, {Component} from 'react'
import axios from 'axios';

class Posts extends Component
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
       {
           this.props.posts.map(post=>
            <ul className='posts'  key={post.id}>
                Title:<li>{post.title}</li>
                Body:<li>{post.body}</li>
            </ul>)
       }
        
    </div>
    )
  }
}

export default Posts;