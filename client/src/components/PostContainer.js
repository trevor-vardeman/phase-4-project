import { useState, useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'

function PostContainer() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/post")
      .then(r => r.json())
      .then(posts => setPosts(posts))
      .catch(err => alert(err.message))
  },[])

  return (
    <Stack gap={3}>
      {posts ? 
      <Stack gap={3}>
        {posts.map(post => (
          <Stack gap={1} direction="horizontal" key={post.id}>
            <p>&#x25b2;</p>
            <h6>{post.points}</h6>
            <p>&#x25bc;</p>
            <img src={post.image_url} alt={`${post.title}`}/>
            <Stack>
              <h4>{post.title}</h4>
              <sub>submitted by {post.user.username} to {post.community.name} at {post.created_at}</sub>
            </Stack>
          </Stack>
        ))}
      </Stack> : null}
    </Stack>
  )
}

export default PostContainer