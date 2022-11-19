import { useNavigate, useParams } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'

function PostData({ post, onPostUpvote, onPostDownvote, onPostDelete }) {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <Stack gap={3}>
      {post 
        ? <Stack gap={3} className="post">
            <Stack className="points-and-arrows" gap={1} direction="horizontal" key={post.id}>
              {post.user_upvoted ? <p onClick={() => onPostUpvote(post.id)} className="orange">&#x25b2;</p> : <p onClick={() => onPostUpvote(post.id)}>&#x25b2;</p>}
              <h6>{post.points}</h6>
              {post.user_downvoted ? <p onClick={() => onPostDownvote(post.id)} className="purple">&#x25bc;</p> : <p onClick={() => onPostDownvote(post.id)}>&#x25bc;</p>}
              {post.image_url ? <img onClick={() => window.open(`${post.image_url}`, "_blank")} src={post.image_url} alt={`${post.title}`}/> : null}
              <Stack>
                {id ? <h4 className="hover">{post.title}</h4> : <h4 className="hover" onClick={() => navigate(`/post/${post.id}`)}><span>{post.title}</span></h4>}
                {post.text ? <p>{post.text}</p> : null}
                {post.comments.length === 1
                  ? <sub className="hover" onClick={() => navigate(`/post/${post.id}`)}>{post.comments.length} comment</sub>
                  : <sub className="hover" onClick={() => navigate(`/post/${post.id}`)}>{post.comments.length} comments</sub>
                }
                <br></br>
                <sub>submitted to {post.community.name} at {post.created_at}</sub>
                <br></br>
                {post.user_can_modify 
                  ? <sub className="hover" onClick={() => onPostDelete(post)}>Delete</sub> 
                  : null
                }
              </Stack>
            </Stack>
          </Stack> 
        : null
      }
    </Stack>
  )
}

export default PostData