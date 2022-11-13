import { useNavigate } from 'react-router-dom'
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function AllPosts({ posts, onPostUpvote, onPostDownvote, onPostDelete }) {
  const navigate = useNavigate()
  const handleOpenPost = post => navigate(`/post/${post.id}`)

  return (
    <Stack gap={3} className="main">
      <Stack gap={3}>
        {posts.map(post => (
          <PostData key={post.id} post={post} onPostUpvote={onPostUpvote} onPostDownvote={onPostDownvote} onPostDelete={onPostDelete} onPostSelection={handleOpenPost} />
        ))}
      </Stack>
    </Stack>
  )
}

export default AllPosts