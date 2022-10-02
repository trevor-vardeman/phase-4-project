import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'

function PostContainer() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/post")
      .then(r => r.json())
      .then(posts => setPosts(posts))
      .catch(err => alert(err.message))
  },[])

  function openPost(post) {
    console.log(post.id)
    navigate(`/post/${post.id}`)
  }

  return (
    <Stack gap={3}>
      {posts ? 
      <Stack gap={3}>
        {posts.map(post => (
          <Stack gap={1} direction="horizontal" key={post.id}>
            <p>&#x25b2;</p>
            <h6>{post.points}</h6>
            <p>&#x25bc;</p>
            {post.image_url ? <img src={post.image_url} alt={`${post.title}`}/> : null}
            <Stack>
              <h4 onClick={() => openPost(post)}>{post.title}</h4>
              <sub onClick={(e) => openPost(e)}>{post.comments.length} comments</sub><br></br>
              <sub>submitted by {post.user.username} to {post.community.name} at {post.created_at}</sub>
            </Stack>
          </Stack>
        ))}
      </Stack> : null}
    </Stack>
  )
}

export default PostContainer