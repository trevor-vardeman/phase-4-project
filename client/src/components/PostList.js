import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function PostList() {
  const [posts, setPosts] = useState([])
  const {id} = useParams()

  useEffect(() => {
    if (id === undefined) {
      fetch("/post")
      .then(r => r.json())
      .then(posts => setPosts(posts))
      .catch(err => alert(err.message))
    } else {
      fetch(`/post/${id}`)
      .then(r => r.json())
      .then(posts => setPosts([posts]))
      .catch(err => alert(err.message))
    }
  },[id])

  function handleDelete(singlePost) {
    fetch(`/post/${singlePost.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then ((r) => {
      if (r.ok) {
        setPosts(posts.filter(post => singlePost.id !== post.id))
      } else {
        console.log(r)
      }})
    .catch(error => console.log(error))
  }

  return (
    <Stack gap={3}>
      {posts.map(post => (
        <PostData key={post.id} post={post} handleDelete={handleDelete} />
      ))}
    </Stack>
  )
}

export default PostList