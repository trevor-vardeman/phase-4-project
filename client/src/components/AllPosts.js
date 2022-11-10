import { useParams, useNavigate } from 'react-router-dom'
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function AllPosts({ user, posts, onUpvote, onDownvote, onDelete, onCommentSubmission }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const handleOpenPost = post => navigate(`/posts/${post.id}`)

  return (
    <Stack gap={3} className="main">
      {!id
        ? <Stack gap={3}>
            {posts.map(post => (
              <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} onPostSelection={handleOpenPost} />
            ))}
          </Stack>
        : null}
    </Stack>
  )
}

export default AllPosts