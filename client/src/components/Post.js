import PostList from "./PostList"
import CommentSubmission from "./CommentSubmission"
import CommentData from "./CommentData"

function Post({ currentUserId }) {
  return (
    <div>
      <PostList currentUserId={currentUserId} />
      <br></br>
      <CommentSubmission currentUserId={currentUserId} />
      <br></br>
      <CommentData />
    </div>
  )
}

export default Post