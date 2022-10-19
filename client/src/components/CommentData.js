import { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CommentData({ comment, currentUserId, onUpvote, onDownvote }) {
  const [editComment, setEditComment] = useState(false)
  const [originalCommentText, setOriginalCommentText] = useState()
  const [editedCommentText, setEditedCommentText] = useState(originalCommentText)

  function handleEdit(comment) {
    setOriginalCommentText(comment.text)
    setEditedCommentText(comment.text)
    setEditComment(!editComment)
  }

  function submitComment(e) {
    console.log("text", editedCommentText)

    fetch(`/comment/${comment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: editedCommentText
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(() => {
            setOriginalCommentText("")
            setEditedCommentText("")
            setEditComment(false)
            window.location.reload()
          })
        } else {
          r.json().then(data => console.log(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function handleDelete(comment) {
    fetch(`/comment/${comment.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then ((r) => {
      if (r.ok) {
        window.location.reload()
      } else {
        alert(r)
      }})
    .catch(error => alert(error))
  }

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
            {!editComment 
            ? 
            <p>{comment.text}</p> 
            :
            <Stack>
              <Form>
                <Form.Group controlId="commentForm">
                <Form.Control type="text" placeholder="Comment" value={editedCommentText} onChange={(e) => setEditedCommentText(e.target.value)} />
                </Form.Group>
                <Button variant="dark" type="submit" onClick={(e) => submitComment(e)}>Submit</Button>
              </Form>
              <br></br>
            </Stack>}
            <sub>submitted by {comment.user.username} at {comment.created_at}</sub>
            <br></br>
            {comment.user_can_modify 
            ?
            <Stack direction="horizontal" gap={1}>
              <sub onClick={() => handleEdit(comment)}>Edit</sub> 
              <sub>|</sub>
              <sub onClick={() => handleDelete(comment)}>Delete</sub> 
            </Stack> 
            :
            null}
          </Stack>
        </Stack>
      </Stack> 
      : 
      null}
    </Stack>  
  )
}

export default CommentData