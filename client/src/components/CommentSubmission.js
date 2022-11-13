import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CommentSubmission({ user, onCommentSubmission }) {
  const [comment, setComment] = useState("")
  const navigate = useNavigate()
  const {id} = useParams()

  const submitComment = e => {
    e.preventDefault()
    onCommentSubmission(comment, id)
    setComment("")
  }
  
  return (
    <Stack gap={3}>
      {user
        ? <Form>
            <Form.Group controlId="commentForm">
            <Form.Control type="text" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            </Form.Group><br></br>
            <Button variant="dark" type="submit" onClick={(e) => submitComment(e)}>Submit</Button>
          </Form>
        : <p>You must be logged in to post a comment. <Alert.Link onClick={() => navigate("/auth")}>Sign in here.</Alert.Link></p>
      }
    </Stack>
  )
}

export default CommentSubmission