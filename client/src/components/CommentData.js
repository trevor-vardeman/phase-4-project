import { useNavigate } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'

function CommentData({ allUsers, comment, onCommentUpvote, onCommentDownvote, onCommentDelete }) {
  const navigate = useNavigate()
  const commentUser = () => {
    const findCommentUser = allUsers.find(user => user.id === comment.user_id)
    if (!findCommentUser) return ""
    else return findCommentUser
  }

  return (
    <Stack gap={3}>
      {comment 
        ? <Stack className="comment-user" gap={3}>
            <Stack className="points-and-arrows" gap={1} direction="horizontal" key={comment.id}>
              {comment.user_upvoted ? <p onClick={() => onCommentUpvote(comment)} className="orange">&#x25b2;</p> : <p onClick={() => onCommentUpvote(comment)}>&#x25b2;</p>}
              <h6>{comment.points}</h6>
              {comment.user_downvoted ? <p onClick={() => onCommentDownvote(comment)} className="purple">&#x25bc;</p> : <p onClick={() => onCommentDownvote(comment)}>&#x25bc;</p>}
              <Stack>
                <p>{comment.text}</p>   
                <sub>submitted by <span className="hover" onClick={() => navigate(`/user/${comment.user_id}`)}>{commentUser().username}</span> at {comment.created_at}</sub>
                <br></br>
                {comment.user_can_modify 
                  ? <Stack direction="horizontal" gap={1}>
                      <sub className="hover" onClick={() => onCommentDelete(comment)}>Delete</sub> 
                    </Stack> 
                  : null}
              </Stack>
            </Stack>
          </Stack> 
        : null
      }
  </Stack>  
  )
}

export default CommentData