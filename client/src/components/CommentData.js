import Stack from 'react-bootstrap/Stack'

function CommentData({ comment, onCommentUpvote, onCommentDownvote, onCommentDelete }) {
  return (
    <Stack gap={3}>
    {comment 
      ? <Stack gap={3}>
          <Stack className="points-and-arrows" gap={1} direction="horizontal" key={comment.id}>
            {comment.user_upvoted ? <p onClick={() => onCommentUpvote(comment)} className="upvoted">&#x25b2;</p> : <p onClick={() => onCommentUpvote(comment)}>&#x25b2;</p>}
            <h6>{comment.points}</h6>
            {comment.user_downvoted ? <p onClick={() => onCommentDownvote(comment)} className="downvoted">&#x25bc;</p> : <p onClick={() => onCommentDownvote(comment)}>&#x25bc;</p>}
            <Stack>
              <p>{comment.text}</p>   
              <sub>submitted by {comment.user.username} at {comment.created_at}</sub>
              <br></br>
              {comment.user_can_modify 
                ? <Stack direction="horizontal" gap={1}>
                    <sub onClick={() => onCommentDelete(comment)}>Delete</sub> 
                  </Stack> 
                : null}
            </Stack>
          </Stack>
        </Stack> 
      : null}
  </Stack>  
  )
}

export default CommentData