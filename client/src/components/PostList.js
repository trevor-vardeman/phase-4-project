import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function PostList({ currentUserId }) {
  const [posts, setPosts] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id === undefined) {
      fetch("/post")
      .then(r => r.json())
      .then(posts => {
        const sortedPosts = posts.sort((a, b) => b.points - a.points)
        setPosts(sortedPosts)
      })
      .catch(err => alert(err.message))
    } else {
      fetch(`/post/${id}`)
      .then(r => r.json())
      .then(posts => setPosts([posts]))
      .catch(err => alert(err.message))
    }
  },[id])

  function handleUpvote(postId) {
    const postArray = [...posts]
    const clickedPost = postArray.find(posts => posts.id === postId)
    if (clickedPost.user_upvoted === false && clickedPost.user_downvoted === false) {
      clickedPost.user_upvoted = true
      clickedPost.points += 1
    } else if (clickedPost.user_upvoted === false && clickedPost.user_downvoted === true) {
      clickedPost.user_upvoted = true
      clickedPost.user_downvoted = false
      clickedPost.points += 2
    } else {
      clickedPost.user_upvoted = false
      clickedPost.points -= 1
    }
    setPosts(postArray)

    fetch("/upvote-post", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
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

  function handleDownvote(postId) {
    const postArray = [...posts]
    const clickedPost = postArray.find(posts => posts.id === postId)
    if (clickedPost.user_upvoted === false && clickedPost.user_downvoted === false) {
      clickedPost.user_downvoted = true
      clickedPost.points -= 1
    } else if (clickedPost.user_downvoted === false && clickedPost.user_upvoted === true) {
      clickedPost.user_upvoted = false
      clickedPost.user_downvoted = true
      clickedPost.points -= 2
    } else {
      clickedPost.user_downvoted = false
      clickedPost.points += 1
    }
    setPosts(postArray)
    
    fetch("/downvote-post", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        user_id: currentUserId,
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

  function handleDelete(singlePost) {
    fetch(`/post/${singlePost.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then ((r) => {
      if (r.ok) {
        setPosts(posts.filter(post => singlePost.id !== post.id))
        if (id) navigate("/")
      } else {
        alert(r)
      }})
    .catch(error => alert(error))
  }

  return (
    <Stack gap={3} className="main">
      {posts.map(post => (
        <PostData key={post.id} post={post} onUpvote={handleUpvote} onDownvote={handleDownvote} onDelete={handleDelete} />
      ))}
    </Stack>
  )
}

export default PostList