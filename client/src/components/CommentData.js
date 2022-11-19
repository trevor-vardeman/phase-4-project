import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CommentData({ allUsers, comment, onCommentUpvote, onCommentDownvote, onCommentEdit, onCommentDelete }) {
  const [editMode, setEditMode] = useState(false)
  const [commentText, setCommentText] = useState("")
  const navigate = useNavigate()
  const commentUser = () => {
    const findCommentUser = allUsers.find(user => user.id === comment.user_id)
    if (!findCommentUser) return ""
    else return findCommentUser
  }

  useEffect(() => {
    setCommentText(comment.text)
  },[comment])

  const handleCommentEdit = (comment) => {
    setEditMode(true)
    setCommentText(comment.text)
  }

  const handleEditSubmission = () => {
    const updatedComment = {
      id: comment.id,
      text: commentText
    }
    fetch(`/comments/${comment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( updatedComment ),
    })
    .then(r => r.json())
    .then((posts) => {
      setEditMode(false)
      setCommentText("")
      onCommentEdit(posts)
    })
    .catch(error => alert(error))
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
                {!editMode 
                  ? <p>{comment.text}</p> 
                  : <Stack>
                      <Form>
                        <Form.Group controlId="commentForm">
                        <Form.Control as="textarea" rows={2} type="text" placeholder="Leave a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                        </Form.Group><br></br>
                        </Form>
                      <Stack direction="horizontal" gap={3}>
                        <Button variant="dark" onClick={() => setEditMode(false)}>Cancel</Button>
                        <Button variant="dark" type="submit" onClick={() => handleEditSubmission()}>Submit</Button>
                      </Stack>
                      <br></br>
                    </Stack>
                }
                <sub>submitted by <span className="hover" onClick={() => navigate(`/user/${comment.user_id}`)}>{commentUser().username}</span> at {comment.created_at}</sub>
                <br></br>
                {comment.user_can_modify || comment.admin_user
                  ? <Stack direction="horizontal" gap={1}>
                      {comment.user_can_modify 
                        ? <Stack direction="horizontal" gap={1}>
                            <sub className="hover" onClick={() => handleCommentEdit(comment)}>Edit</sub>
                            <sub>|</sub>
                          </Stack>
                        : null
                      }
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