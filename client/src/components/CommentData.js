import Stack from 'react-bootstrap/Stack'

function CommentData({ comment, currentUserId, onUpvote, onDownvote }) {
  return (
    <Stack gap={3}>
      {comment 
      ? 
      <Stack gap={3}>
        <Stack className="points-and-arrows" gap={1} direction="horizontal" key={comment.id}>
          {comment.user_upvoted ? <p onClick={() => onUpvote(comment.id, currentUserId)} className="upvoted">&#x25b2;</p> : <p onClick={() => onUpvote(comment.id, currentUserId)}>&#x25b2;</p>}
          <h6>{comment.points}</h6>
          {comment.user_downvoted ? <p onClick={() => onDownvote(comment.id, currentUserId)} className="downvoted">&#x25bc;</p> : <p onClick={() => onDownvote(comment.id, currentUserId)}>&#x25bc;</p>}
          <Stack>
            <p>{comment.text}</p>
            <sub>submitted by {comment.user.username} at {comment.created_at}</sub>
          </Stack>
        </Stack>
      </Stack> 
      : 
      null}
    </Stack>  )
}

export default CommentData