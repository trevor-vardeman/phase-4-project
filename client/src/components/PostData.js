import { useNavigate } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'

function PostData({ post, onUpvote, onDownvote, onDelete }) {
  const navigate = useNavigate()
  const openPost = (post) => navigate(`/posts/${post.id}`, { state: {post} })
  const handleEdit = (post) => navigate(`/posts/${post.id}/edit`)

  return (
    <Stack gap={3}>
      {post 
      ? 
      <Stack gap={3}>
        <Stack className="points-and-arrows" gap={1} direction="horizontal" key={post.id}>
          {post.user_upvoted ? <p onClick={() => onUpvote(post.id)} className="upvoted">&#x25b2;</p> : <p onClick={() => onUpvote(post.id)}>&#x25b2;</p>}
          <h6>{post.points}</h6>
          {post.user_downvoted ? <p onClick={() => onDownvote(post.id)} className="downvoted">&#x25bc;</p> : <p onClick={() => onDownvote(post.id)}>&#x25bc;</p>}
          {post.image_url ? <img onClick={() => window.open(`${post.image_url}`, "_blank")} src={post.image_url} alt={`${post.title}`}/> : null}
          <Stack>
            <h4 hover="true" onClick={() => openPost(post)}>{post.title}</h4>
            {post.text ? <p>{post.text}</p> : null}
            {post.comments.length === 1
            ? 
            <sub onClick={() => openPost(post)}>{post.comments.length} comment</sub>
            : 
            <sub onClick={() => openPost(post)}>{post.comments.length} comments</sub>}
            <br></br>
            <sub>submitted by {post.user.username} to {post.community.name} at {post.created_at}</sub>
            <br></br>
            {post.user_can_modify ?
              <Stack direction="horizontal" gap={1}>
                <sub onClick={() => handleEdit(post)}>Edit</sub>
                <sub>|</sub>
                <sub onClick={() => onDelete(post)}>Delete</sub> 
              </Stack> :
              null}
          </Stack>
        </Stack>
      </Stack> 
      : 
      null}
    </Stack>
  )
}

export default PostData