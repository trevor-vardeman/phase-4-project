import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'
import CommentSubmission from './CommentSubmission'
import CommentList from './CommentList'
import CommentData from './CommentData'

function PostList({ user, posts, onUpvote, onDownvote, onDelete }) {
  const navigate = useNavigate()
  const [selectedPost, setSelectedPost] = useState(null)
  const { id } = useParams()
  // console.log(user)
  // const {state} = useLocation()
  // const {post} = state

  function selectPost(post) {
    console.log([post])
    setSelectedPost([post])
    navigate(`/posts/${post.id}`)
  }

  // console.log(posts[id])

  // useEffect(() => {
  //   if (id === undefined) {
  //     console.log(id)
  //     setSelectedPost(null)
  //   } else {
  //     console.log(id)
  //     console.log(posts.find(p => p.id === id))
  //     // setSelectedPost(posts.find(p => p.id === id))
  //   }
  // },[id, posts])

  // const singlePost = posts.find(p => p.id === id)

  return (
    <Stack gap={3} className="main">
      {/* {selectedPost === null */}
      {!id
      ?
      <div>
        {posts.map(post => (
          <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} onPostSelection={selectPost} />
        ))}
      </div>
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