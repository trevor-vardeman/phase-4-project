import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function Page() {
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

  return (
    <Stack gap={3}>
      {posts.map(post => (
        <PostData key={post.id} post={post} />
      ))}
    </Stack>
  )
}

export default Page