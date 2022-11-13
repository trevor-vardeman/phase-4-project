import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import NoPath from "./NoPath"

function User({ users, posts }) {
  const [selectedUser, setSelectedUser] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const user = users.find(user => user.id === parseInt(id))
      console.log(user)
      setSelectedUser(user)
    }
  },[id, users, posts])

  return (
    <Stack className="main">
      {selectedUser 
        ? <Stack gap={3}>
            <p><span className="orange"><strong>{selectedUser.username}</strong></span> has commented on the following posts:</p>
            {selectedUser.posts.map(post => (
              <Stack gap={3} className="post" key={post.id}>
                <Stack gap={1} direction="horizontal">
                  {post.image_url ? <img onClick={() => window.open(`${post.image_url}`, "_blank")} src={post.image_url} alt={`${post.title}`}/> : null}
                  <Stack>
                    <h4 className="hover" onClick={() => navigate(`/post/${post.id}`)}>{post.title}</h4>
                    {post.text ? <p>{post.text}</p> : null}
                    {post.comments.length === 1
                      ? <sub className="hover" onClick={() => navigate(`/post/${post.id}`)}>{post.comments.length} comment</sub>
                      : <sub className="hover" onClick={() => navigate(`/post/${post.id}`)}>{post.comments.length} comments</sub>
                    }
                    <br></br>
                    <sub>submitted to {post.community.name} at {post.created_at}</sub>
                    <br></br>
                  </Stack>
                </Stack>
              </Stack> 
            ))}
          </Stack> 
        : <NoPath /> 
      }
    </Stack>
  )
}

export default User