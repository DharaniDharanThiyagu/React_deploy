import React from 'react'
import { Link } from 'react-router-dom'
const Post = ({post}) => {
  const linkStyle = {
    textDecoration: 'none', // You can customize this value
    color: 'inherit', // Optionally inherit the text color
  };
  return (
    <article>
        <Link to={`/post/${post.id}`}  className='text-dark' style={linkStyle}>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            </Link>
            <p>{(post.body).lengyh<=25?post.body:`${(post.body).slice(0,25)}`}....</p>
            <hr/>
          
    </article>
  )
}

export default Post
