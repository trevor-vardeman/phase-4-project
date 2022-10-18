import PostList from "./PostList"
import CommentSubmission from "./CommentSubmission"
import CommentList from "./CommentList"

function Post({ currentUserId }) {
  return (
    <div>
      <PostList currentUserId={currentUserId} />
      <br></br>
      <CommentSubmission currentUserId={currentUserId} />
      <br></br>
      <CommentList currentUserId={currentUserId} />
    </div>
  )
}

export default Post