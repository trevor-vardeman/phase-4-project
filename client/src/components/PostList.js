import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function PostList({ currentUserId }) {
  const [posts, setPosts] = useState([])
  const [singlePost, setSinglePost] = useState(false)
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

  // useEffect(() => {
  //   fetch("/post")
  //   .then(r => r.json())
  //   .then(posts => {
  //     const sortedPosts = posts.sort((a, b) => b.points - a.points)
  //     setPosts(sortedPosts)
  //   })
  //   .catch(err => alert(err.message))
  // },[])

  // function handleOpenPost(post) {
  //   setSinglePost(true)
  //   setPosts(post)
  // }

  function handleUpvote(postId) {
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
          r.json().then(() => window.location.reload())
        } else {
          r.json().then(data => console.log(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function handleDownvote(postId) {
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
          r.json().then(() => window.location.reload())
        } else {
          r.json().then(data => console.log(data.error))
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
        id === undefined ? window.location.reload() : navigate("/")
      } else {
        alert(r)
      }})
    .catch(error => alert(error))
  }

  return (
    <Stack gap={3} className="main">
      {posts.map(post => (
        <PostData key={post.id} post={post} onUpvote={handleUpvote} onDownvote={handleDownvote} onDelete={handleDelete} />
        // <PostData key={post.id} post={post} onUpvote={handleUpvote} onDownvote={handleDownvote} onOpenPost={handleOpenPost} onDelete={handleDelete} />
      ))}
    </Stack>
  )
}

export default PostList