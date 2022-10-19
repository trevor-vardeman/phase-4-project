import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import CommentData from './CommentData'

function CommentList({ currentUserId }) {
  const [comments, setComments] = useState([])
  const {id} = useParams()

  useEffect(() => {
    fetch(`/post/${id}`)
    .then(r => r.json())
    .then(posts => setComments(posts.comments))
    .catch(err => alert(err.message))
  },[id])

  function handleUpvote(commentId) {
    console.log(commentId, currentUserId)
    fetch("/upvote-comment", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_id: commentId,
        user_id: currentUserId,
        points: 1
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(() => window.location.reload())
        } else {
          r.json().then(data => console.log(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function handleDownvote(commentId) {
    fetch("/downvote-comment", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_id: commentId,
        user_id: currentUserId,
        points: -1
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(() => window.location.reload())
        } else {
          r.json().then(data => console.log(data.error))
        }
      })
      .catch(e => alert(e))
  }

  return (
    <Stack gap={3}>
      {comments.length > 0 
      ? 
      <Stack gap={3}>
        {comments.map(comment => (
          <CommentData key={comment.id} comment={comment} onUpvote={handleUpvote} onDownvote={handleDownvote} />
        ))}
      </Stack>
      : 
      <p>No comments yet! Be the first to comment.</p>}
    </Stack>
  )
}

export default CommentList