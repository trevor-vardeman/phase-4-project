import { useParams, useNavigate } from 'react-router-dom'
import PostData from "./PostData"
import Stack from 'react-bootstrap/Stack'
import CommentSubmission from './CommentSubmission'
import CommentList from './CommentList'
import NoPath from './NoPath'

function PostList({ user, posts, onUpvote, onDownvote, onDelete }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const singlePost = posts.find(p => p.id === parseInt(id))
  const selectPost = post => navigate(`/posts/${post.id}`)

  return (
    <Stack gap={3} className="main">
      {!id
        ? <Stack gap={3}>
            {posts.map(post => (
              <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} onPostSelection={selectPost} />
            ))}
          </Stack>
        : <div>{singlePost !== undefined
          ? <div>
              {[singlePost].map(post => (
                <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} onPostSelection={selectPost} />
              ))}
              <br></br>
              <CommentSubmission user={user} />
              <br></br>
              <CommentList user={user} post={[singlePost]} />
            </div>
          :  <NoPath />}
          </div>}
    </Stack>
  )
}

export default PostList