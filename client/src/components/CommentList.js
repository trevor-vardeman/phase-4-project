import { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import CommentData from './CommentData'

function CommentList({ user, post }) {
  const [comments, setComments] = useState(post[0].comments)

  const handleCommentUpvote = comment => {
    if (!user) {
      alert("You must be logged in to vote!")
    } else {
      if (comment.user_upvoted === false && comment.user_downvoted === false) {
        comment.user_upvoted = true
        comment.points += 1
      } else if (comment.user_upvoted === false && comment.user_downvoted === true) {
        comment.user_upvoted = true
        comment.user_downvoted = false
        comment.points += 2
      } else {
        comment.user_upvoted = false
        comment.points -= 1
      }
      const commentArray = [...comments]
      const sortedCommentArray = commentArray.sort((a, b) => b.points - a.points)
      setComments(sortedCommentArray)
      
      fetch("/upvote-comment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_id: comment.id,
          points: 1
        }),
      })
        .then((r) => {
          if (r.ok) {
            r.json().then()
          } else {
            r.json().then(data => alert(data.error))
          }
        })
        .catch(e => alert(e))
    }
  }

  const handleCommentDownvote = comment => {
    if (!user) {
      alert("You must be logged in to vote!")
    } else {
      if (comment.user_upvoted === false && comment.user_downvoted === false) {
        comment.user_downvoted = true
        comment.points -= 1
      } else if (comment.user_downvoted === false && comment.user_upvoted === true) {
        comment.user_upvoted = false
        comment.user_downvoted = true
        comment.points -= 2
      } else {
        comment.user_downvoted = false
        comment.points += 1
      }
      const commentArray = [...comments]
      const sortedCommentArray = commentArray.sort((a, b) => b.points - a.points)
      setComments(sortedCommentArray)
      
      fetch("/downvote-comment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_id: comment.id,
          points: -1
        }),
      })
        .then((r) => {
          if (r.ok) {
            r.json().then()
          } else {
            r.json().then(data => alert(data.error))
          }
        })
        .catch(e => alert(e))
    }
  }

  const handleCommentDelete = singleComment => {
    fetch(`/comment/${singleComment.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then ((r) => {
      if (r.ok) {
        setComments(comments.filter(comment => singleComment.id !== comment.id))
      } else {
        alert(r)
      }})
    .catch(error => alert(error))
  }

  return (
    <Stack gap={3}>
      {post[0].comments.length > 0
        ? <Stack gap={3}>
            {post[0].comments.map(comment => (
              <CommentData key={comment.id} comment={comment} onUpvote={handleCommentUpvote} onDownvote={handleCommentDownvote} onDelete={handleCommentDelete} />
            ))}
          </Stack>
        : <p>No comments yet! Be the first to comment.</p>}
    </Stack>
  )
}

export default CommentList