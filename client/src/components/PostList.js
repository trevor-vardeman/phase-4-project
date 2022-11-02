import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'
import CommentSubmission from './CommentSubmission'
import CommentList from './CommentList'
import NoPath from './NoPath'

function PostList({ user, posts, onUpvote, onDownvote, onDelete, onCommentSubmission }) {
  const navigate = useNavigate()
  const { id } = useParams()
  // const singlePost = posts.find(p => p.id === parseInt(id))
  const handleOpenPost = post => navigate(`/posts/${post.id}`)

  const [selectedPost, setSelectedPost] = useState("")  
  useEffect(() => {
    if (id) {
      setSelectedPost(posts.find(p => p.id === parseInt(id)))
    } else setSelectedPost("")
  },[id, posts])

  return (
    <Stack gap={3} className="main">
      {!id
        ? <Stack gap={3}>
            {posts.map(post => (
              <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} onPostSelection={handleOpenPost} />
            ))}
          </Stack>
        : <div>{selectedPost
          ? <div>
              {[selectedPost].map(post => (
                <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} onPostSelection={handleOpenPost} />
              ))}
              <br></br>
              <CommentSubmission user={user} onCommentSubmission={onCommentSubmission} />
              <br></br>
              <CommentList user={user} post={[selectedPost]} />
            </div>
          :  <NoPath />}
          </div>}
    </Stack>
  )
}

export default PostList