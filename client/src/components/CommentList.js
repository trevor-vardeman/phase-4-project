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
    .then(posts => {
      const sortedComments = posts.comments.sort((a, b) => b.points - a.points)
      setComments(sortedComments)
    })
    .catch(err => alert(err.message))
  },[id])

  function handleUpvote(commentId) {
    const commentArray = [...comments]
    const clickedComment = commentArray.find(comments => comments.id === commentId)
    if (clickedComment.user_upvoted === false && clickedComment.user_downvoted === false) {
      clickedComment.user_upvoted = true
      clickedComment.points += 1
    } else if (clickedComment.user_upvoted === false && clickedComment.user_downvoted === true) {
      clickedComment.user_upvoted = true
      clickedComment.user_downvoted = false
      clickedComment.points += 2
    } else {
      clickedComment.user_upvoted = false
      clickedComment.points -= 1
    }
    const sortArray = commentArray.sort((a, b) => b.points - a.points)
    setComments(sortArray)
    
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
          r.json().then()
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function handleDownvote(commentId) {
    const commentArray = [...comments]
    const clickedComment = commentArray.find(comments => comments.id === commentId)
    if (clickedComment.user_upvoted === false && clickedComment.user_downvoted === false) {
      clickedComment.user_downvoted = true
      clickedComment.points -= 1
    } else if (clickedComment.user_downvoted === false && clickedComment.user_upvoted === true) {
      clickedComment.user_upvoted = false
      clickedComment.user_downvoted = true
      clickedComment.points -= 2
    } else {
      clickedComment.user_downvoted = false
      clickedComment.points += 1
    }
    const sortArray = commentArray.sort((a, b) => b.points - a.points)
    setComments(sortArray)
    
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
          r.json().then()
        } else {
          r.json().then(data => console.log(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function handleDelete(singleComment) {
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
      {comments.length > 0 
      ? 
      <Stack gap={3}>
        {comments.map(comment => (
          <CommentData key={comment.id} comment={comment} onUpvote={handleUpvote} onDownvote={handleDownvote} onDelete={handleDelete} />
        ))}
      </Stack>
      : 
      <p>No comments yet! Be the first to comment.</p>}
    </Stack>
  )
}

export default CommentList