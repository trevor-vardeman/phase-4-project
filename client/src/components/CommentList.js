import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import CommentData from './CommentData'

function CommentList() {
  const [comments, setComments] = useState([])
  const {id} = useParams()

  useEffect(() => {
    fetch(`/post/${id}`)
    .then(r => r.json())
    .then(posts => setComments(posts.comments))
    .catch(err => alert(err.message))
  },[id])

  return (
    <Stack gap={3}>
      {comments.length > 0 
      ? 
      <Stack gap={3}>
        {comments.map(comment => (
          <CommentData key={comment.id} comment={comment} />
        ))}
      </Stack>
      : 
      <p>No comments yet! Be the first to comment.</p> }
    </Stack>
  )
}

export default CommentList