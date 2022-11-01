import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'
import CommentSubmission from './CommentSubmission'
import CommentList from './CommentList'
import CommentData from './CommentData'

function PostList({ onUpvote, onDownvote, onDelete }) {
  const navigate = useNavigate()
  const [selectedPost, setSelectedPost] = useState(null)
  const { id } = useParams()
  // console.log(user)
  // const {state} = useLocation()
  // const {post} = state

  // console.log("type", typeof id)

  const [user, setUser] = useState("")
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then(user => setUser(user))
      }
    })
    fetch("/post")
      .then(r => r.json())
      .then(posts => {
        const sortedPosts = posts.sort((a, b) => b.points - a.points)
        setPosts(sortedPosts)
        if (id) {
          const intId = parseInt(id, 10)
          const findPost = posts.find(p => p.id === intId)
          setSelectedPost([findPost])
        }
        console.log(sortedPosts)
      })
      .catch(err => alert(err.message))
  }, [id])

  function selectPost(post) {
    console.log([post])
    setSelectedPost([post])
    navigate(`/posts/${post.id}`)
  }

  // useEffect(() => {
  //   if (!id) {
  //     setSelectedPost(null)
  //   } else {
  //     const intId = parseInt(id, 10)
  //     const findPost = posts.find(p => p.id === intId)
  //     console.log(findPost)
  //     setSelectedPost([findPost])
  //   }
  // },[id, posts])

  // const singlePost = posts.find(p => p.id === parseInt(id, 10))
  // console.log(singlePost)

  return (
    <Stack gap={3} className="main">
      {!id
      ?
      <Stack gap={3}>
        {posts.map(post => (
          <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} onPostSelection={selectPost} />
        ))}
      </Stack>
      : 
      <div>
        {selectedPost.map(post => (
          <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} />
        ))}
        <br></br>
        <CommentSubmission user={user} />
        <br></br>
        <CommentList user={user} post={selectedPost} />
      </div>}
    </Stack>
  )
}

export default PostList