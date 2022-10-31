import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CommentSubmission({ user }) {
  const [comment, setComment] = useState("")
  const navigate = useNavigate()
  const {id} = useParams()

  function submitComment(e) {
    e.preventDefault()
    const newComment = {
      user_id: user.id,
      text: comment,
      points: 1,
      post_id: id
    }
    fetch("/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(() => {
            setComment("")
            window.location.reload()
          })
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  return (
    <Stack gap={3}>
      {user.id
      ? 
      <Form>
        <Form.Group controlId="commentForm">
        <Form.Control type="text" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        </Form.Group>
        <Button variant="dark" type="submit" onClick={submitComment}>Submit</Button>
      </Form>
      : 
      <p>You must be logged in to post a comment. <Alert.Link onClick={() => navigate("/auth")}>Sign in here.</Alert.Link></p>}
    </Stack>
  )
}

export default CommentSubmission