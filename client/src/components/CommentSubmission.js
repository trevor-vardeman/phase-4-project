import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CommentSubmission({ user, onCommentSubmission }) {
  const [commentText, setCommentText] = useState("")
  const navigate = useNavigate()
  const {id} = useParams()

  const submitComment = e => {
    e.preventDefault()
    onCommentSubmission(commentText, id)
    setCommentText("")
  }
  
  return (
    <Stack gap={3}>
      {user
        ? <Stack>
            <Form>
              <Form.Group controlId="commentForm">
              <Form.Control as="textarea" rows={2} type="text" placeholder="Leave a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
              </Form.Group><br></br>
              </Form>
            <Button variant="dark" type="submit" onClick={(e) => submitComment(e)}>Submit</Button>
          </Stack>
        : <p>You must be logged in to post a comment. <Alert.Link onClick={() => navigate("/auth")}>Sign in here.</Alert.Link></p>
      }
    </Stack>
  )
}

export default CommentSubmission