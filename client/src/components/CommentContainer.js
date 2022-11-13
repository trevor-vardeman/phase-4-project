import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import CommentData from './CommentData'

function CommentContainer({ post, onCommentUpvote, onCommentDownvote, onCommentDelete }) {
  const [showComments, setShowComments] = useState(true)
  const navigate = useNavigate()

  return (
    <Stack gap={3}>
      {post[0].comments.length > 0
        ? <Stack gap={3}>
            {showComments 
              ? <Stack gap={3}>
                  <h5><strong className="orange hover" onClick={() => setShowComments(true)}>Comments</strong> | <span className="hover" onClick={() => setShowComments(false)}>Unique Users</span></h5> 
                  {post[0].comments.map(comment => (
                    <CommentData key={comment.id} comment={comment} onCommentUpvote={onCommentUpvote} onCommentDownvote={onCommentDownvote} onCommentDelete={onCommentDelete} />
                  ))}
                </Stack>
              : <Stack gap={3}>
                  <h5><span className="hover" onClick={() => setShowComments(true)}>Comments</span> | <strong className="orange hover" onClick={() => setShowComments(false)}>Unique Users</strong></h5>
                  {post[0].users.map(user => (
                      <p className="user hover" key={user.id} onClick={() => navigate(`/user/${user.id}`)}>{user.username}</p>
                  ))}
                </Stack>
            }
          </Stack>
        : <p>No comments yet! Be the first to comment.</p>
      }
    </Stack>
  )
}

export default CommentContainer