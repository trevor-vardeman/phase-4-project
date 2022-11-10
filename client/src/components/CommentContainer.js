import Stack from 'react-bootstrap/Stack'
import CommentData from './CommentData'

function CommentContainer({ post, onCommentUpvote, onCommentDownvote, onCommentDelete }) {
  return (
    <Stack gap={3}>
      {post[0].comments.length > 0
        ? <Stack gap={3}>
            {post[0].comments.map(comment => (
              <CommentData key={comment.id} comment={comment} onCommentUpvote={onCommentUpvote} onCommentDownvote={onCommentDownvote} onCommentDelete={onCommentDelete} />
            ))}
          </Stack>
        : <p>No comments yet! Be the first to comment.</p>}
    </Stack>
  )
}

export default CommentContainer