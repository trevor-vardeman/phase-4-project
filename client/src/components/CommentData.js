import Stack from 'react-bootstrap/Stack'

function CommentData({ comment }) {
  return (
    <Stack gap={3}>
      {comment 
      ? 
      <Stack gap={3}>
        <Stack className="points-and-arrows" gap={1} direction="horizontal" key={comment.id}>
          <p>&#x25b2;</p>
          <h6>{comment.points}</h6>
          <p>&#x25bc;</p>
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