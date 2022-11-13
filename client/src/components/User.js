import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import PostData from './PostData'
import NoPath from "./NoPath"

function User({ users }) {
  const { id } = useParams()
  const [selectedUser, setSelectedUser] = useState("")

  useEffect(() => {
    if (id) {
      const user = users.find(user => user.id === parseInt(id))
      console.log(user)
      setSelectedUser(user)
    }
  },[id, users])

  return (
    <div>
      {selectedUser 
        ? <div>
            Posts this user has commented on:
            {selectedUser.posts.map(post => (
              <Stack className="main" gap={1} direction="horizontal" key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.text}</p>
                {post.image_url ? <img onClick={() => window.open(`${post.image_url}`, "_blank")} src={post.image_url} alt={`${post.title}`}/> : null}
              </Stack>
            ))}
            {/* {selectedUser.posts.map(post => (
              <PostData key={post.id} post={post} />
            ))}
            {selectedUser.username} */}
          </div> 
        : <NoPath /> 
      }
    </div>
  )
}

export default User