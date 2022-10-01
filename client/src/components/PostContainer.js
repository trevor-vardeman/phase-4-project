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
          <Stack gap={3} direction="horizontal" key={post.id}>
            <img src={post.image_url} alt={`${post.title}`}/>
            <Stack>
              <h2>{post.title}</h2>
              <sub>{post.points} points | submitted by {post.user.username} | submitted {post.created_at}</sub>
            </Stack>
          </Stack>
        ))}
      </Stack> : null}
    </Stack>
  )
}

export default PostContainer