import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'

function PostList({ posts, onUpvote, onDownvote, onDelete }) {


  return (
    <Stack gap={3} className="main">
      {posts.map(post => (
        <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} />
      ))}
    </Stack>
  )
}

export default PostList