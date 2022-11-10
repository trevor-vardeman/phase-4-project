import { useNavigate } from 'react-router-dom'
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function AllPosts({ posts, onUpvote, onDownvote, onDelete }) {
  const navigate = useNavigate()
  const handleOpenPost = post => navigate(`/posts/${post.id}`)

  return (
    <Stack gap={3} className="main">
      <Stack gap={3}>
        {posts.map(post => (
          <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} onPostSelection={handleOpenPost} />
        ))}
      </Stack>
    </Stack>
  )
}

export default AllPosts