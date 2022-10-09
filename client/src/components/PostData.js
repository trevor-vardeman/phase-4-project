import { useNavigate } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'

function PostData({ post, handleDelete }) {
  const navigate = useNavigate()

  function openPost(post) {
    navigate(`/post/${post.id}`)
  }

  return (
    <Stack gap={3}>
      {post ? 
      <Stack gap={3}>
          <Stack className="points-and-arrows" gap={1} direction="horizontal" key={post.id}>
            <p>&#x25b2;</p>
            <h6>{post.points}</h6>
            <p>&#x25bc;</p>
            {post.image_url ? <img onClick={() => window.open(`${post.image_url}`, "_blank")} src={post.image_url} alt={`${post.title}`}/> : null}
            <Stack>
              <h4 hover="true" onClick={() => openPost(post)}>{post.title}</h4>
              {post.comments.length === 1 
              ? 
              <sub onClick={() => openPost(post)}>{post.comments.length} comment</sub>
              : 
              <sub onClick={() => openPost(post)}>{post.comments.length} comments</sub>}
              <br></br>
              <sub>submitted by {post.user.username} to {post.community.name} at {post.created_at}</sub>
              <br></br>
              <sub onClick={() => handleDelete(post)}>Edit | Delete</sub>
            </Stack>
          </Stack>
      </Stack> : null}
    </Stack>
  )
}

export default PostData