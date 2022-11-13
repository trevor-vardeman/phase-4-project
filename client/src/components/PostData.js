import { useNavigate, useParams } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'

function PostData({ post, onUpvote, onDownvote, onDelete, onPostSelection }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const openPost = (post) => {
    navigate(`/post/${post.id}`)
    onPostSelection(post)
  }
  const handleEdit = (post) => navigate(`/post/${post.id}/edit`)

  return (
    <Stack gap={3}>
      {post 
        ? <Stack gap={3}>
            <Stack className="points-and-arrows" gap={1} direction="horizontal" key={post.id}>
              {post.user_upvoted ? <p onClick={() => onUpvote(post.id)} className="orange">&#x25b2;</p> : <p onClick={() => onUpvote(post.id)}>&#x25b2;</p>}
              <h6>{post.points}</h6>
              {post.user_downvoted ? <p onClick={() => onDownvote(post.id)} className="purple">&#x25bc;</p> : <p onClick={() => onDownvote(post.id)}>&#x25bc;</p>}
              {post.image_url ? <img onClick={() => window.open(`${post.image_url}`, "_blank")} src={post.image_url} alt={`${post.title}`}/> : null}
              <Stack>
                {id ? <h4>{post.title}</h4> : <h4 onClick={() => onPostSelection(post)}>{post.title}</h4>}
                {post.text ? <p>{post.text}</p> : null}
                {post.comments.length === 1
                ? 
                <sub onClick={() => openPost(post)}>{post.comments.length} comment</sub>
                : 
                <sub onClick={() => openPost(post)}>{post.comments.length} comments</sub>}
                <br></br>
                {/* <sub>submitted by {post.user.username} to {post.community.name} at {post.created_at}</sub> */}
                <sub>submitted to {post.community.name} at {post.created_at}</sub>
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
        : null
      }
    </Stack>
  )
}

export default PostData