import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function PostList({ currentUserId }) {
  const [posts, setPosts] = useState([])
  const {id} = useParams()

  useEffect(() => {
    if (id === undefined) {
      fetch("/post")
      .then(r => r.json())
      .then(posts => {
        console.log(posts)
        setPosts(posts)
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
    fetch("/upvote", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        user_id: currentUserId
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

  // function handleUpvote(postId) {
  //   fetch("/upvote", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       post_id: postId,
  //       user_id: currentUserId
  //     }),
  //   })
  //     .then((r) => {
  //       if (r.ok) {
  //         r.json().then((data) => {
  //           console.log(data)
  //           console.log(posts)
  //           // const newPosts = posts
  //           // const postIndex = posts.findIndex((post) => post.id === postId)
  //           // newPosts[postIndex].user_upvoted = true
  //           // setPosts(newPosts)
  //           const newPosts = posts.map(post => {
  //             if (post.id === postId) {
  //               return {...posts, user_upvoted: true}
  //           }
  //           return newPosts}) 
  //         })
  //       } else {
  //         r.json().then(data => console.log(data.error))
  //       }
  //     })
  //     .catch(e => alert(e))
  // }

  function handleDelete(singlePost) {
    fetch(`/post/${singlePost.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then ((r) => {
      if (r.ok) {
        setPosts(posts.filter(post => singlePost.id !== post.id))
      } else {
        alert(r)
      }})
    .catch(error => alert(error))
  }

  return (
    <Stack gap={3}>
      {posts.map(post => (
        <PostData key={post.id} post={post} onUpvote={handleUpvote} onDelete={handleDelete} />
      ))}
    </Stack>
  )
}

export default PostList